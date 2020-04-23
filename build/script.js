"use strict";

// BUTTON - Got to Top
// from https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
var buttonTop = document.getElementById("btnTop"); // When the user scrolls down 250px from the top of the document, show the button

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
    buttonTop.style.display = "block";
  } else {
    buttonTop.style.display = "none";
  }
} // When the user clicks on the button, scroll to the top of the document


function topFunction() {
  document.body.scrollTop = 0; // For Safari

  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}