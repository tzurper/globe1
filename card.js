var cardstate = false;
var element = document.getElementById("card");
var text = document.querySelectorAll(".cardtext");

function cardState(){
  cardstate = !cardstate;
  if (cardstate){
    element.classList.add("transition");
    element.classList.add("cardUP");
    for(var i = 0; i<text.length; i++){
      text[i].classList.add("transition");
      text[i].classList.add("cardtextUP");
    }
  }else{
    element.classList.add("transition");
    element.classList.remove("cardUP");
    for(var i = 0; i<text.length; i++){
      text[i].classList.add("transition");
      text[i].classList.remove("cardtextUP");
    }
  }
  setTimeout(function(){
    element.classList.remove("transition");
    for(var i = 0; i<text.length; i++){
      text[i].classList.remove("transition");
    }
  },500);

}

function cardShow(){
  document.getElementById("card")
  if (innerHeight>innerWidth){
    element.style.display = "none";
  }else{
    element.style.display = "block";
  }
}

window.addEventListener('resize', cardShow, false);
