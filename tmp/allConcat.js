var data = require('./../js/backend.js');
var selectedOccupations, selectedChart, selectedCity, autocomplete, zip;

google.maps.event.addDomListener(window, 'load', initialize);
// initialize city input auto complete
function initialize() {
  var input = document.getElementById('city');
  autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  var place = autocomplete.getPlace();
  // selectedCity = place.address_components[0].long_name;
  for (var i = 0; i < place.address_components.length; i++) {
    for (var j = 0; j < place.address_components[i].types.length; j++) {
      if (place.address_components[i].types[j] == "postal_code") {
        zip = place.address_components[i].long_name;
      }
    }
  }
}

//user interface logic
$(function() {

  //check checkboxes when box is clicked
  $('.box-control').click(function() {
    if ($(this).siblings('input').is(':checked')) {
      $(this).siblings('input').prop('checked', false);
    } else {
      $(this).siblings('input').prop('checked', true);
    }
    selectedOccupations = $('input:checkbox:checked.occupation').map(function () {
      return this.value;
    }).get();
  });

  //get selected occupations on change
  $('.occupation').change(function() {
    selectedOccupations = $('input:checkbox:checked.occupation').map(function () {
      return this.value;
    }).get();
  });

  //select charts
  $('#age').click(function() {
    selectedChart = "age";
    $(this).siblings().css('color', 'white');
    $(this).css('color', '#EADA3D');
  });

  $('#gender').click(function() {
    selectedChart = "gender";
    $(this).siblings().css('color', 'white');
    $(this).css('color', '#EADA3D');
  });

  $('#ethnicity').click(function() {
    selectedChart = "ethnicity";
    $(this).siblings().css('color', 'white');
    $(this).css('color', '#EADA3D');
  });

  $('.locationReload').click(function() {
    location.reload();
  });

  //append charts
  $('.go').click(function() {

    if (selectedCity === '') {
      alert('Please enter a city');
    } else if (selectedOccupations === undefined) {
      alert('Please select at least one occupation.');
    } else if (selectedChart === undefined) {
      alert('Please select Age, Gender, or Ethnicity.');

    } else if (selectedChart === "age"){
      data.ageChart(selectedOccupations);
      $('#selectedChart').text('age');
      $('#chart-container').prepend('<h4>Average age of occupations</h4>');
      showChart();

    } else if (selectedChart === "gender"){
      $('#selectedChart').text('gender');
      data.genderChartSalary(selectedOccupations);
      data.genderChartWorkforce(selectedOccupations);
      showChart();

    } else if (selectedChart === "ethnicity"){
      $('#chartToggles').show();
      $('#selectedChart').text('ethnicity');
      data.ethnicityChart(selectedOccupations);
      let occupationTitles = data.newArrayWithTitleFromCodes(selectedOccupations);
      for (var i = 0; i < occupationTitles.length; i++) {
        $('#chartToggles').append('<option value="myChart' + i + '">' + occupationTitles[i] + '</option>');
      }
      showChart();
    }
  });

  //transition to about-section
  $('.about-link').click(function() {
    $('section').hide();
    $('#about-section').show();
  });

  //transition to resources-section
  $('.resources-link').click(function() {
    $('section').hide();
    $('#resources-section').show();
  });

  //transition to explore-section
  function showChart() {
    $('section').fadeOut(2000);
    setTimeout(function(){
      $('#chart-section').fadeIn(2000);
    }, 2500);
    $('.selectedCity').text(selectedCity);
    $('#occupations').text(data.newArrayWithTitleFromCodes(selectedOccupations).join("/ "));
    //meetup specific
    var apiKey = require('./../.env').apiKey;
    $.ajax({
      type:"GET", // GET = requesting data
      url:"https://api.meetup.com/recommended/events?&sign=true&photo-host=public&page=4&fields=tech&key=" + apiKey,
      success: function(data) {
        let output = [];
        for (var i = 0; i < 4; i++) {
          let address = data.data[i].venue.address_1 + " " + data.data[i].venue.city + ", " + data.data[i].venue.state;
          $('.meetups').append(`
            <a href="${data.data[i].link}">
              <div id="meetup${[i]}" class="meetup">
                <h4 class="meetupTitle">${data.data[i].name}</h4>
                <p class="meetupAddress">${address}</p>
              </div>
            </a>
          `);
        }
      },
      // error: function()
      dataType: 'jsonp',
    });//end ajax
  }

  //toggle ethnicity charts
  $('#chartToggles').change(function() {
    let selection = $('#chartToggles').val();
    $('.chartjs-render-monitor').css({'visibility': 'hidden', 'position': 'absolute'});
    $('#' + selection).css({'visibility': 'visible', 'position': 'relative'});
  });


  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.
  $('#city').change(function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  });


});
