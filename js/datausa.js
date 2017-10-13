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