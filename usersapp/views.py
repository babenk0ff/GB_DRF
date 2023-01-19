from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin

from .models import User
from .serializers import UserModelSerializer


class UserCustomViewSet(UpdateModelMixin,
                        ListModelMixin,
                        RetrieveModelMixin,
                        GenericViewSet):

    queryset = User.objects.all()
    serializer_class = UserModelSerializer
