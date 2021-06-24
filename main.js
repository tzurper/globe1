var cardstate = false;
var firstTime = true;
var card = document.getElementById("card");
var info = document.querySelector(".info");
var text = document.querySelectorAll(".cardtext");

// this function controls the info card state (if its laying down or showing up) and the hints related to it, every time the card is clicked it adds the transition class to make the css transition and removes it after to make the card stay responsive with the rest of the page
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

// makes the info card visable only if there is the space for it
function cardShow(){
  if (innerHeight>innerWidth){
    card.style.display = "none";
    info.style.display = "none";
  }else{
    card.style.display = "block";
    info.style.display = "block";
  }
}

// if the card was pressed already it hides the hits
function hideHints(){
  firstTime=false;
  info.style.transition = "all 0.3s ease-in";
  info.style.opacity = "0";
  setTimeout(function(){
    info.style.display = "none";
  },500);
}

// this function controlls all the animation of the welcome screen
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
