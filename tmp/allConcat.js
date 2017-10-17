var data = require('./../js/backend.js');


$(function() {
  //temp
  $('.locationReload').click(function() {
    location.reload();
  });

  let selectedOccupations, selectedChart, selectedCity;

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
    $(this).parent().siblings().css('color', 'white');
    $(this).parent().css('color', '#EADA3D');
  });

  $('#gender').click(function() {
    selectedChart = "gender";
    $(this).parent().siblings().css('color', 'white');
    $(this).parent().css('color', '#EADA3D');
  });

  $('#ethnicity').click(function() {
    selectedChart = "ethnicity";
    $(this).parent().siblings().css('color', 'white');
    $(this).parent().css('color', '#EADA3D');
  });

  //append charts
  $('.go').click(function() {

    selectedCity = $('#city').val();

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
    $('#selectedCity').text(selectedCity);
    $('#occupations').text(data.newArrayWithTitleFromCodes(selectedOccupations).join("/ "));
  }

  //toggle ethnicity charts
  $('#chartToggles').change(function() {
    let selection = $('#chartToggles').val();
    $('.chartjs-render-monitor').css({'visibility': 'hidden', 'position': 'absolute'});
    $('#' + selection).css({'visibility': 'visible', 'position': 'relative'});
  });

});
