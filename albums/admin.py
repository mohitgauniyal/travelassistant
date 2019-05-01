from django.contrib import admin
from .models import Album, Photo

class AlbumAdmin(admin.ModelAdmin):
    list_display = ('id','user', 'title', 'album_date', 'cover')
    list_display_links = ('id','user', 'title', 'album_date')
    list_editable = ('cover',)
    list_filter = ('user', 'title', 'album_date')
    search_fields = ('user__username__icontains', 'title', 'album_date')
    list_per_page = 10

class PhotoAdmin(admin.ModelAdmin):
    list_display = ('id','album', 'name', 'photo')
    list_display_links = ('id','album', 'name',)
    list_editable = ('photo',)
    list_filter = ('album', 'name')
    search_fields = ('album__title__icontains', 'name')
    list_per_page = 10

admin.site.register(Album, AlbumAdmin)
admin.site.register(Photo, PhotoAdmin)