from django.shortcuts import render
from .models import Message, Groups

def index(request):
  return render(request, 'chat/index.html')


def room(request, room_name):
  username = request.GET.get('username', 'Anonymous')
  messages = Message.objects.filter(room=room_name)[0:25]
  groups = Groups.objects.exclude(group_name__contains=room_name)
  for i in groups:
    i.group_name= i.group_name.replace("chat_", "")
  return render(request, 'chat/room.html', {'room_name': room_name, 'username': username, 'messages': messages, 'groups': groups})