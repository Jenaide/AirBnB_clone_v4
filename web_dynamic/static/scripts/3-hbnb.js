$(document).ready(function(init) {
  const amenityObj = {};
  const Host = '0.0.0.0';
  const PLACES_URL = `http://${HOST}:5001/api/v1/places_search/`;


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

  $.get(`http://${HOST}:5001/api/v1/status/`, function(data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  
  $.ajax({
    url: PLACES_URL,
    type: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({}),
    success: function(data) {
      data.forEach(function(place) {
        const article = `
          <article>
            <div class="title_box">
              <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest(s)}</div>
              <div class="number_rooms">${place.number_rooms} Bedroom(s)</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom(s)}</div>
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>
        `;
        $('section.places').append(article.join(''));
      });
    },
    error: function(error) {
      console.log(error);
    }
  });
});
