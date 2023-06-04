function init() {
  const amenityObj = {};
  const Host = '0.0.0.0';

  $('.amenities .popover input').on('change', function () {
    const name = $(this).data('name');
    const id = $(this).data('id');

    if (this.checked) {
      amenityObj[name] = id;
    } else {
      delete amenityObj[name];
    }

    const names = Object.keys(amenityObj).sort().join(', ');
    $('.amenities h4').text(names);
  });

  $.get('http://${HOST}:5001/api/v1/status/', function(data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
}

$(document).ready(init);
