from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from random import randint
import string

BASE_LIST = string.digits + string.letters + '_@'
BASE_DICT = dict((c, i) for i, c in enumerate(BASE_LIST))

class Link(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    long_url = models.TextField()
    url_hash = models.CharField(max_length=12, unique=True, blank=True)
    clicks_count = models.PositiveIntegerField()

    class Meta:
        ordering = ('created',)


@receiver(pre_save, sender=Link)
def create_url_hash(sender, instance, **kwargs):
    instance.url_hash = base_encode(randint(0,1000000000))


def base_decode(string, reverse_base=BASE_DICT):
    length = len(reverse_base)
    ret = 0
    for i, c in enumerate(string[::-1]):
        ret += (length ** i) * reverse_base[c]

    return ret

def base_encode(integer, base=BASE_LIST):
    if integer == 0:
        return base[0]

    length = len(base)
    ret = ''
    while integer != 0:
        ret = base[integer % length] + ret
        integer /= length

    return ret
