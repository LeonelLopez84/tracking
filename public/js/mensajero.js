var database = firebase.database();

var posiciones = database.ref().child('posiciones');

 var refreshIntervalId;


 function initMap() {

 		posiciones.set({});

	        var map = new google.maps.Map(document.getElementById('map'), {
	          center: {lat: -34.397, lng: 150.644},
	          zoom: 15
	        });
	        var infoWindow = new google.maps.InfoWindow({map: map});

	        // Try HTML5 geolocation.
	        if (navigator.geolocation) {
	          navigator.geolocation.getCurrentPosition(function(position) {
	            var pos = {
	              lat: position.coords.latitude,
	              lng: position.coords.longitude
	            };

	            map.setCenter(pos);
	            var marker = new google.maps.Marker({
			          position: pos,
			          map: map,
			          draggable:true
			        });
	           var i=0;
	          refreshIntervalId = setInterval(function(){
						          	++i;
						          	 getPosition(marker,i);
						          },1000);
	         

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


function getPosition(mker,i){
	 	var lat = mker.getPosition().lat();
		var lng = mker.getPosition().lng();
		var D=new Date();
		var created_at=D.getFullYear()+"-"+(D.getMonth()+1)+"-"+D.getDate()+" "+D.getHours()+":"+D.getMinutes()+":"+D.getSeconds();
		var current={lat:lat,lng:lng,created_at:created_at};
		console.log('pos'+i);
		console.log(current);
		posiciones.child('trip1').child('pos'+i).set(current);
      }

 document.getElementById("detener").addEventListener("click",function(){clearInterval(refreshIntervalId);});
