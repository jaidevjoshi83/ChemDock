from django.urls import path
from . import views

urlpatterns = [
    path(r'', views.ints, name='ints'),
    path(r'post_form', views.post_form_api, name="post_form_api"),
    path(r'close_server', views.close_server, name="close_server")
]