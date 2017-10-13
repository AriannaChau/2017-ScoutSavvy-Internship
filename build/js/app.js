(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.ageChart = function(occupations) {
  for (let i = 0; i < occupations.length; i++) {
    d3.json("https://api.datausa.io/api/?sort=desc&soc=" + occupations[i] + "&soc_level=3&show=age%2Csex&required=age%2Cnum_ppl%2Cnum_ppl_moe&sumlevel=all%2Call&year=2015", function(data) {
      let avgMale = 0,
      avgFemale = 0,
      avgAge = 0,
      numOfMales = 0,
      numOfFemales = 0;

      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i][2] === "1") {
          avgMale += parseInt(data.data[i][3]);
          numOfMales++;
        } else {
          avgFemale += parseInt(data.data[i][3]);
          numOfFemales++;
        }
      }
      avgMale /= numOfMales;
      avgFemale /= numOfFemales;
      avgMale = Math.round(avgMale * 100)/100;
      avgFemale = Math.round(avgFemale * 100)/100;
      avgAge = (avgMale + avgFemale)/ 2;
      avgAge = Math.round(avgAge * 100)/100;
      console.log(occupations[i], avgMale, avgFemale, avgAge);
    });
  }
};

exports.genderChartSalary = function(occupations) {
  for (let i = 0; i < occupations.length; i++) {
    d3.json("https://api.datausa.io/api/?sort=desc&show=soc%2Csex&required=num_ppl%2Cnum_ppl_moe%2Cavg_wage_ft%2Cavg_wage_ft_moe&sumlevel=3%2Call&year=2015&geo=01000US&soc=" + occupations[i], function(data) {
      let avgMaleWage = data.data[0][6];
      let avgFemaleWage = data.data[1][6];
      console.log(occupations[i], "MalesWage: ", avgMaleWage, " FemalesWage: ", avgFemaleWage);
    });
  }
};

exports.genderChartWorkforce = function(occupations) {
  for (let i = 0; i < occupations.length; i++) {
    d3.json("https://api.datausa.io/api/?sort=desc&soc=" + occupations[i] + "&soc_level=3&show=sex&required=sex%2Cnum_ppl%2Cnum_ppl_moe&sumlevel=all&year=2015", function(data) {
      let males = data.data[0][3];
      let females = data.data[1][3];
      console.log(occupations[i], "Males#: ", males, " Females#: ", females);
    });
  }
};

exports.ethnicityChart = function(occupations) {
  for (let i = 0; i < occupations.length; i++) {
    d3.json("https://api.datausa.io/api/?sort=desc&soc=" + occupations[i] + "&soc_level=3&show=age%2Csex&required=age%2Cnum_ppl%2Cnum_ppl_moe&sumlevel=all%2Call&year=2015", function(data) {

    });
  }
};

exports.obesity = function() {
  d3.json("https://api.datausa.io/api/join?required=income,adult_obesity&show=geo", function(data) {
    console.log(data);
  });
};

