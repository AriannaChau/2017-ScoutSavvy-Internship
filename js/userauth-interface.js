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
