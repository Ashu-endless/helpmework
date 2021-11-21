from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.urls import reverse_lazy
from django.contrib.auth import authenticate,login,logout
from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.core import serializers
from .models import helpmework
from .models import MainProfile
import json
#ashu_endless
#onmywaytosuccess

from django.contrib.auth.models import User
#onthewaytosuccess
#ashu_endless


@login_required(login_url='login_page')
def homepage(request):
    data = request.user.username
    homeworks = helpmework.objects.all()
    users = User.objects.all()
    print(homeworks)
    context = {'data':data}
    print(context['data'])
    #print(helpmework.objects.get(postedby="1"))
    #raj = helpmework.objects.get(postedby="1")
    #print(raj.upvoted_by.all())
    #raj.upvoted_by.add(User.objects.get(username='Ashu_Endless'))
    #print(User.objects.get(username='Ashu_Endless'))
    #print(raj.upvoted_by)
    #raj.upvoted_by.add(1)
    return render(request, "home.html",{'context':context,'homeworks':homeworks})
    #return HttpResponse(request.user.username)


def login_page(request):
    return render(request,'login.html')

def signup_page(request):
    return render(request,'signup.html')


def sign_up(request):
    if request.method == 'POST':
        username =  request.POST.get('username','')
        name =  request.POST.get('Name','')
        password =  request.POST.get('password','')
        #confirmed_password =  request.POST.get('confirmed_password','')

        
        print(username)
        print(name)
        print(password)
        

        #if password == confirmed_password:
        myuser= User.objects.create_user(first_name = name, password = password ,username=username)
        myuser.save()
        user = authenticate(username=username,password= password)
        login(request,user)
            # print(user_obj)

        return redirect('home')

def user_logout(request):
    logout(request)
    return redirect('home')

def user_login(request):
    print(request.user)
    if request.method == 'POST':
        user_name = request.POST.get("username",'')
        user_password = request.POST.get("password",'')
        user = authenticate(username=user_name,password=user_password)
        if user is not None:
            login(request,user)
            return redirect('home')


        else:
            return redirect('trial')
        
def user_search(request):

    if request.method == 'POST':
        query = request.POST.get('todo_name')
        #print(query)
        query_user = serializers.serialize("json", User.objects.filter(username__startswith=query))
        query_homework = serializers.serialize("json", helpmework.objects.filter(description__startswith=query))

        users  = json.loads(query_user)
        homeworks = json.loads(query_homework)
        # for key, value in data[0].items():
        #     print( key, value)
        # for key, value in data[0].items():
        #     print( key, value)
        print(homeworks)
        return JsonResponse({'users': users,'homeworks':homeworks})


def view_profile(request,user_name):
    #MainProfiles = MainProfile.objects.get(username=user_name)
    # if MainProfile.objects.get(user= User.objects.get(username=user_name)).exists():
    #     print(True);
    # else:
    #     print(False)
    try:
        MainProfiles = MainProfile.objects.get(user= User.objects.get(username=user_name))
    except:
        MainProfiles = MainProfile(user= User.objects.get(username=user_name),bio="")
        MainProfiles.save()
    #print(json.loads(MainProfiles))
    print(MainProfiles.bio)
    return render(request, "view_profile.html",{'user':user_name,'mainprofile':MainProfiles})


def upvoted_a_homework(request):
     if request.method == 'POST':
         upvoted_by = request.POST.get('upvotedby_username')
         homework = request.POST.get('homework')
         get_homework = helpmework.objects.get(pk=homework)
         users = User.objects.all()
         print(get_homework)
         #print(upvoted_by.pk)
         #print(User.objects.get(username=upvoted_by))
         #print(request.user.id)
         if (request.user in get_homework.upvoted_by.all()):
            get_homework.upvoted_by.remove(request.user.id)
         else:
             get_homework.upvoted_by.add(request.user.id)
         #get_homework.upvoted_by.add(request.user.id)
        #get_homework.upvoted_by.add()
         return JsonResponse({'success':'true'})

  