from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APIClient, APISimpleTestCase

from .models import User, Project, ToDo


class TestProjectViewSet(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.admin = User.objects.create_superuser('admin', 'admin@gb.local', 'qwerty')

    def setUp(self) -> None:
        self.client = APIClient()
        self.project = mixer.blend(Project)

    def test_get_list_unauthorized(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_list_admin(self):
        self.client.login(username='admin', password='qwerty')
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail_admin(self):
        self.client.login(username='admin', password='qwerty')
        response = self.client.get(f'/api/projects/{self.project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_admin(self):
        new_name = 'New project'
        self.client.login(username='admin', password='qwerty')
        response = self.client.patch(f'/api/projects/{self.project.id}/', {'name': new_name})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        project = Project.objects.get(id=self.project.id)
        self.assertEqual(project.name, new_name)


class TestTodoViewSet(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.admin = User.objects.create_superuser('admin', 'admin@gb.local', 'qwerty')

    def setUp(self) -> None:
        self.client = APIClient()
        self.todo = mixer.blend(ToDo)

    def test_get_list_unauthorized(self):
        response = self.client.get('/api/todos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_list_admin(self):
        self.client.login(username='admin', password='qwerty')
        response = self.client.get('/api/todos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail_admin(self):
        self.client.login(username='admin', password='qwerty')
        response = self.client.get(f'/api/todos/{self.todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_admin(self):
        new_body = 'New body'
        is_active = self.todo.is_active
        self.client.login(username='admin', password='qwerty')
        response = self.client.patch(f'/api/todos/{self.todo.id}/', {'body': new_body, 'is_active': not is_active})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        todo = ToDo.objects.get(id=self.todo.id)
        self.assertEqual(todo.body, new_body)
        self.assertEqual(todo.is_active, not is_active)


class TestMath(APISimpleTestCase):

    def test_pow(self):
        from math import pow
        self.assertEqual(pow(2, 2), 4)
