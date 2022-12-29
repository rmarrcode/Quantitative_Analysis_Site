# app/consumers.py
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

class ExpDataConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope\['url_route'\]['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def update(self, event):
        # Receive message from room group
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            "data": "test"
        }))