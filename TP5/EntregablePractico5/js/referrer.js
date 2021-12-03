document.addEventListener("DOMContentLoaded", () => {
  
  // -------------- return url ------------------- //

  let buttonReturn = document.querySelector('#button-return');

  buttonReturn.addEventListener("click", () => {
    location.assign(document.referrer);
  });
});