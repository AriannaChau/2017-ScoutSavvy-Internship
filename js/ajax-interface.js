var controller = require('./../js/datausa.js');
var webDevelopers = "151134";
var computerProgrammers = "151131";
var oregon = "16000US4159000";
var washington = "01000US%2C04000US53";

$(function() {

  $('#chart-form').submit(function(e){
    e.preventDefault();

    var selectedState = $('.stateInput').val().toLowerCase();

    //reset fields
    $('#target').empty();
    $('.stateInput').val('');

    //append title
    d3.select("#target").append("h1")
        .text(selectedState + " State Race and Ethnicity")
        .style("text-transform", "uppercase");

    //append iframe
    d3.select("#target").append("iframe")
        .attr("width", 720)
        .attr("height", 480)
        .attr("src", "https://embed.datausa.io/profile/geo/" + selectedState + "/demographics/ethnicity?viz=True")
        // .style("background-color", "rebeccapurple")
        .attr("frameborder", 0);
  });

  // controller.stateWageByGender(washington);
  // controller.stateHouseholdIncome(oregon);
  // controller.stateWageByRaceAndEthnicity2014(oregon);
  // controller.stateWageByRaceAndEthnicity2015(oregon);
  // controller.stateAgeByNativity(oregon);
  // controller.stateRaceAndEthnicity(oregon);
  // controller.statePropertyValue(oregon);
  // controller.allOccupationsYearlyWage();
  // controller.unitedStatesRaceAndEthnicity();
  // controller.occupationRaceAndEthnicity(webDevelopers);
  // controller.occupationAgeByGender(webDevelopers);
});
