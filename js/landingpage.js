// HEADER ANIMATION
window.onscroll = function() {scrollFunction()};
var element = document.getElementById("body");
function scrollFunction() {
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
      $(".navbar").addClass("fixed-top");
      element.classList.add("header-small");
      $("body").addClass("body-top-padding");

  } else {
      $(".navbar").removeClass("fixed-top");
      element.classList.remove("header-small");
      $("body").removeClass("body-top-padding");
  }
}

// OWL-CAROUSAL
$('.owl-carousel').owlCarousel({
    items: 3,
    loop:true,
    nav:false,
    dot:true,
    autoplay: true,
    slideTransition: 'linear',
    autoplayHoverPause: true,
    responsive:{
      0:{
          items:1
      },
      600:{
          items:2
      },
      1000:{
          items:3
      }
  }
})

// SCROLLSPY
$(document).ready(function() {
  $(".nav-link").click(function() {
      var t = $(this).attr("href");
      $("html, body").animate({
          scrollTop: $(t).offset().top - 75
      }, {
          duration: 1000,
      });
      $('body').scrollspy({ target: '.navbar',offset: $(t).offset().top });
      return false;
  });

});

// AOS
AOS.init({
    offset: 120, 
    delay: 0,
    duration: 1200, 
    easing: 'ease', 
    once: true, 
    mirror: false, 
    anchorPlacement: 'top-bottom', 
    disable: "mobile"
  });

//SIDEBAR-OPEN
  $('#navbarSupportedContent').on('hidden.bs.collapse', function () {
    $("body").removeClass("sidebar-open");
  })

  $('#navbarSupportedContent').on('shown.bs.collapse', function () {
    $("body").addClass("sidebar-open");
  })


  window.onresize = function() {
    var w = window.innerWidth;
    if(w>=992) {
      $('body').removeClass('sidebar-open');
      $('#navbarSupportedContent').removeClass('show');
    }
  }

//FORM SUBMIT
const scriptURL = 'https://script.google.com/macros/s/AKfycbxCtT4sqafCdSwoc5iw9BlCPkRGoRsSXeG45rfzckUDjlAGPyQy/exec';
const form = document.forms['submit-to-google-sheet'];

$("#contact").submit(function(event){
	event.preventDefault(); //prevent default action 
	var post_url = scriptURL //get form action url
	var request_method = 'POST' //get form GET/POST method
	var form_data = $(this).serialize(); //Encode form elements for submission
	
	$.ajax({
		url : post_url,
		type: request_method,
		data : form_data
	}).done(function(response){ //
    $("#server-results").html(response);
    $('#contact').trigger('reset');
    $('#exampleModal').modal('hide');
	});
});

//GOOGLE AUTOCOMPLETE
var autocomplete;

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete'), {types: ['geocode']});
    autocomplete.setFields(['address_component']);
}

function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle(
        {center: geolocation, radius: position.coords.accuracy});
        autocomplete.setBounds(circle.getBounds());
    });
  }
}

//SERVICE AREA AUTOCOMPLETE
// List of service addresses - UPDATE THIS LIST with your actual service locations
var serviceAddresses = [
  "123 Main St, Evanston, IL",
  "456 Oak Ave, Chicago, IL",
  "789 Elm Street, Oak Park, IL",
  "321 Maple Dr, Evanston, IL",
  "654 Pine Rd, Chicago, IL"
  // Add more addresses here
];

$(document).ready(function() {
  var searchInput = $('#service-area-search');
  var resultsContainer = $('#autocomplete-results');
  var currentFocus = -1;

  // Handle input
  searchInput.on('input', function() {
    var inputValue = this.value.toLowerCase();
    currentFocus = -1;

    // Clear previous results
    resultsContainer.empty().hide();

    if (!inputValue) {
      return;
    }

    // Filter addresses
    var matches = serviceAddresses.filter(function(address) {
      return address.toLowerCase().includes(inputValue);
    });

    // Display matches
    if (matches.length > 0) {
      matches.forEach(function(address) {
        var resultDiv = $('<div></div>')
          .addClass('autocomplete-item')
          .text(address)
          .on('click', function() {
            searchInput.val(address);
            resultsContainer.empty().hide();
          });
        resultsContainer.append(resultDiv);
      });
      resultsContainer.show();
    }
  });

  // Handle keyboard navigation
  searchInput.on('keydown', function(e) {
    var items = resultsContainer.find('.autocomplete-item');

    if (e.keyCode === 40) { // Down arrow
      e.preventDefault();
      currentFocus++;
      addActive(items);
    } else if (e.keyCode === 38) { // Up arrow
      e.preventDefault();
      currentFocus--;
      addActive(items);
    } else if (e.keyCode === 13) { // Enter
      e.preventDefault();
      if (currentFocus > -1 && items.length > 0) {
        items.eq(currentFocus).click();
      }
    }
  });

  function addActive(items) {
    if (!items || items.length === 0) return;
    removeActive(items);
    if (currentFocus >= items.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = items.length - 1;
    items.eq(currentFocus).addClass('autocomplete-active');
  }

  function removeActive(items) {
    items.removeClass('autocomplete-active');
  }

  // Close results when clicking outside
  $(document).on('click', function(e) {
    if (!$(e.target).closest('.autocomplete-wrapper').length) {
      resultsContainer.empty().hide();
    }
  });
});