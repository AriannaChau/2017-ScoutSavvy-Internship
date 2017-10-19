(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "122c41335d25a6d2e625c1f4e196b52";

},{}],2:[function(require,module,exports){


//meetup callback
// exports.findMeetups =
//   $.ajax({
//     type:"GET", // GET = requesting data
//     url:"https://api.meetup.com/recommended/events?&sign=true&photo-host=public&page=4&fields=tech&key=" + apiKey,
//     success: function(data) {
//       let output = [];
//       for (var i = 0; i < 4; i++) {
//         let address = data.data[i].venue.address_1 + " " + data.data[i].venue.city + ", " + data.data[i].venue.state;
//         let meetup = [data.data[i].name, address, data.data[i].link];
//         output.push(meetup);
//         return output;
//       }
//     },
//     // error: function()
//     dataType: 'jsonp',
//   });

//charts
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
      chartDataFemale.push(avgFemaleWage);
      chartDataMale.push(avgMaleWage);
    });
  }

  //chart.js specific
  Chart.defaults.global.defaultFontColor = '#f1f1f1';
  Chart.defaults.global.defaultFontFamily = 'open sans';

  let chartLabels = this.newArrayWithTitleFromCodes(occupations);
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
              label: "Average Male Salary",
              backgroundColor: chartBgColorsDark,
              data: chartDataMale
            },
            {
              label: "Average Female Salary",
              backgroundColor: chartBgColorsLight,
              data: chartDataFemale
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'AVERAGE SALARY BY GENDER',
            fontSize: 20,
            fontFamily: 'comfortaa'
          }
        }
    }); //end of new chart
  }, 3000); //end of timeout and chart specific
};

