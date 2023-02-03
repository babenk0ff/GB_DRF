from django.test import TestCase
from mimesis import Person
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, CoreAPIClient

from .models import User
from .views import UserCustomViewSet


class TestUserViewSet(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.admin = User.objects.create_superuser('admin', 'admin@gb.local', 'qwerty')
        cls.api_addr = '/api/users/'

    def setUp(self) -> None:
        self.factory = APIRequestFactory()
        self.view = UserCustomViewSet.as_view({'get': 'list', 'put': 'update'})
        self.user = User.objects.create_user(
            username=Person().username(),
            password=Person().password()
        )

    def test_get_list_unauthorized(self):
        request = self.factory.get(self.api_addr)
        response = self.view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_list_admin(self):
        request = self.factory.get(self.api_addr)
        force_authenticate(request, self.admin)
        response = self.view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail_admin(self):
        request = self.factory.get(self.api_addr)
        force_authenticate(request, self.admin)
        response = self.view(request, pk=self.user.pk)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_admin(self):
        new_first_name = Person().first_name()
        new_last_name = Person().last_name()
        request = self.factory.put(self.api_addr, {
            'username': self.user.username,
            'password': self.user.password,
            'first_name': new_first_name,
            'last_name': new_last_name,
        })
        force_authenticate(request, self.admin)
        response = self.view(request, pk=self.user.pk)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        user = User.objects.get(id=self.user.id)
        self.assertEqual(user.first_name, new_first_name)
        self.assertEqual(user.last_name, new_last_name)
