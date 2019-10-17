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






var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');






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

//start home page
  if (page.id === 'home') {
    console.log('home');
  db.collection("chestergrillmenu").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.data().id} => ${doc.data().url}`);
        var item = `<ons-carousel-item modifier="nodivider" class="recomended_item">
        <img src="${doc.data().url}">
        <div class="recomended_item_title" id="item1_${doc.data().id}">${doc.data().name}</div>
        </ons-carousel-item>`;
      $("#list").append(item);
      console.log(item);
    });
});
}

//end home page


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



    $('#gglogin').click( function googleLogin() {
      firebase.auth().signInWithRedirect(provider);
      firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
        console.log('user'+token);
        
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log('error'+errorCode);
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



