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

//ADDRESS AUTOCOMPLETE FOR SERVICE CHECK
// Array of service addresses - populate this with your actual addresses
var serviceAddresses = [
  // Example format: "123 Main St, City, State ZIP"
  // Add your addresses here
  // "123 Main St, Chicago, IL 60601",
  // "456 Oak Ave, Evanston, IL 60201",
];

// Track selected address and active index
var selectedAddress = null;
var activeIndex = -1;
var filteredAddresses = [];

$(document).ready(function() {
  var $input = $('#address-autocomplete');
  var $dropdown = $('#address-dropdown');
  var $checkBtn = $('#check-service-btn');

  // Input event - filter addresses as user types
  $input.on('input', function() {
    var query = $(this).val().trim();
    selectedAddress = null; // Reset selection when typing

    if (query.length === 0) {
      hideDropdown();
      return;
    }

    // Filter addresses that match the query (case-insensitive)
    filteredAddresses = serviceAddresses.filter(function(address) {
      return address.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    // Display filtered results
    if (filteredAddresses.length > 0) {
      displayResults(filteredAddresses);
      showDropdown();
    } else {
      displayNoResults();
      showDropdown();
    }

    activeIndex = -1;
  });

  // Keyboard navigation
  $input.on('keydown', function(e) {
    var $items = $dropdown.find('.autocomplete-item');

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, $items.length - 1);
      updateActiveItem($items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, -1);
      updateActiveItem($items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < filteredAddresses.length) {
        selectAddress(filteredAddresses[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      hideDropdown();
    }
  });

  // Click outside to close dropdown
  $(document).on('click', function(e) {
    if (!$(e.target).closest('.autocomplete-wrapper').length) {
      hideDropdown();
    }
  });

  // Check for service button click
  $checkBtn.on('click', function() {
    if (selectedAddress) {
      // Show the modal with selected address
      $('#selected-address').text(selectedAddress);
      $('#serviceCheckModal').modal('show');
    } else {
      // Show validation message
      var currentValue = $input.val().trim();
      if (currentValue.length === 0) {
        alert('Please enter an address to check for service availability.');
      } else {
        alert('Please select a valid address from the dropdown list.');
      }
      $input.focus();
    }
  });

  // Service check form submission (placeholder)
  $('#service-check-form').on('submit', function(e) {
    e.preventDefault();
    var name = $('#customer-name').val().trim();
    var phone = $('#customer-phone').val().trim();

    if (name && phone) {
      // TODO: Add your form submission logic here
      console.log('Form submitted:', {
        name: name,
        phone: phone,
        address: selectedAddress
      });

      // For now, just show a success message and close modal
      alert('Thank you! We will contact you shortly to set up your service.');
      $('#service-check-form')[0].reset();
      $('#serviceCheckModal').modal('hide');
      $input.val('');
      selectedAddress = null;
    }
  });

  // Helper functions
  function displayResults(addresses) {
    $dropdown.empty();
    addresses.forEach(function(address, index) {
      var $item = $('<div>')
        .addClass('autocomplete-item')
        .text(address)
        .attr('data-index', index)
        .on('click', function() {
          selectAddress(address);
        });
      $dropdown.append($item);
    });
  }

  function displayNoResults() {
    $dropdown.empty();
    $dropdown.append('<div class="no-results">No service available at this address yet. Contact us to bring Lynx to your area!</div>');
  }

  function showDropdown() {
    $dropdown.addClass('show');
  }

  function hideDropdown() {
    $dropdown.removeClass('show');
    activeIndex = -1;
  }

  function selectAddress(address) {
    selectedAddress = address;
    $input.val(address);
    hideDropdown();
  }

  function updateActiveItem($items) {
    $items.removeClass('active');
    if (activeIndex >= 0) {
      $items.eq(activeIndex).addClass('active');
      // Scroll into view if needed
      var $activeItem = $items.eq(activeIndex);
      if ($activeItem.length) {
        var dropdownHeight = $dropdown.height();
        var itemTop = $activeItem.position().top;
        var itemHeight = $activeItem.outerHeight();

        if (itemTop < 0) {
          $dropdown.scrollTop($dropdown.scrollTop() + itemTop);
        } else if (itemTop + itemHeight > dropdownHeight) {
          $dropdown.scrollTop($dropdown.scrollTop() + itemTop + itemHeight - dropdownHeight);
        }
      }
    }
  }
});