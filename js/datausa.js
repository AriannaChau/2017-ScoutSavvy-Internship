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
      // console.log(occupations[i], avgMale, avgFemale, avgAge);
      chartDataAge.push(avgAge);
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
  let chartBgColors = getChartBgColor(occupations);
  let chartBgColorsLight = getChartBgColorLight(occupations);
  let chartBgColorsDark = getChartBgColorDark(occupations);

  console.log(chartBgColors);
  setTimeout(function() {
    new Chart(document.getElementById("myChart"), {
        type: 'bar',
        data: {
          labels: chartLabels,
          datasets: [
            {
              label: "avg total age",
              backgroundColor: chartBgColors,
              data: chartDataAge
            },
            {
              label: "avg male age",
              backgroundColor: chartBgColorsLight,
              data: chartDataMale
            },
            {
              label: "avg female age",
              backgroundColor: chartBgColorsDark,
              data: chartDataFemale
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Average age of occupations',
            fontSize: 30,
            fontFamily: "comfortaa"
          }
        }
    }); //end of new chart
  }, 3000); //end of timeout and chart specific
};//end of function

exports.genderChartSalary = function(occupations) {
  for (let i = 0; i < occupations.length; i++) {
    d3.json("https://api.datausa.io/api/?sort=desc&show=soc%2Csex&required=num_ppl%2Cnum_ppl_moe%2Cavg_wage_ft%2Cavg_wage_ft_moe&sumlevel=3%2Call&year=2015&geo=01000US&soc=" + occupations[i], function(data) {
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
  console.log(newArray);
  return newArray;
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

function getChartBgColor(occupations) {
    let output = [];
    let colors = ['#FC784F', '#EADA3D', '#7EC2E3', '#C287E8', '#ABFAA9', '#4392F1', '#EF99AC', '#FFD166', '#7DCFB6'];
    let counter = 0;
    for (var i = 0; i < occupations.length; i++) {
      output.push(colors[counter]);
      counter++;
    }
    return output;
}
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
