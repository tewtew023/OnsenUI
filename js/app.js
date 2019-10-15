// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAKcz3NgRSyTBYnAfpGnkaEaEfkLwgSYlY",
  authDomain: "food-first-b91f2.firebaseapp.com",
  databaseURL: "https://food-first-b91f2.firebaseio.com",
  projectId: "food-first-b91f2",
  storageBucket: "food-first-b91f2.appspot.com",
  messagingSenderId: "509663659157",
  appId: "1:509663659157:web:7377b143116d3ae499c79c",
  measurementId: "G-YF41N5BQBX"
};
(function ($) {
  $.fn.invisible = function () {
    return this.each(function () {
      $(this).css("visibility", "hidden");
    });
  };
  $.fn.visible = function () {
    return this.each(function () {
      $(this).css("visibility", "visible");
    });
  };
}(jQuery));



function openFoodDetails(id) {
  document.querySelector('#myNavigator').pushPage('food_details.html');
}
function openHome() {
  document.querySelector('#myNavigator').pushPage('home_splitter.html');
}
function goBack() {
  document.querySelector('#myNavigator').popPage()
}
function openLogin() {
  document.querySelector('#myNavigator').pushPage('pagelogin.html');
}
function openSignup() {
  document.querySelector('#myNavigator').pushPage('register.html');
}
function openPayment() {
  document.querySelector('#myNavigator').pushPage('payment.html');
}
function Paysuccess() {
  alert("Your foods are delivering");
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();





document.addEventListener('init', function (event) {
  var page = event.target;
  console.log(page.id);
  $('#loguotbtn').invisible();

  //Mornitor authen status
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      $('#loguotbtn').visible();
      var email = user.email;
      console.log(email + "  signed in");
    } else {
      console.log("signed out");

      // User is signed out.
      // ...
    }
  });


  //Start Register page
  if (page.id === 'Register') {

    $("#subtn").click(function () {
      var email = $("#email").val();
      var pwd = $('#pwd').val();
      console.log(email + pwd);
      console.log("sign-up clicked");
      firebase.auth().createUserWithEmailAndPassword(email, pwd).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
      });
    });
  }

  //End Register page


  //Start Login page
  if (page.id === 'pagelogin') {
    $('#signed-in').click(function () {
      var email = $("#email").val();
      var pwd = $('#pwd').val();
      firebase.auth().signInWithEmailAndPassword(email, pwd).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }


      });
    });

  }
  //End Login page


  $('#loguotbtn').click(function () {
    $('#loguotbtn').invisible();
    firebase.auth().signOut().then(function () {
      console.log('Signed Out');
    }, function (error) {
      console.error('Sign Out Error', error);
    });
  });


});


