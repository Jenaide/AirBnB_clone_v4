function init() {
  const amenityObj = {};

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
}

$(document).ready(init);
