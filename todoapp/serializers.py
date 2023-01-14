from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Project, TODO
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
        model = TODO
        fields = '__all__'
