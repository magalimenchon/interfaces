document.addEventListener("DOMContentLoaded", () => {
  
  // -------------- change page search ------------------- //

  let searchBar = document.querySelector(".search-bar");

  searchBar.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      //set time Out de carga

      location.assign("search.html");
    }
  });
});