// function StateWageByGender(state) {
//   d3.json("https://api.datausa.io/api/?sort=desc&show=soc%2Csex&required=num_ppl%2Cnum_ppl_moe%2Cavg_wage_ft%2Cavg_wage_ft_moe&sumlevel=3%2Call&year=all&geo=" + state , function(data) {
//     console.log(data);
//   });
// }
// function StateHouseholdIncome(state) {
//   d3.json("https://api.datausa.io/api/?sort=desc&show=geo&required=income%2Cincome_moe&sumlevel=all&year=all&geo=" + state , function(data) {
//     console.log(data);
//   });
// }
//
// function StateWageByRaceAndEthnicity2014(state) {
//   d3.json("https://api.datausa.io/api/?sort=desc&sumlevel=3%2Call&limit=45&show=soc%2Crace&year=2014&required=num_ppl%2Cnum_ppl_moe%2Cavg_wage%2Cavg_wage_moe&geo=" + state , function(data) {
//     console.log(data);
//   });
// }
//
// function StateWageByRaceAndEthnicity2015(state) {
//   d3.json("https://api.datausa.io/api/?sort=desc&sumlevel=3%2Call&limit=45&show=soc%2Crace&year=2015&required=num_ppl%2Cnum_ppl_moe%2Cavg_wage%2Cavg_wage_moe&geo=" + state , function(data) {
//     console.log(data);
//   });
// }
//
// function StateAgeByNativity(state) {
//   d3.json("https://api.datausa.io/api/?sort=desc&force=acs.yg_nativity_age&show=geo&sumlevel=all&year=all&geo=" + state , function(data) {
//     console.log(data);
//   });
// }
//
// function StateRaceAndEthnicity(state) {
//   d3.json("https://api.datausa.io/api/?sort=desc&force=acs.yg_race&show=geo&sumlevel=all&year=all&geo=" + state , function(data) {
//     console.log(data);
//   });
// }
//
// function StatePropertyValue(state) {
//   d3.json("https://api.datausa.io/api/?sort=desc&show=soc%2Csex&required=num_ppl%2Cnum_ppl_moe%2Cavg_wage_ft%2Cavg_wage_ft_moe&sumlevel=3%2Call&year=all&geo=" + state , function(data) {
//     console.log(data);
//   });
// }
//
// function AllOccupationsYearlyWage() {
//   d3.json("https://api.datausa.io/api/?sort=desc&required=avg_wage%2Cavg_wage_moe%2Cavg_wage_rank&soc_level=3&show=soc&sumlevel=3&year=all&where=num_records%3A%3E4&order=avg_wage" , function(data) {
//     console.log(data);
//   });
// }
//
// function UnitedStatesRaceAndEthnicity() {
//   d3.json("https://api.datausa.io/api/?sort=desc&show=race&required=num_ppl%2Cnum_ppl_moe&sumlevel=all&year=all&geo=01000US" , function(data) {
//     console.log(data);
//   });
// }
//
// exports.occupationRaceAndEthnicity = function(occupations) {
//   for (let i = 0; i < occupations.length; i++) {
//     d3.json("https://api.datausa.io/api/?sort=desc&soc=" + occupations[i] + "&soc_level=3&show=race&required=num_ppl%2Cnum_ppl_moe&sumlevel=all&year=all" , function(data) {
//       console.log(data);
//     });
//   }
// }
//
// function OccupationAgeByGender(occupation) {
//   d3.json("https://api.datausa.io/api/?sort=desc&soc=" + occupation + "&soc_level=3&show=age%2Csex&required=age%2Cnum_ppl%2Cnum_ppl_moe&sumlevel=all%2Call&year=all" , function(data) {
//     console.log(data);
//   });
// }
//

},{}],2:[function(require,module,exports){
var data = require('./../js/datausa.js');

$(function() {
  let selectedOccupations;

  //get selected occupations on change
  $('.occupation').change(function() {
    selectedOccupations = $('input:checkbox:checked.occupation').map(function () {
      return this.value;
    }).get();
    console.log(selectedOccupations);
  });

  $('#age').click(function() {
    if (selectedOccupations === undefined) {
      alert('please select at least one occupation');
    } else {
        data.ageChart(selectedOccupations);
    }
  });

  $('#gender').click(function() {
    if (selectedOccupations === undefined) {
      alert('please select at least one occupation');
    } else {
        data.genderChartWorkforce(selectedOccupations);
        data.genderChartSalary(selectedOccupations);
    }
  });

  $('#ethnicity').click(function() {
    if (selectedOccupations === undefined) {
      alert('please select at least one occupation');
    } else {
        // data.obesity();
        // data.ethnicityChart(selectedOccupations);
    }
  });
});


// function testStateRaceAndEthnicity(state) {
//   // set the dimensions of the canvas
//   var margin = {top: 20, right: 20, bottom: 70, left: 40},
//       width = 600 - margin.left - margin.right,
//       height = 300 - margin.top - margin.bottom;
//
//
//   // set the ranges
//   var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.05);
//   var y = d3.scale.linear().range([height, 0]);
//   var offset = -60;
//   function positionX() {
//     offset += 70;
//     return offset;
//   }
//
//   // define the axis
//   var xAxis = d3.svg.axis()
//       .scale(x)
//       .orient("bottom");
//
//
//   var yAxis = d3.svg.axis()
//       .scale(y)
//       .orient("left")
//       .ticks(10);
//
//
//   // add the SVG element
//   var svg = d3.select("#target").append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//       .attr("transform",
//             "translate(" + margin.left + "," + margin.top + ")");
//
//
//   d3.json("https://api.datausa.io/api/?sort=desc&force=acs.yg_race&show=geo&sumlevel=all&year=all&geo=" + state , function(json) {
//
//       //combine headers and values
//       var data = json.data.map(function(data){
//         return json.headers.reduce(function(obj, header, i){
//           obj[header] = data[i];
//           return obj;
//         }, {});
//       });
//
//       //set values to corresponding titles
//       var races = ["Asian", "Black", "Hawaiian", "Latino", "Native", "White", "Multiple", "Other"];
//
//     // scale the range of the data
//     x.domain(races.map(function(race){return race;}));
//     y.domain([0, d3.max(data, function(d) {
//        return data[2].pop_white / 1000;
//      })]);
//
//     // add axis
//     svg.append("g")
//         .attr("class", "x axis")
//         .attr("transform", "translate(0," + height + ")")
//         .call(xAxis)
//       .selectAll("text")
//         .style("text-anchor", "end")
//         .attr("dx", "-.8em")
//         .attr("dy", "-.55em")
//         .attr("transform", "rotate(-90)" );
//
//     svg.append("g")
//         .attr("class", "y axis")
//         .call(yAxis)
//       .append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("y", -40)
//         .attr("dy", ".71em")
//         .style("text-anchor", "end")
//         .text("thousands");
//
//
//     // Add bar chart
//     svg.selectAll("bar")
//         .data(data)
//       .enter().append("rect")
//         .attr("class", "bar")
//         .attr("x", function(){ return positionX(); })
//         .attr("width", x.rangeBand() - 20)
//         .attr("y", function(d) { return y(data[2].pop_white); })
//         .attr("height", function(d) { return height - y(data[2].pop_white); });
//
//   });
// }
//
//
//
//
//
// function secondTestStateRaceAndEthnicity(state) {
//   // set the dimensions of the canvas
//   var margin = {top: 20, right: 20, bottom: 70, left: 40},
//       width = 600 - margin.left - margin.right,
//       height = 300 - margin.top - margin.bottom;
//
//
//   // set the ranges
//   var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.05);
//   var y = d3.scale.linear().range([height, 0]);
//   var offset = -30;
//   function positionX() {
//     offset += 65;
//     return offset;
//   }
//
//   // define the axis
//   var xAxis = d3.svg.axis()
//       .scale(x)
//       .orient("bottom");
//
//
//   var yAxis = d3.svg.axis()
//       .scale(y)
//       .orient("left")
//       .ticks(10);
//
//
//   // add the SVG element
//   var svg = d3.select("#target").append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//       .attr("transform",
//             "translate(" + margin.left + "," + margin.top + ")");
//
//
//   d3.json("https://api.datausa.io/api/?sort=desc&force=acs.yg_race&show=geo&sumlevel=all&year=all&geo=" + state , function(json) {
//
//       //combine headers and values
//       var data = json.data.map(function(data){
//         return json.headers.reduce(function(obj, header, i){
//           obj[header] = data[i];
//           return obj;
//         }, {});
//       });
//
//       //set values to corresponding titles
//       var races = ["Asian", "Black", "Hawaiian", "Latino", "Native", "White", "Multiple", "Other"];
//
//     // scale the range of the data
//     x.domain(races.map(function(race){return race;}));
//     y.domain([0, d3.max(data, function(d) {
//        return data[2].pop_white / 1000;
//      })]);
//
//     // add axis
//     svg.append("g")
//         .attr("class", "x axis")
//         .attr("transform", "translate(0," + height + ")")
//         .call(xAxis)
//       .selectAll("text")
//         .style("text-anchor", "end")
//         .attr("dx", "-.8em")
//         .attr("dy", "-.55em")
//         .attr("transform", "rotate(-90)" );
//
//     svg.append("g")
//         .attr("class", "y axis")
//         .call(yAxis)
//       .append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("y", -40)
//         .attr("dy", ".71em")
//         .style("text-anchor", "end")
//         .text("thousands");
//
//
//     // Add bar chart
//     var imgs = svg.selectAll("image").data(races);
//       imgs.enter().append("svg:image")
//       .attr("class", "image")
//       .attr("xlink:href", "http://freevector.co/wp-content/uploads/2009/04/57117-person-silhouette.png")
//       .attr("x", function(){ return positionX(); })
//       .attr("width", 20)
//       .attr("y", height - 40)
//       .attr("height", 20);
//   });
// }

},{"./../js/datausa.js":1}]},{},[2]);
