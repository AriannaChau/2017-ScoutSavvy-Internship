var data = require('./../js/backend.js');


$(function() {
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
      $('#selectedChart').text('ethnicity');
      data.ethnicityChart(selectedOccupations);
      showChart();
    }
  });

  function showChart() {
    $('#city').val('');
    $('#explore').fadeOut(2000);
    setTimeout(function(){
      $('#chart-section').fadeIn(2000);
    }, 2500);
    $('#selectedCity').text(selectedCity);
    $('#occupations').text(data.newArrayWithTitleFromCodes(selectedOccupations).join("/ "));
  }

});
