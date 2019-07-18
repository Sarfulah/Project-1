let loadGoogleMaps = () => {
  let mapsScript = document.createElement('script');
  let url = 'https://maps.googleapis.com/maps/api/js?key='
  let apiKey = 'AIzaSyDYrB7J2OwaJIDAr5IypwJZmCJ-NhZWGu4'

  let finalURL = url + apiKey + '&callback=initMap';

  mapsScript.setAttribute('src', finalURL);

  document.head.appendChild(mapsScript);
}


function initMap () {
  document.getElementById('findADoctorGoogleMap').innerHTML = '';

  let newMap = document.createElement('div')
  newMap.id = 'map';

  document.getElementById('findADoctorGoogleMap').append(newMap);

  let map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: currentSession.userLat, lng: currentSession.userLon},
    zoom: 12
  });

  let doctorsLocation = [];
  let bounds = new google.maps.LatLngBounds();
  for(let i = 0; i < currentSession.doctorsData.length; i++){
    if( currentSession.doctorsData[i].practices.length > 0){
      let streetAddress = currentSession.doctorsData[i].practices[0].visit_address.street
      let street2 = currentSession.doctorsData[i].practices[0].visit_address.street2;
      if(street2 != undefined){
        streetAddress += '\n' + street2;
      }
      let newMarker = new google.maps.Marker({
          position: {lat: currentSession.doctorsData[i].practices[0].lat, lng: currentSession.doctorsData[i].practices[0].lon},
          map: map,
          title: currentSession.doctorsData[i].practices[0].name + '\n' + streetAddress + '\n' + currentSession.doctorsData[i].practices[0].visit_address.state + ', ' + currentSession.doctorsData[i].practices[0].visit_address.zip,
          id: i
      })

      doctorsLocation.push(newMarker);
      bounds.extend(newMarker.position);
    }
  }

  map.fitBounds(bounds);
  
  
}