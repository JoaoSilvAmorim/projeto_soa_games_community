import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Message, Groups

class ChatConsumer(AsyncWebsocketConsumer):
  async def connect(self):
    self.room_name = self.scope['url_route']['kwargs']['room_name']
    self.room_group_name = 'chat_%s' % self.room_name

    await self.channel_layer.group_add(
      self.room_group_name,
      self.channel_name
    )
    await self.accept()
    await self.save_group(self.room_group_name, self.channel_name)
    await self.channel_layer.group_send(
      self.room_group_name,
      {
        'type': 'online_message',
        'rooms': await self.online_group(self.room_group_name)
      }
    )
   
  async def disconnect(self, close_code):
    await self.channel_layer.group_discard(
      self.room_group_name,
      self.channel_name
    )
    await self.delete_messages(room=self.room_group_name)
    await self.delete_group(self.room_group_name, self.channel_name)
    await self.channel_layer.group_send(
      self.room_group_name,
      {
        'type': 'online_message',
        'rooms': await self.online_group(self.room_group_name)
      }
    )

  async def receive(self, text_data=None):
    data = json.loads(text_data)
    message = data['message']
    username = data['username']
    room = data['room']

    await self.channel_layer.group_send(
      self.room_group_name,
      {
        'type': 'chat_message',
        'message': message,
        'username': username
      }
    )
    await self.save_message(username=username, room=room, message=message)


  async def chat_message(self, event):
    message = event['message']
    username = event['username']

    await self.send(text_data=json.dumps({
      'message': message,
      'username': username
    }))

  async def online_message(self, event):
    rooms = event['rooms']
    await self.send(text_data=json.dumps({
      'rooms': rooms,
    }))


  @database_sync_to_async
  def save_message(self, username, room, message):
    group = Groups.objects.filter(group_name__contains=room)[0]
    Message.objects.create(username=username, room=room, content=message, group=group)

  @database_sync_to_async
  def delete_messages(self, room):
    group = Groups.objects.filter(group_name__contains=room)[0]
    if group.online == 0:
      Message.objects.filter(room__contains=room).delete()
    else:
      group.online -= 1
      group.save()

  @database_sync_to_async
  def save_group(self, group_name, channel_name):
    group = []
    try:
      group = Groups.objects.filter(group_name=group_name)[0]
      group.online += 1
      group.save()
    except:
      Groups.objects.create(group_name=group_name, channel_name=channel_name, online=1)
    

  @database_sync_to_async
  def delete_group(self, group_name, channel_name):
    group = Groups.objects.filter(group_name=group_name)[0]
    if group.online == 0:
      Groups.objects.filter(group_name=group_name).delete()


  @database_sync_to_async
  def online_group(self, group_name):
    try:
      group = Groups.objects.filter(group_name=group_name)[0]
      group.group_name = group.group_name.replace("chat_", "")
      return {'room': group.group_name, 'online': group.online}
    except:
      pass