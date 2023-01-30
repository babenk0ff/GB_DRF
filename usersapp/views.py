from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin

from .models import User
from .serializers import UserModelSerializer


class UserCustomViewSet(UpdateModelMixin,
                        ListModelMixin,
                        RetrieveModelMixin,
                        GenericViewSet):

    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = [IsAuthenticated]
