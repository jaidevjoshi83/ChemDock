from django.urls import path
from . import views

urlpatterns = [
    path(r'', views.ints, name='ints'),
    path(r'post_form', views.post_form_api, name="post_form_api"),
    path(r'close_server', views.close_server, name="close_server"),
    # path(r'load_chem', views.load_chem, name="load_chem"),
    path(r'load_chem', views.load_chem, name='load_chem'),
    path(r'properties', views.properties, name="properties"),
    path(r'return_properties', views.return_properties, name="return_properties"),
    path(r'fetch_pub_chem', views.fetch_pub_chem, name="fetch_pub_chem"),
    path(r'mol_properties', views.mol_properties, name="mol_properties") 
]