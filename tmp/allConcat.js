var controller = require('./../js/datausa.js');
var webDevelopers = "151134";
var computerProgrammers = "151131";
var oregon = "16000US4159000";
var washington = "01000US%2C04000US53";

$(function() {

  $('#chart-form').submit(function(e){
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
});

$(function() {
  $('.chart').click(function() {
    $('#target').empty();
    testStateRaceAndEthnicity("16000US4159000");
  });

  $('.chart-two').click(function() {
    $('#target').empty();
    secondTestStateRaceAndEthnicity("16000US4159000");
  });

  function testStateRaceAndEthnicity(state) {
    // set the dimensions of the canvas
    var margin = {top: 20, right: 20, bottom: 70, left: 40},
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;


    // set the ranges
    var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.05);
    var y = d3.scale.linear().range([height, 0]);
    var offset = -60;
    function positionX() {
      offset += 70;
      return offset;
    }

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

        //set values to corresponding titles
        var races = ["Asian", "Black", "Hawaiian", "Latino", "Native", "White", "Multiple", "Other"];

      // scale the range of the data
      x.domain(races.map(function(race){return race;}));
      y.domain([0, d3.max(data, function(d) {
         return data[2].pop_white / 1000;
       })]);

      // add axis
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
        .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", "-.55em")
          .attr("transform", "rotate(-90)" );

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", -40)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("thousands");


      // Add bar chart
      svg.selectAll("bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(){ return positionX(); })
          .attr("width", x.rangeBand() - 20)
          .attr("y", function(d) { return y(data[2].pop_white); })
          .attr("height", function(d) { return height - y(data[2].pop_white); });

    });
  }





  function secondTestStateRaceAndEthnicity(state) {
    // set the dimensions of the canvas
    var margin = {top: 20, right: 20, bottom: 70, left: 40},
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;


    // set the ranges
    var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.05);
    var y = d3.scale.linear().range([height, 0]);
    var offset = -30;
    function positionX() {
      offset += 65;
      return offset;
    }

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

        //set values to corresponding titles
        var races = ["Asian", "Black", "Hawaiian", "Latino", "Native", "White", "Multiple", "Other"];

      // scale the range of the data
      x.domain(races.map(function(race){return race;}));
      y.domain([0, d3.max(data, function(d) {
         return data[2].pop_white / 1000;
       })]);

      // add axis
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
        .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", "-.55em")
          .attr("transform", "rotate(-90)" );

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", -40)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("thousands");


      // Add bar chart
      var imgs = svg.selectAll("image").data(races);
        imgs.enter().append("svg:image")
        .attr("class", "image")
        .attr("xlink:href", "http://freevector.co/wp-content/uploads/2009/04/57117-person-silhouette.png")
        .attr("x", function(){ return positionX(); })
        .attr("width", 20)
        .attr("y", height - 40)
        .attr("height", 20);
    });
  }

});

var config = require('./../js/api-keys.js');
var displayName, email, emailVerified, photoURL, isAnonymous, uid, providerData;

function checkUser() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      displayName = user.displayName;
      email = user.email;
      emailVerified = user.emailVerified;
      photoURL = user.photoURL;
      isAnonymous = user.isAnonymous;
      uid = user.uid;
      providerData = user.providerData;
      $('#target').text('signed in as ' + email);
      console.log(user);
    } else {
      $('#target').text('not logged in');
    }
  });
}

$(function() {
  firebase.initializeApp(config.config);
  checkUser();

  //show new account form
  $('.show-new-account').click(function() {
    $('#make-account').toggle();
  });

  $('.show-signin').click(function() {
    $('#signin').toggle();
  });

  //new users
  $('#make-account').submit(function(e) {
    e.preventDefault();
    let email = $('.new-email').val();
    let password = $('.new-password').val();
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
    checkUser();
    $('.new-password').val("");
    $('.new-email').val("");
  });

  //sign in existing users
  $('#signin').submit(function(e) {
    e.preventDefault();
    let email = $('.signin-email').val();
    let password = $('.signin-password').val();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
    checkUser();
    $('.signin-password').val("");
    $('.signin-email').val("");
  });

  //sign out
  $('#signout').click(function() {
    firebase.auth().signOut();
    checkUser();
  });

  //submit survey
  $('#survey').submit(function(e) {
    e.preventDefault();
    displayName = $('#display-name').val();
    userGender = $('#gender').val();
    userAge = $('#age').val();
    userRace = $('#race').val();
    firebase.database().ref('users/' + uid).set({
      displayName: displayName,
      gender: userGender,
      age: userAge,
      race: userRace
    });
    getUserById(uid);
  });

  //retreive user info
  function getUserById(userId) {
    console.log(firebase);
    // return firebase.database.object('users/' + userId);
  }
});
