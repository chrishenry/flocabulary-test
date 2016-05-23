from django.db import models

class Link(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    long_url = models.TextField()
    url_hash = models.CharField(max_length=12, unique=True)
    clicks_count = models.PositiveIntegerField()

    class Meta:
        ordering = ('created',)
