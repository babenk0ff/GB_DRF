from uuid import uuid4

from django.contrib.auth.models import AbstractUser
from django.db import models


# class User(models.Model):
#     id = models.UUIDField(default=uuid4, primary_key=True)
#     username = models.CharField(max_length=64)
#     firstname = models.CharField(max_length=64)
#     lastname = models.CharField(max_length=64)
#     email = models.CharField(max_length=64, unique=True)

class User(AbstractUser):
    id = models.UUIDField(default=uuid4, primary_key=True)
