(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.ageChart = function(occupations) {
  $('#chart-container').empty();
  $('#chart-container').append('<canvas id="myChart"><canvas>');
  for (let i = 0; i < occupations.length; i++) {
    $.getJSON("https://api.datausa.io/api/?sort=desc&soc=" + occupations[i] + "&soc_level=3&show=age%2Csex&required=age%2Cnum_ppl%2Cnum_ppl_moe&sumlevel=all%2Call&year=2015", function(data) {
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
      chartDataMale.push(avgMale);
      chartDataFemale.push(avgFemale);
    });//end of api call
  }//end of for loop

  //chart.js specific
  Chart.defaults.global.defaultFontColor = '#f1f1f1';
  Chart.defaults.global.defaultFontFamily = 'open sans';

  let chartLabels = this.newArrayWithTitleFromCodes(occupations);
  let chartDataAge = [];
  let chartDataMale = [];
  let chartDataFemale = [];
  let chartBgColorsLight = getChartBgColorLight(occupations);
  let chartBgColorsDark = getChartBgColorDark(occupations);

  setTimeout(function() {
    new Chart(document.getElementById("myChart"), {
        type: 'bar',
        data: {
          labels: chartLabels,
          datasets: [
            {
              label: "avg male age",
              backgroundColor: chartBgColorsDark,
              hoverBorderColor: 'white',
              hoverBorderWidth: '1',
              data: chartDataMale
            },
            {
              label: "avg female age",
              backgroundColor: chartBgColorsLight,
              hoverBorderColor: 'white',
              hoverBorderWidth: '1',
              data: chartDataFemale
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Age',
            position: 'left',
            fontSize: 20,
            fontFamily: 'comfortaa'
          }
        }
    }); //end of new chart
  }, 3000); //end of timeout and chart specific
};//end of function





exports.genderChartSalary = function(occupations) {
  $('#chart-container').empty();
  $('#chart-container').append('<canvas id="myChart"><canvas>');
  for (let i = 0; i < occupations.length; i++) {
    $.getJSON("https://api.datausa.io/api/?sort=desc&show=soc%2Csex&required=num_ppl%2Cnum_ppl_moe%2Cavg_wage_ft%2Cavg_wage_ft_moe&sumlevel=3%2Call&year=2015&geo=01000US&soc=" + occupations[i], function(data) {
      let avgMaleWage = data.data[0][6];
      let avgFemaleWage = data.data[1][6];
      console.log(occupations[i], "MalesWage: ", avgMaleWage, " FemalesWage: ", avgFemaleWage);
    });
  }

  //chart.js specific
  Chart.defaults.global.defaultFontColor = '#f1f1f1';
  Chart.defaults.global.defaultFontFamily = 'open sans';

  let chartLabels = this.newArrayWithTitleFromCodes(occupations);
  let chartData = [];
  let chartBgColors = getChartBgColor(occupations);

  // console.log(chartBgColors);
  // setTimeout(function() {
  //   new Chart(document.getElementById("myChart"), {
  //       type: 'doughnut',
  //       data: {
  //         labels: chartLabels,
  //         datasets: [
  //           {
  //             label: "age",
  //             backgroundColor: chartBgColors,
  //             data: chartData
  //           }
  //         ]
  //       },
  //       options: {
  //         title: {
  //           display: true,
  //           text: 'Average age of occupations',
  //           fontSize: 30,
  //           fontFamily: "comfortaa"
  //         }
  //       }
  //   }); //end of new chart
  // }, 3000); //end of timeout and chart specific
};

exports.genderChartWorkforce = function(occupations) {
  $('#chart-container').empty();
  $('#chart-container').append('<canvas id="myChart"><canvas>');
  for (let i = 0; i < occupations.length; i++) {
    $.getJSON("https://api.datausa.io/api/?sort=desc&soc=" + occupations[i] + "&soc_level=3&show=sex&required=sex%2Cnum_ppl%2Cnum_ppl_moe&sumlevel=all&year=2015", function(data) {
      let males = data.data[0][3];
      let females = data.data[1][3];
      console.log(occupations[i], "Males#: ", males, " Females#: ", females);
    });
  }
};




exports.ethnicityChart = function(occupations) {
  $('#chart-container').empty();
  $('#chart-container').append('<canvas id="myChart"><canvas>');
  for (let i = 0; i < occupations.length; i++) {
    $.getJSON("https://api.datausa.io/api/?sort=desc&soc=" + occupations[i] + "&soc_level=3&show=age%2Csex&required=age%2Cnum_ppl%2Cnum_ppl_moe&sumlevel=all%2Call&year=2015", function(data) {

    });
  }
};





exports.newArrayWithTitleFromCodes = function(occupations) {
  let listOfOccupations = [{title: 'Computer support specialists', code: '151150'}, {title: 'Computer programmers', code: '151131'}, {title: 'Computer systems analysts', code: '151121'}, {title: 'Database administrators', code: '151141'}, {title: 'Computer hardware engineers', code: '172061'}, {title: 'Computer network architects', code: '151143'}, {title: 'Computer & information research scientists', code: '151111'}, {title: 'Software developers, applications & systems software', code: '15113X'}, {title: 'Computer control programmers and operators', code: '514010'}];
  let newArray = [];
  for (let i = 0; i < occupations.length; i++) {
    for (let j = 0; j < listOfOccupations.length; j++) {
      if (occupations[i] === listOfOccupations[j].code) {
        newArray.push(listOfOccupations[j].title);
      }
    }
  }
  return newArray;
};

// function getChartBgColor(occupations) {
//     let output = [];
//     let colors = ['#FC784F', '#EADA3D', '#7EC2E3', '#C287E8', '#ABFAA9', '#4392F1', '#EF99AC', '#FFD166', '#7DCFB6'];
//     let counter = 0;
//     for (var i = 0; i < occupations.length; i++) {
//       output.push(colors[counter]);
//       counter++;
//     }
//     return output;
// }
function getChartBgColorLight(occupations) {
    let output = [];
    let colors = ['#FC9C7F', '#EFE471', '#A1D2EA', '#D2A7EE', '#C1FBC0', '#76AFF4', '#F3B4C2', '#FFDD8F', '#A0DCC9'];
    let counter = 0;
    for (var i = 0; i < occupations.length; i++) {
      output.push(colors[counter]);
      counter++;
    }
    return output;
}
function getChartBgColorDark(occupations) {
    let output = [];
    let colors = ['#B8583A', '#AB9F2D', '#5C8EA6', '#8E63A9', '#7DB67B', '#316BB0', '#AE707E', '#BA994B', '#5B9785'];
    let counter = 0;
    for (var i = 0; i < occupations.length; i++) {
      output.push(colors[counter]);
      counter++;
    }
    return output;
}

},{}],2:[function(require,module,exports){
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
      data.genderChartWorkforce(selectedOccupations);
      data.genderChartSalary(selectedOccupations);
      showChart();
    } else if (selectedChart === "ethnicity"){
      // data.ethnicityChart(selectedOccupations);
      // data.newArrayWithTitleFromCodes(selectedOccupations);
      // showChart();
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

},{"./../js/backend.js":1}]},{},[2]);
