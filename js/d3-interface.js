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
