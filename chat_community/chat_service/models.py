from django.db import models

class Groups(models.Model):
  group_name = models.CharField(max_length=255)
  channel_name = models.CharField(max_length=255)
  data_added = models.DateTimeField(auto_now_add=True)
  online = models.PositiveIntegerField(default=0)

  class Meta:
    ordering = ('data_added', )

class Message(models.Model):
  username = models.CharField(max_length=255)
  room = models.CharField(max_length=255)
  content = models.TextField()
  group = models.ForeignKey(Groups, on_delete=models.CASCADE)
  data_added = models.DateTimeField(auto_now_add=True)

  class Meta:
    ordering = ('data_added', )

