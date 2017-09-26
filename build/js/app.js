(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function StateWageByGender(state) {
  d3.json("https://api.datausa.io/api/?sort=desc&show=soc%2Csex&required=num_ppl%2Cnum_ppl_moe%2Cavg_wage_ft%2Cavg_wage_ft_moe&sumlevel=3%2Call&year=all&geo=" + state , function(data) {
    console.log(data);
  });
};

function StateHouseholdIncome(state) {
  d3.json("https://api.datausa.io/api/?sort=desc&show=geo&required=income%2Cincome_moe&sumlevel=all&year=all&geo=" + state , function(data) {
    console.log(data);
  });
};

function StateWageByRaceAndEthnicity2014(state) {
  d3.json("https://api.datausa.io/api/?sort=desc&sumlevel=3%2Call&limit=45&show=soc%2Crace&year=2014&required=num_ppl%2Cnum_ppl_moe%2Cavg_wage%2Cavg_wage_moe&geo=" + state , function(data) {
    console.log(data);
  });
};

function StateWageByRaceAndEthnicity2015(state) {
  d3.json("https://api.datausa.io/api/?sort=desc&sumlevel=3%2Call&limit=45&show=soc%2Crace&year=2015&required=num_ppl%2Cnum_ppl_moe%2Cavg_wage%2Cavg_wage_moe&geo=" + state , function(data) {
    console.log(data);
  });
};

function StateAgeByNativity(state) {
  d3.json("https://api.datausa.io/api/?sort=desc&force=acs.yg_nativity_age&show=geo&sumlevel=all&year=all&geo=" + state , function(data) {
    console.log(data);
  });
};

function StateRaceAndEthnicity(state) {
  d3.json("https://api.datausa.io/api/?sort=desc&force=acs.yg_race&show=geo&sumlevel=all&year=all&geo=" + state , function(data) {
    console.log(data);
  });
};

function StatePropertyValue(state) {
  d3.json("https://api.datausa.io/api/?sort=desc&show=soc%2Csex&required=num_ppl%2Cnum_ppl_moe%2Cavg_wage_ft%2Cavg_wage_ft_moe&sumlevel=3%2Call&year=all&geo=" + state , function(data) {
    console.log(data);
  });
};

function AllOccupationsYearlyWage() {
  d3.json("https://api.datausa.io/api/?sort=desc&required=avg_wage%2Cavg_wage_moe%2Cavg_wage_rank&soc_level=3&show=soc&sumlevel=3&year=all&where=num_records%3A%3E4&order=avg_wage" , function(data) {
    console.log(data);
  });
};

function UnitedStatesRaceAndEthnicity() {
  d3.json("https://api.datausa.io/api/?sort=desc&show=race&required=num_ppl%2Cnum_ppl_moe&sumlevel=all&year=all&geo=01000US" , function(data) {
    console.log(data);
  });
};

function OccupationRaceAndEthnicity(occupation) {
  d3.json("https://api.datausa.io/api/?sort=desc&soc=" + occupation + "&soc_level=3&show=race&required=num_ppl%2Cnum_ppl_moe&sumlevel=all&year=all" , function(data) {
    console.log(data);
  });
};

function OccupationAgeByGender(occupation) {
  d3.json("https://api.datausa.io/api/?sort=desc&soc=" + occupation + "&soc_level=3&show=age%2Csex&required=age%2Cnum_ppl%2Cnum_ppl_moe&sumlevel=all%2Call&year=all" , function(data) {
    console.log(data);
  });
};

exports.stateWageByGender = StateWageByGender;
exports.stateHouseholdIncome = StateHouseholdIncome;
exports.stateWageByRaceAndEthnicity2014 = StateWageByRaceAndEthnicity2014;
exports.stateWageByRaceAndEthnicity2015 = StateWageByRaceAndEthnicity2015;
exports.stateAgeByNativity = StateAgeByNativity;
exports.stateRaceAndEthnicity = StateRaceAndEthnicity;
exports.statePropertyValue = StatePropertyValue;
exports.allOccupationsYearlyWage = AllOccupationsYearlyWage;
exports.unitedStatesRaceAndEthnicity = UnitedStatesRaceAndEthnicity;
exports.occupationRaceAndEthnicity = OccupationRaceAndEthnicity;
exports.occupationAgeByGender = OccupationAgeByGender;

},{}],2:[function(require,module,exports){
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

},{"./../js/datausa.js":1}]},{},[2]);
