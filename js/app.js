
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
    document.querySelector('#myNavigator').pushPage('pageRegister.html');  
  }
  function openPayment(){
    document.querySelector('#myNavigator').pushPage('payment.html'); 
  }
  function Paysuccess(){
    alert("Your foods are delivering");
  }