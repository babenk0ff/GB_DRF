from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APIClient, APISimpleTestCase, APIRequestFactory

from .models import User, Project, ToDo
from .views import ProjectModelViewSet


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

    def test_create_admin(self):
        project_name = 'New cool project'
        repo_link = 'http://127.0.0.1/repos/new_project'

        self.client.login(username='admin', password='qwerty')
        response = self.client.post(f'/api/projects/', {'name': project_name, 'repo_link': repo_link}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_admin_request_factory(self):
        project_name = 'New cool project'
        repo_link = 'http://127.0.0.1/repos/new_project'

        factory = APIRequestFactory()
        request = factory.post('/api/projects/', {'name': project_name, 'repo_link': repo_link}, format='json')
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


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
