from django.urls import path
from . import views



urlpatterns = [
    path('',views.homepage,name='home'),
    path('login_page',views.login_page,name='login_page'),
    path('signup_page',views.signup_page,name='signup_page'),
    path('sign_up',views.sign_up,name='sign_up'),
    path('logout/',views.user_logout,name='user_logout'),
    path('login',views.user_login,name='user_login'),
    path('search',views.user_search,name='user_search'),
    path('share',views.sharehomework,name='share'),
    path('view_profile/<str:user_name>/',views.view_profile,name='view_profile'),
    path('upvoted_a_homework',views.upvoted_a_homework,name='upvoted_a_homework'),
    path('view_homework/<int:hw_id>/',views.view_homework,name='view_homework'),

]