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

//CUSTOM ADDRESS AUTOCOMPLETE
// List of addresses where service is provided
// Update this array with your actual service locations
var serviceAddresses = [
  "123 Main Street, Evanston, IL 60201",
  "456 Oak Avenue, Evanston, IL 60202",
  "789 Maple Drive, Oak Park, IL 60302",
  "321 Elm Street, Chicago, IL 60614",
  "654 Pine Road, Evanston, IL 60201",
  "987 Cedar Lane, Chicago, IL 60657",
  "147 Birch Court, Oak Park, IL 60304",
  "258 Willow Way, Evanston, IL 60203"
];

$(document).ready(function() {
  var addressInput = $('#autocomplete');
  var suggestionsDiv = $('#address-suggestions');

  // Handle input events
  addressInput.on('input', function() {
    var query = $(this).val().toLowerCase().trim();

    if (query.length === 0) {
      suggestionsDiv.hide();
      return;
    }

    // Filter addresses that match the query
    var matches = serviceAddresses.filter(function(address) {
      return address.toLowerCase().indexOf(query) !== -1;
    });

    // Display suggestions
    if (matches.length > 0) {
      var html = '';
      matches.forEach(function(address) {
        html += '<div class="autocomplete-suggestion">' + address + '</div>';
      });
      suggestionsDiv.html(html).show();
    } else {
      suggestionsDiv.html('<div class="autocomplete-no-results">No matching addresses found. Please check if we service your area.</div>').show();
    }
  });

  // Handle suggestion click
  $(document).on('click', '.autocomplete-suggestion', function() {
    addressInput.val($(this).text());
    suggestionsDiv.hide();
  });

  // Hide suggestions when clicking outside
  $(document).on('click', function(e) {
    if (!$(e.target).closest('#autocomplete, #address-suggestions').length) {
      suggestionsDiv.hide();
    }
  });

  // Handle focus
  addressInput.on('focus', function() {
    if ($(this).val().length > 0) {
      $(this).trigger('input');
    }
  });
});