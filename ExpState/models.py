from django.db import models
from django.core.cache import cache
import json
import channels.layers
from asgiref.sync import async_to_sync

class SingletonModel(models.Model):

    class Meta:
        abstract = True

    def set_cache(self):
        cache.set(self.__class__.__name__, self)

    def save(self, *args, **kwargs):
        self.pk = 1
        super(SingletonModel, self).save(*args, **kwargs)
        self.set_cache()

    def delete(self, *args, **kwargs):
        pass

    @classmethod
    def load(cls):
        if cache.get(cls.__name__) is None:
            obj, created = cls.objects.get_or_create(pk=1)
            if not created:
                obj.set_cache()
        return cache.get(cls.__name__)
 
def jsonfield_default_value():  # This is a callable
    return {}


#make save function
class ExpState(SingletonModel):

    exp_id = models.JSONField(default=jsonfield_default_value)
    
    # TODO CACHE STUFF
    @classmethod
    def update(cls, exp_new):
        obj = cls.load()
        obj.exp_id[exp_new['exp_id']] = exp_new['our_log_ret']
        obj.save()
        # notify frontend
        import channels.layers
        channel_layer = channels.layers.get_channel_layer()
        from asgiref.sync import async_to_sync
        async_to_sync(channel_layer.group_send)(
                'test',
            {
                'type': 'chat_message',
                'message': "event_trigered_from_views"
            }
        ) 

