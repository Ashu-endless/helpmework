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
    path('pending_works/<str:user_name>/',views.show_pending_Works,name='pending_works'),
    path('update_pending_works',views.update_to_pending_works,name='update_pending_works'),
    path('upvoted_a_homework',views.upvoted_a_homework,name='upvoted_a_homework'),
    path('view_homework/<str:hw_id>/',views.view_homework,name='view_homework'),
    path('delete_homework',views.delete_homework,name='delete_homework'),
    path('delete_question',views.delete_question,name='delete_question'),
    path('upload_question',views.upload_question,name='upload_question'),
    path('asked_works/<str:q_id>/<str:q>',views.view_askedwork,name='view_askedwork'),
    path('check_ifusername_Available',views.CheckUsernameAvailibity,name='CheckUsernameAvailibity'),

]