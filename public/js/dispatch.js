
var database = firebase.database();

var trip = database.ref().child('posiciones').child('trip1');
var lista = document.getElementById('lista');
var posicion={};
var marker={};

	 function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 15
        });
        var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
                    
				
	            marker = new google.maps.Marker({
			          map: map,
			        });

            trip.on('child_added',snap=>{
	
				const li = document.createElement('li');
				posicion = snap.val();
				li.innerHTML=posicion.created_at+" | "+posicion.lat+" | "+posicion.lng;
				lista.prepend(li);
				map.setCenter(posicion);
				marker.setPosition(posicion);

			});
          
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
  }