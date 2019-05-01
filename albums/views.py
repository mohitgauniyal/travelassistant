from django.shortcuts import render, get_object_or_404
from .models import Album
from .models import Photo

def albums(request):
    albums = Album.objects.all()

    context = {
        'albums' : albums
    }

    return render(request, 'albums/albums.html', context)


def album(request, album_id):
    album = get_object_or_404(Album, pk=album_id)
    photos = Photo.objects.filter(album=album.id)

    context = {
        'album' : album,
        'photos' : photos
    }

    return render(request, 'albums/album.html', context)


'''
def album(request, album_id):
    album = get_object_or_404(Listing, pk=album_id)
    context = {
        'album' : album
    }
    return render(request, 'albums/album.html', context)'''