(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function StateWageByGender(state) {
  d3.json("https://api.datausa.io/api/?sort=desc&show=soc%2Csex&required=num_ppl%2Cnum_ppl_moe%2Cavg_wage_ft%2Cavg_wage_ft_moe&sumlevel=3%2Call&year=all&geo=" + state , function(data) {
    console.log(data);
  });
}

function StateHouseholdIncome(state) {
  d3.json("https://api.datausa.io/api/?sort=desc&show=geo&required=income%2Cincome_moe&sumlevel=all&year=all&geo=" + state , function(data) {
    console.log(data);
  });
}

function StateWageByRaceAndEthnicity2014(state) {
  d3.json("https://api.datausa.io/api/?sort=desc&sumlevel=3%2Call&limit=45&show=soc%2Crace&year=2014&required=num_ppl%2Cnum_ppl_moe%2Cavg_wage%2Cavg_wage_moe&geo=" + state , function(data) {
    console.log(data);
  });
}

function StateWageByRaceAndEthnicity2015(state) {
  d3.json("https://api.datausa.io/api/?sort=desc&sumlevel=3%2Call&limit=45&show=soc%2Crace&year=2015&required=num_ppl%2Cnum_ppl_moe%2Cavg_wage%2Cavg_wage_moe&geo=" + state , function(data) {
    console.log(data);
  });
}

function StateAgeByNativity(state) {
  d3.json("https://api.datausa.io/api/?sort=desc&force=acs.yg_nativity_age&show=geo&sumlevel=all&year=all&geo=" + state , function(data) {
    console.log(data);
  });
}

function StateRaceAndEthnicity(state) {
  d3.json("https://api.datausa.io/api/?sort=desc&force=acs.yg_race&show=geo&sumlevel=all&year=all&geo=" + state , function(data) {
    console.log(data);
  });
}

function StatePropertyValue(state) {
  d3.json("https://api.datausa.io/api/?sort=desc&show=soc%2Csex&required=num_ppl%2Cnum_ppl_moe%2Cavg_wage_ft%2Cavg_wage_ft_moe&sumlevel=3%2Call&year=all&geo=" + state , function(data) {
    console.log(data);
  });
}

function AllOccupationsYearlyWage() {
  d3.json("https://api.datausa.io/api/?sort=desc&required=avg_wage%2Cavg_wage_moe%2Cavg_wage_rank&soc_level=3&show=soc&sumlevel=3&year=all&where=num_records%3A%3E4&order=avg_wage" , function(data) {
    console.log(data);
  });
}

function UnitedStatesRaceAndEthnicity() {
  d3.json("https://api.datausa.io/api/?sort=desc&show=race&required=num_ppl%2Cnum_ppl_moe&sumlevel=all&year=all&geo=01000US" , function(data) {
    console.log(data);
  });
}

function OccupationRaceAndEthnicity(occupation) {
  d3.json("https://api.datausa.io/api/?sort=desc&soc=" + occupation + "&soc_level=3&show=race&required=num_ppl%2Cnum_ppl_moe&sumlevel=all&year=all" , function(data) {
    console.log(data);
  });
}

function OccupationAgeByGender(occupation) {
  d3.json("https://api.datausa.io/api/?sort=desc&soc=" + occupation + "&soc_level=3&show=age%2Csex&required=age%2Cnum_ppl%2Cnum_ppl_moe&sumlevel=all%2Call&year=all" , function(data) {
    console.log(data);
  });
}

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

  $('form').submit(function(e){
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
});

$(function() {
  $('.chart').click(function() {
    $('#target').empty();
    testStateRaceAndEthnicity("16000US4159000");
  });

  function testStateRaceAndEthnicity(state) {
    // set the dimensions of the canvas
    var margin = {top: 20, right: 20, bottom: 70, left: 40},
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;


    // set the ranges
    var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.05);

    var y = d3.scale.linear().range([height, 0]);

    // define the axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");


    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);


    // add the SVG element
    var svg = d3.select("#target").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");


    d3.json("https://api.datausa.io/api/?sort=desc&force=acs.yg_race&show=geo&sumlevel=all&year=all&geo=" + state , function(json) {

        //combine headers and values
        var data = json.data.map(function(data){
          return json.headers.reduce(function(obj, header, i){
            obj[header] = data[i];
            return obj;
          }, {});
        });

        //set necessary variables
        data.forEach(function(data) {
          console.log(data);
            var year = data.year,
            twoOrMore = data.pop_2ormore,
            asian = data.pop_asian,
            black = data.pop_black,
            hawaiian = data.pop_hawaiian,
            latino = data.pop_latino,
            native = data.pop_native,
            white = data.pop_white,
            other = data.pop_other;
            console.log(twoOrMore + " " + asian + " " + black + " " + hawaiian + " " + latino + " " + native + " " + white + " " + other)
        });
      //
      // // scale the range of the data
      // x.domain(data.map(function(d) { return d.Letter; }));
      // y.domain([0, d3.max(data, function(d) { return d.Freq; })]);
      //
      // // add axis
      // svg.append("g")
      //     .attr("class", "x axis")
      //     .attr("transform", "translate(0," + height + ")")
      //     .call(xAxis)
      //   .selectAll("text")
      //     .style("text-anchor", "end")
      //     .attr("dx", "-.8em")
      //     .attr("dy", "-.55em")
      //     .attr("transform", "rotate(-90)" );
      //
      // svg.append("g")
      //     .attr("class", "y axis")
      //     .call(yAxis)
      //   .append("text")
      //     .attr("transform", "rotate(-90)")
      //     .attr("y", 5)
      //     .attr("dy", ".71em")
      //     .style("text-anchor", "end")
      //     .text("Frequency");
      //
      //
      // // Add bar chart
      // svg.selectAll("bar")
      //     .data(data)
      //   .enter().append("rect")
      //     .attr("class", "bar")
      //     .attr("x", function(d) { return x(d.Letter); })
      //     .attr("width", x.rangeBand())
      //     .attr("y", function(d) { return y(d.Freq); })
      //     .attr("height", function(d) { return height - y(d.Freq); });

    });
  }
});

},{"./../js/datausa.js":1}]},{},[2]);
