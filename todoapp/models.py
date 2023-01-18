from django.db import models

from usersapp.models import User


class Project(models.Model):
    name = models.CharField(max_length=128, unique=True)
    repo_link = models.URLField(max_length=128)
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.name


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    body = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
