from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin

from .models import User
from .serializers import UserModelSerializer, UserModelSerializerIsStaff


class UserCustomViewSet(UpdateModelMixin,
                        ListModelMixin,
                        RetrieveModelMixin,
                        GenericViewSet):

    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return UserModelSerializerIsStaff
        return UserModelSerializer
