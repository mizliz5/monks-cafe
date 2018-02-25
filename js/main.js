// $('h1').html('Hello from js!');

function initMap() {
  var monkLatLng = {lat: 40.8054491, lng: -73.9654415};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: monkLatLng
  });

  var marker = new google.maps.Marker({
    position: monkLatLng,
    map: map,
    title:"Monk's Cafe"
  });
}