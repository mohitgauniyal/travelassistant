from django.shortcuts import render, get_object_or_404


def albums(request):
    return render(request, 'albums/albums.html')

def album(request):
    return render(request, 'albums/album.html')


'''
def album(request, album_id):
    album = get_object_or_404(Listing, pk=album_id)
    context = {
        'album' : album
    }
    return render(request, 'albums/album.html', context)'''