var geocoder;
var map;
var markers = Array();
var infos = Array();

var lt = 30.2846463
var ln = 78.023493


function showmap() {
    document.getElementById('gmap_canvas').style.display = 'block';
    document.getElementById('weather').style.display = 'none';
    document.getElementById('crypto').style.display = 'none';
  }


function initialize() {
    // prepare Geocoder
    geocoder = new google.maps.Geocoder();
    // set initial position (New York)
    var myLatlng = new google.maps.LatLng(lt, ln);
    var myOptions = { // default map options
        zoom: 17,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };    

    map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);

      var someplace = {lat: lt,lng: ln};
      var marker = new google.maps.Marker({
        position: someplace,
        map: map,
        icon: 'icon.svg',
        title: 'My position'
      });
      var infowindow = new google.maps.InfoWindow({
        content: 'My position'
      });
      marker.addListner(marker, 'click', (function(marker){        
        infowindow.open(map, marker);
      } ) (marker));
}



// clear overlays function
function clearOverlays() {
    if (markers) {
        for (i in markers) {
            markers[i].setMap(null);
        }
        markers = [];
        infos = [];
    }
}



// clear infos function
function clearInfos() {
    if (infos) {
        for (i in infos) {
            if (infos[i].getMap()) {
                infos[i].close();
            }
        }
    }
}



function findPlaces(rad, type) {

    if (type == 'traffic') {
      clearOverlays();
      var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
        return
    } else if (type == 'home') {
      clearOverlays();
      return
    }

      clearOverlays();
      var cur_location = new google.maps.LatLng(lt, ln);

      // prepare request to Places
      var request = {
          location: cur_location,
          radius: rad,
          types: [type]
      };
      
      // send request
      console.log(typeof request)
      service = new google.maps.places.PlacesService(map);
      service.search(request, createMarkers);
    

}



function createMarkers(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      clearOverlays();
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    } else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        alert('Sorry, nothing is found');
    }
}



function createMarker(obj) {
    // prepare new Marker object
    var mark = new google.maps.Marker({
        position: obj.geometry.location,
        map: map,
        title: obj.name
    });

    markers.push(mark);

    // prepare info window
    var infowindow = new google.maps.InfoWindow({
        content: '<img src="' + obj.icon + '" /><font style="color:#000;">' + obj.name + '<br />Rating: ' + obj.rating + '<br />Vicinity: ' + obj.vicinity + '</font>'
    });

    console.log(infowindow);

    // add event handler to current marker
    google.maps.event.addListener(mark, 'click', function() {
        clearInfos();
        infowindow.open(map,mark);
    });

    infos.push(infowindow);
    
}

// initialization
google.maps.event.addDomListener(window, 'load', initialize);
