//AGE CHART
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

//GENDER CHART SALARY
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

//GENDER CHART WORKFORCE
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


//ETHNICITY CHART
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
