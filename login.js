$(function(){
    console.log('hello world');

    $('#signed').click(function(){
        console.log('logged in');
        window.location.href = "index.html";
    })
    $('#sign-upbtn').click(function(){
        console.log('signed up');
        window.location.href = "Register.html";
    })
    $('#loginbtn').click(function(){
        console.log('Login clicked');
        window.location.href = "login.html";
    })
  });