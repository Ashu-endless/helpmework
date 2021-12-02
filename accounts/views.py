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
from django.shortcuts import redirect
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
    #print(homeworks)
    context = {'data':data}
    #print(context['data'])

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
            return JsonResponse({'success':'True'})
          
        else:
            return JsonResponse({'success':'wrong credentials'})
        
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
        if users == []:
            users = "none"
        if homeworks == []:
            homeworks = "none"
        #print(homeworks[0].imgsrcs)
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
    user_homeworks = serializers.serialize("json", helpmework.objects.filter(postedby=User.objects.get(username=user_name)))
    user_homeworks = json.loads(user_homeworks)
    #print(json.loads(MainProfiles))
    #print(MainProfiles.bio)
    stars = 0
    ##print(user_homeworks)
    for user_homework in user_homeworks:
        stars += len(user_homework['fields']['upvoted_by'])
        #for i in user_homework:
            #print("-------",i)
        #break
    #print(user_homeworks)
    #MainProfiles = serializers.serialize("json",MainProfiles)
    return render(request, "view_profile.html",{'user':user_name,'mainprofiles':MainProfiles,'userhomeworks': user_homeworks,'stars':stars})


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

def sharehomework(request):
    if request.method == 'POST':
        homework_imgs = request.POST.get('homework_images').split(',')
        homework_about = request.POST.get('homework_about')
        print(homework_about)
        print(homework_imgs)
        #shared_hw = helpmework(postedby=request.user,description=homework_about,subject="",)
       # imgs = ['data:image/jpeg;base64,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','https://static.simpsonswiki.com/images/thumb/e/ed/Bart_Gets_an_F_promo.jpg/250px-Bart_Gets_an_F_promo.jpg']
        shared_hw = helpmework(postedby=request.user,description=homework_about,imgsrcs=homework_imgs)
        #print(request.user,homework_about)
        shared_hw.save()
        #print('share')
        return redirect('home')


def view_homework(request,hw_id):
        homework = helpmework.objects.get(id=hw_id)
        return render(request, "home.html",{'homework':homework})

def update_profile(request):
    mainProfile = MainProfile.objects.get(user=request.user.id)
    print(mainProfile)
    
def CheckUsernameAvailibity(request):
    if request.method == 'POST':
        username_ = request.POST.get('username')

        try:
            user = User.objects.get(username=username_)
            return JsonResponse({'available':'false'})
        except:
            return JsonResponse({'available':'true'})
        # if user:
        #     return JsonResponse({'available':'true'})
        # else :
        #     return JsonResponse({'available':'false'})