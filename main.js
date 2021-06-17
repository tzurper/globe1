var cardstate = false;
var firstTime = true;
var card = document.getElementById("card");
var info = document.querySelector(".info");
var text = document.querySelectorAll(".cardtext");

function cardState(){
  cardstate = !cardstate;
  if(firstTime)
    hideHints();
  if (cardstate){
    card.classList.add("transition");
    card.classList.add("cardUP");
    for(var i = 0; i<text.length; i++){
      text[i].classList.add("transition");
      text[i].classList.add("cardtextUP");
    }
  }else{
    card.classList.add("transition");
    card.classList.remove("cardUP");
    for(var i = 0; i<text.length; i++){
      text[i].classList.add("transition");
      text[i].classList.remove("cardtextUP");
    }
  }
  setTimeout(function(){
    card.classList.remove("transition");
    for(var i = 0; i<text.length; i++){
      text[i].classList.remove("transition");
    }
  },500);

}

function cardShow(){
  if (innerHeight>innerWidth){
    card.style.display = "none";
    info.style.display = "none";
  }else{
    card.style.display = "block";
    info.style.display = "block";
  }
}

function hideHints(){
  firstTime=false;
  info.style.transition = "all 0.3s ease-in";
  info.style.opacity = "0";
  setTimeout(function(){
    info.style.display = "none";
  },500);
}

function show(){
  var bg = document.getElementById("loader");
  bg.style.transition = "all 0.5s ease-in";
  bg.style.background = "radial-gradient(100% 200% at 0% 0%, #000000 0%, rgba(0, 0, 0, 0) 100%)";
  bg.style.backgroundColor = "rgba(0,0,0,0)";

  document.getElementById("progress").style.transition = "all 0.1s ease-in";
  document.getElementById("progress").style.opacity = "0";

  setTimeout(function(){
    document.querySelectorAll(".loadingS")[0].style.transition = "all 0.5s ease-in";
    document.querySelectorAll(".title")[0].style.transition = "all 0.5s ease-in";
    document.querySelectorAll(".loadingS")[0].style.opacity = "0";
    document.querySelectorAll(".title")[0].style.left = "-33vw";
  },1000);
  setTimeout(function(){
    bg.style.opacity = "0";
  },1500);

  setTimeout(function(){
    bg.style.display = "none";
  },2000);
}

function doneLoadingPage(){
  document.getElementById("progress").innerHTML="click to enter";
}

window.onload = function() {
  doneLoadingPage();
};

window.addEventListener('resize', cardShow, false);
