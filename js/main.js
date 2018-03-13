// $('h1').html('Hello from js!');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBohusPJGq_pHzmOqcGQjjIORI9HA_uxdI",
  authDomain: "reservation-site-5c504.firebaseapp.com",
  databaseURL: "https://reservation-site-5c504.firebaseio.com",
  projectId: "reservation-site-5c504",
  storageBucket: "reservation-site-5c504.appspot.com",
  messagingSenderId: "688855184607"
};

firebase.initializeApp(config);

var database = firebase.database();
var reservationData = {};
    
// google map
function initMap() {
  var monkLatLng = {lat: 40.996154, lng: 17.221659};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: monkLatLng
  });

  // google map marker
  var marker = new google.maps.Marker({
    position: monkLatLng,
    map: map,
    title:"Monk's Cafe"
  });
}

// set the day when an option is clicked on
$('.reservation-day').on('change', function() {
  reservationData.day = $(this).val();
  reservationData.name = $('.reservation-name').val()

  console.log(reservationData);
});

// when submitted, the name data should be set
$('.reservation-form').on('submit', function(event) {
  event.preventDefault();

  // create a section for reservations data in your db
  var reservationsReference = database.ref('reservations');

  reservationsReference.push(reservationData);
  reservationData = {};
});

// use reference to database to listen for changes in reservations data
database.ref('reservations').on('value', function(results) {

  // Get all reservations stored in the results we received back from Firebase
  var allReservations = results.val();

  // remove all list reservations from DOM before appending list reservations
  $('.reservation-list').empty();

  // iterate (loop) through all reservations coming from database call
  for (var reservation in allReservations) {
    // Create an object literal with the data we'll pass to Handlebars
    var context = {
      name: allReservations[reservation].name,
      day: allReservations[reservation].day,
      reservationId: reservation
    };

   // Get the HTML from our Handlebars reservation template
    var source = $("#reservation-template").html();

    // Compile our Handlebars template
    var template = Handlebars.compile(source);

    // Pass the data for this reservation (context) into the template
    var reservationListItem = template(context);

    // Append newly created reservation to reservations list.
    $('.reservation-list').append(reservationListItem);
  }
});

// Smooth scrolling on navigation menu
var $root = $('html, body');

$('a[href^="#"]').click(function() {
    var href = $.attr(this, 'href');

    $root.animate({
        scrollTop: $(href).offset().top
    }, 500, function () {
        window.location.hash = href;
    });

    return false;
});

