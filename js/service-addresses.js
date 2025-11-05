(function populateServiceAddresses() {
  var datalist = document.getElementById('service-addresses');

  if (!datalist) {
    return;
  }

  var addresses = [
    '101 Main St, Evanston, IL 60201',
    '245 Ridge Ave, Evanston, IL 60202',
    '3900 N Lake Shore Dr, Chicago, IL 60613',
    '1525 W Jarvis Ave, Chicago, IL 60626',
    '820 Lake St, Oak Park, IL 60301',
    '4700 Oakton St, Skokie, IL 60076'
  ];

  if (addresses.length === 0) {
    return;
  }

  addresses.forEach(function(address) {
    var option = document.createElement('option');
    option.value = address;
    datalist.appendChild(option);
  });
})();
