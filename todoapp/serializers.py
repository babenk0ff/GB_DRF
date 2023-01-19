from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Project, ToDo
from usersapp.serializers import UserModelSerializer


class ProjectModelSerializer(HyperlinkedModelSerializer):
    users = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TodoModelSerializer(HyperlinkedModelSerializer):
    project = ProjectModelSerializer()
    user = UserModelSerializer()

    class Meta:
        model = ToDo
        fields = '__all__'
