import graphene
from graphene_django import DjangoObjectType

from usersapp.models import User
from todoapp.models import Project, ToDo


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(ProjectType)
    all_projects = graphene.List(ProjectType)
    all_todos = graphene.List(ProjectType)

    @staticmethod
    def resolve_all_users(root, info):
        return User.objects.all()

    @staticmethod
    def resolve_all_projects(root, info):
        return Project.objects.all()

    @staticmethod
    def resolve_all_todos(root, info):
        return ToDo.objects.all()


schema = graphene.Schema(query=Query)
