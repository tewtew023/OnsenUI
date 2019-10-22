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


function openShop(category) {
  document.querySelector('#myNavigator').pushPage('shop.html');
  localStorage.setItem("selectedCategory", category);

}

function openFoodDetails(shopid, id) {
  document.querySelector('#myNavigator').pushPage('food_details.html');
  console.log('shopid =' + shopid)
  localStorage.setItem("shopID", shopid);
  localStorage.setItem("foodID", id);
}
function openHome(id) {
  document.querySelector('#myNavigator').pushPage('home.html');
  // localStorage.setItem("shopID",id);
}
function goBack() {
  try {
    document.querySelector('#myNavigator').popPage()
  } catch (err) {
    document.querySelector('#myNavigator').pushPage('rec.html');
  }
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
function openPayment() {
  document.querySelector('#myNavigator').pushPage('payment.html');
} function openCart() {
  document.querySelector('#myNavigator').pushPage('cart.html');
}
function Paysuccess() {
  alert("Your foods are delivering");
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();






var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

localStorage.setItem("ordercount", 0);

//create kart function
function createCart(name, price, count,url) {
  var order_card;
  order_card = `<ons-card><ons-row><ons-col><img src="`+url+`" width="120" heigt="120"></ons-col>
  <ons-col>Menu : ` + name + `<br>
Price : `+ price + `</ons-col></ons-row></ons-card>`;
  var order_cards = "";
  for (var i = 1; i <= count; i++)

    order_cards = order_cards + order_card;


  localStorage.setItem("orderPrice", price)
  return order_cards;
}


//end create kart


//create shops card function
function createShopcard(url, name, id) {
  var card = `<ons-card onclick="openHome(` + id + `)"><img src=` + url + `>` + name + `</ons-card>`;
  return card;
};


document.addEventListener('init', function (event) {
  var page = event.target;
  console.log(page.id);
  $('#loguotbtn').invisible();
  ///////////////////////////////////////////////////////////////


  //create menu function
  function createMenu(url, name, id, shopID) {
    var item = '<ons-carousel-item modifier="nodivider" class="recomended_item" onclick="openFoodDetails(' + shopID + ',' + id + ')">' +
      '<img src="' + url + '">' +
      '<div class="recomended_item_title" id="item1_' + id + '">' + name + '</div>' +
      '</ons-carousel-item>';
    var promo = `<ons-carousel-item modifier="nodivider" class="promo_item">
 <img src="`+ url + `">
 </ons-carousel-item>`
    localStorage.setItem("promoItem", promo);

    return item;
  };
  ///////////////////////////////////////////////////////////////

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
        console.log(`${doc.data().id} => ${doc.data().name}`);
        var listid = `${doc.data().list_id}`
        console.log(listid);
        var item = createMenu(`${doc.data().url}`, `${doc.data().name}`, `${doc.data().id}`, `${doc.data().shop_id}`);

        if (listid == 1) { $("#list1").append(item); }
        else if (listid == 2) { $("#list2").append(item); }
        else if (listid == 3) { $("#list3").append(item); }
        else if (listid == 4) {
          item;
          $("#promo").append(localStorage.getItem("promoItem"));
        }
      });
    });
    $("#menubtn").click(function () {
      console.log('menubtn');
      $("#sidemenu")[0].open();
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



    $('#gglogin').click(function googleLogin() {
      firebase.auth().signInWithRedirect(provider);
      firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
        console.log('user' + token);

      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log('error' + errorCode);
      });
    });



  }
  //End Login page


  //start menu page
  if (page.id === 'menuPage') {
    console.log("menuPage");

    $("#login").click(function () {
      $("#content")[0].load("pagelogin.html");
      $("#sidemenu")[0].close();
    });

    $("#home").click(function () {
      $("#content")[0].load("home.html");
      $("#sidemenu")[0].close();
    });
  }
  //end menu
  //start reccommended page

  if (page.id === 'rec') {
    var i = 1;
    console.log('rec page');
    db.collection("category").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.data().id} => ${doc.data().name}`);
        var id = `${doc.data().id}`
        console.log(id);
        var item = `<img src="${doc.data().url}" width="120" heigt="120">`;



        $("#category" + i).append(item);
        i++;



      });

    });

    $("#menubtn").click(function () {
      $("#sidemenu")[0].open();
    });

  }

  // end rec page


  // start detail
  if (page.id === 'food_details') {
    console.log('fdetails page');
    var conft = "";
    var order_count = 0;



    var shop_n = "";
    var shop_id = localStorage.getItem("shopID");
    var foodID = localStorage.getItem("foodID");
    console.log('shop ID' + shop_id);
    console.log('food ID' + foodID);
    if (shop_id == "1002") {
      shop_n = "chestergrillmenu";
    }
    db.collection(shop_n).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.data().id} => ${doc.data().name}`);
        var id = `${doc.data().id}`
        var detail = `${doc.data().details}`
        var name = `${doc.data().name}`
        var price = `${doc.data().price}`
        var url = `${doc.data().url}`
        var cartItem = '';
        var item = `<img src="${doc.data().url}" width="120" heigt="120">`;
        console.log(id);
        if (id == foodID) {
          console.log('food id checked')
          $('#trailer').append(item);
          $('#detail').append(detail);

          $('#add').click(function () {
            order_count += 1;
            conft = 'Confirm oder(s) : ' + order_count;
            $('#conftext').empty();
            $('#conftext').append(conft);
            //  var amout=createKart(name,price,id,order_count);

            priceInt = parseInt(price);
            amout = priceInt * order_count;
            console.log(amout);

            cartItem = createCart(name, price, order_count,url);
            console.log(cartItem);
            localStorage.setItem("cartItem", cartItem);
            localStorage.setItem("amout",amout);
          });

          $('#remove').click(function () {
            order_count -= 1;
            amout = priceInt * order_count;
            console.log(order_count);
            if (order_count >= 0) {
              $('#conftext').empty();
              conft = 'Confirm oder(s) : ' + order_count;
              $('#conftext').append(conft);
            } else {
              order_count = 0;
              amout = priceInt * order_count;
              conft = 'Confirm oder(s) : ' + order_count + '';
              alert('Have no order');
            }
            console.log(amout);
            cartItem = createCart(name, price, order_count,url);
            console.log(cartItem);
            localStorage.setItem("cartItem", cartItem);
            localStorage.setItem("amout",amout);
          });


        }


      });

    });

  }
  //end detail  


  //start cart page

 // start detail
 if (page.id === 'cart') {
  var amout = localStorage.getItem("amout"); 
  console.log('Cart page');
 var card=  localStorage.getItem("cartItem");
 console.log('card'+card);
  $('#cartCard').append(card);
}

var confbtn =  `<ons-button class="conf" modifier="large" style="background-color: green " onclick="openPayment()" id="conftext">Amout: `+amout+`THB</ons-button>`
$('#cart').append(confbtn);

  //end cart



  //start shops

  if (page.id === 'shop') {
    console.log('shops page');
    db.collection("shops").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.data().id} => ${doc.data().name}`);
        var id = `${doc.data().id}`

        var category = localStorage.getItem("selectedCategory");
        console.log(category);
        if (category === `${doc.data().category_id}`) {
          $('#shopcard').append(createShopcard(`${doc.data().url}`, `${doc.data().name}`, `${doc.data().id}`));
        }
      });

    });
  }



  //end shops


  $('#loguotbtn').click(function () {
    $('#loguotbtn').invisible();
    firebase.auth().signOut().then(function () {
      console.log('Signed Out');
    }, function (error) {
      console.error('Sign Out Error', error);
    });
  });


});



