from django.shortcuts import render, get_object_or_404, redirect
from django.core.files.storage import FileSystemStorage
from django.contrib import messages
from .models import Album
from .models import Photo


def albums(request):

    if request.user.is_authenticated:
        albums = Album.objects.filter(user=request.user.id)

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


def addalbum(request):

    if request.user.is_authenticated:        

        if request.method == 'POST' and request.FILES['album_cover']:
            title = request.POST['album_name']
            description = request.POST['album_description']
            album_cover = request.FILES['album_cover']

            album = Album(user=request.user, title=title, description=description, cover=album_cover)

            album.save()

            return redirect('albums')
    else:
        return render(request, 'login')
        messages.error(request, 'You need to login first')


def addphoto(request):

    if request.user.is_authenticated:        

        if request.method == 'POST' and request.FILES['img']:
            album_id = request.POST['album_id']
            name = request.POST['name']
            img = request.FILES['img']

            album = Album.objects.get(id=album_id)
            photo = Photo(album=album, name=name, photo=img)

            photo.save()

            return redirect('album', album_id)

    else:
        return render(request, 'login')
        messages.error(request, 'You need to login first')