exports.genderChartWorkforce = function(occupations) {
  $('#chart-container').append('<canvas id="myChartTwo"><canvas>');
  for (let i = 0; i < occupations.length; i++) {
    $.getJSON("https://api.datausa.io/api/?sort=desc&soc=" + occupations[i] + "&soc_level=3&show=sex&required=sex%2Cnum_ppl%2Cnum_ppl_moe&sumlevel=all&year=2015", function(data) {
      let males = data.data[0][3];
      let females = data.data[1][3];
      chartDataMale.push(males);
      chartDataFemale.push(females);
    });
  }
  //chart.js specific
  Chart.defaults.global.defaultFontColor = '#f1f1f1';
  Chart.defaults.global.defaultFontFamily = 'open sans';

  let chartLabels = this.newArrayWithTitleFromCodes(occupations);
  let chartDataMale = [];
  let chartDataFemale = [];
  let chartBgColorsLight = getChartBgColorLight(occupations);
  let chartBgColorsDark = getChartBgColorDark(occupations);

  setTimeout(function() {
    new Chart(document.getElementById("myChartTwo"), {
        type: 'bar',
        data: {
          labels: chartLabels,
          datasets: [
            {
              label: "Number of Males",
              backgroundColor: chartBgColorsDark,
              data: chartDataMale
            },
            {
              label: "Number of Females",
              backgroundColor: chartBgColorsLight,
              data: chartDataFemale
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'NUMBER OF PEOPLE IN WORKFORCE BY GENDER',
            fontSize: 20,
            fontFamily: 'comfortaa'
          }
        }
    }); //end of new chart
  }, 3000); //end of timeout and chart specific
};




exports.ethnicityChart = function(occupations) {
  $('#chart-container').empty();
  for (let i = 0; i < occupations.length; i++) {
    $('#chart-container').append('<canvas id="myChart' + i + '"><canvas>');
    $.getJSON("https://api.datausa.io/api/?sort=desc&sumlevel=all&soc=" + occupations[i] + "&required=num_ppl%2Cnum_ppl_moe&soc_level=3&show=race&year=2015", function(data) {
      let white = 0, black = 0, amIndian = 0, alaskaNative = 0, otherNative = 0, asian = 0, hawaiian = 0, other = 0, twoPlus = 0;

      for (let j = 0; j < data.data.length; j++) {
        if (data.data[j][2] === "1") { white += parseInt(data.data[j][3]); }
        else if (data.data[j][2] === "2") { black += parseInt(data.data[j][3]); }
        else if (data.data[j][2] === "3") { amIndian += parseInt(data.data[j][3]); }
        else if (data.data[j][2] === "4") { alaskaNative += parseInt(data.data[j][3]); }
        else if (data.data[j][2] === "5") { otherNative += parseInt(data.data[j][3]); }
        else if (data.data[j][2] === "6") { asian += parseInt(data.data[j][3]); }
        else if (data.data[j][2] === "7") { hawaiian += parseInt(data.data[j][3]); }
        else if (data.data[j][2] === "8") { other += parseInt(data.data[j][3]); }
        else if (data.data[j][2] === "9") { twoPlus += parseInt(data.data[j][3]); }
      }

      chartData.push(white, black, amIndian, alaskaNative, otherNative, asian, hawaiian, other, twoPlus);
    });//end api call
    //chart.js specific
    Chart.defaults.global.defaultFontColor = '#f1f1f1';
    Chart.defaults.global.defaultFontFamily = 'open sans';

    let chartData = [];
    // let chartLabels = this.newArrayWithTitleFromCodes(occupations);
    let chartLabels = ['White', 'Black', 'American Indian', 'Alaska Native', 'Other Native', 'Asian', 'Hawaiian', 'Other', 'Two+'];
    let chartBgColorsDark = getChartBgColorDark(chartLabels);
    let targetChart = "myChart" + i;
    setTimeout(function() {
      new Chart(document.getElementById(targetChart), {
        type: 'doughnut',
        data: {
          labels: chartLabels,
          datasets: [
            {
              label: "Computer Support Specialists",
              backgroundColor: chartBgColorsDark,
              data: chartData
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'NUMBER OF PEOPLE IN WORKFORCE BY GENDER',
            fontSize: 20,
            fontFamily: 'comfortaa'
          }
        }
      }); //end of new chart
    }, 3000); //end of timeout and chart specific
  }// end occupations loop

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

//chart colors
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
    let colors = ['#B8583A', '#AB9F2D', '#5C8EA6', '#8E63A9', '#7DB67B', '#316BB0', '#AE707E', '#BA994B', '#5B9785', '#8FC93A'];
    let counter = 0;
    for (var i = 0; i < occupations.length; i++) {
      output.push(colors[counter]);
      counter++;
    }
    return output;
}

},{}],3:[function(require,module,exports){
var data = require('./../js/backend.js');
var selectedOccupations, selectedChart, selectedCity, autocomplete, zip;

google.maps.event.addDomListener(window, 'load', initialize);
// initialize city input auto complete
function initialize() {
  var input = document.getElementById('city');
  autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  var place = autocomplete.getPlace();
  // selectedCity = place.address_components[0].long_name;
  for (var i = 0; i < place.address_components.length; i++) {
    for (var j = 0; j < place.address_components[i].types.length; j++) {
      if (place.address_components[i].types[j] == "postal_code") {
        zip = place.address_components[i].long_name;
      }
    }
  }
}

//user interface logic
$(function() {

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
    $(this).siblings().css('color', 'white');
    $(this).css('color', '#EADA3D');
  });

  $('#gender').click(function() {
    selectedChart = "gender";
    $(this).siblings().css('color', 'white');
    $(this).css('color', '#EADA3D');
  });

  $('#ethnicity').click(function() {
    selectedChart = "ethnicity";
    $(this).siblings().css('color', 'white');
    $(this).css('color', '#EADA3D');
  });

  $('.locationReload').click(function() {
    location.reload();
  });

  //append charts
  $('.go').click(function() {

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
    $('.selectedCity').text(selectedCity);
    $('#occupations').text(data.newArrayWithTitleFromCodes(selectedOccupations).join("/ "));
    //meetup specific
    var apiKey = require('./../.env').apiKey;
    $.ajax({
      type:"GET", // GET = requesting data
      url:"https://api.meetup.com/recommended/events?&sign=true&photo-host=public&page=4&fields=tech&key=" + apiKey,
      success: function(data) {
        let output = [];
        for (var i = 0; i < 4; i++) {
          let address = data.data[i].venue.address_1 + " " + data.data[i].venue.city + ", " + data.data[i].venue.state;
          $('.meetups').append(`
            <a href="${data.data[i].link}">
              <div id="meetup${[i]}" class="meetup">
                <h4 class="meetupTitle">${data.data[i].name}</h4>
                <p class="meetupAddress">${address}</p>
              </div>
            </a>
          `);
        }
      },
      // error: function()
      dataType: 'jsonp',
    });//end ajax
  }

  //toggle ethnicity charts
  $('#chartToggles').change(function() {
    let selection = $('#chartToggles').val();
    $('.chartjs-render-monitor').css({'visibility': 'hidden', 'position': 'absolute'});
    $('#' + selection).css({'visibility': 'visible', 'position': 'relative'});
  });


  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.
  $('#city').change(function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  });


});

},{"./../.env":1,"./../js/backend.js":2}]},{},[3]);
