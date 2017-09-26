var controller = require('./../js/datausa.js');

var webDevelopers = "151134";
var computerProgrammers = "151131";
var oregon = "16000US4159000";
var washington = "01000US%2C04000US53";

$(function() {
  controller.stateWageByGender(washington);
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
