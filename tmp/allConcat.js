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
