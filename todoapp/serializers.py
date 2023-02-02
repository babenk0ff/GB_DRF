from rest_framework.serializers import ModelSerializer
from .models import Project, ToDo
from usersapp.serializers import UserModelSerializer


class ProjectModelSerializer(ModelSerializer):
    users = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TodoModelSerializer(ModelSerializer):
    project = ProjectModelSerializer()
    user = UserModelSerializer()

    class Meta:
        model = ToDo
        fields = '__all__'
