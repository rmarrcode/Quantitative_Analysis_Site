# chat/consumers.py
import json

from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

class ExpStateConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = 'test'
        self.room_group_name = 'test'

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": "chat_message", "message": message}
        )

    # Receive message from room group
    def chat_message(self, event):
        print(event)
        message = event["data"]
        # Send message to WebSocket
        self.send(text_data=json.dumps({"data": message}))