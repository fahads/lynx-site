(function() {
  const serviceAddresses = [
    "1738 Chicago Ave, Evanston, IL 60201"
  ];

  const datalist = document.getElementById('service-addresses');
  if (datalist) {
    serviceAddresses.forEach(function(address) {
      const option = document.createElement('option');
      option.value = address;
      datalist.appendChild(option);
    });
  }

  const form = document.getElementById('service-address-form');
  const input = document.getElementById('service-address-input');

  if (!form || !input) {
    return;
  }

  function matchesServiceArea(value) {
    return serviceAddresses.some(function(address) {
      return address.toLowerCase() === value.toLowerCase();
    });
  }

  input.addEventListener('input', function() {
    input.setCustomValidity('');
  });

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const value = input.value.trim();

    if (!matchesServiceArea(value)) {
      input.setCustomValidity('Please select an address from the list.');
      input.reportValidity();
      return;
    }

    input.setCustomValidity('');

    if (typeof $ !== 'undefined' && $('#exampleModal').length) {
      $('#exampleModal').modal('show');
    }
  });
})();
