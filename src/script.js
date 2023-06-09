const API_KEY = "api_key=6d67021662c3fe14209fe92c098382d6";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchUrl = BASE_URL + "/search/movie?" + API_KEY;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const titleBtn = document.getElementById("titleBtn");
const genreSegment = document.getElementById("genreSegment");

//genre API fetching
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDY3MDIxNjYyYzNmZTE0MjA5ZmU5MmMwOTgzODJkNiIsInN1YiI6IjY0N2Y3YjUwY2E3ZWM2MDEzOTAwM2M0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SHKgRO855Lu-KlPrIQ3ga_LPeh68FnPDEF39Moz_cXo",
  },
};

fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
  .then((response) => response.json())
  .then((response) => {
    console.log(response.genres);
    getGenres(response.genres);
  })
  .catch((err) => console.error(err));

function getGenres(Arrays) {
  Arrays.forEach((array) => {
    const { id, name } = array;
    const genreBtn = `
            <button id="${id}" onclick="myFunction(${id})"class=" gBtn flex items-center bg-sky-600 h-8 mx-2 my-2 px-2 rounded-md text-white font-semibold hover:scale-105 duration-300 shadow-md hover:shadow-button">
            <h1>${name}</h1>
            </button>
        `;
    genreSegment.innerHTML += genreBtn;
  });
}
function home(){

  main.innerHTML = "";
  clickColor(0);
  getMovies(API_URL);

}

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data.results);
      showMovies(data.results);
      //getMatched(data.results);
    });
}

function clickColor(id){
  const buttonCollection = genreSegment.getElementsByTagName("button");
  //console.log(buttonCollection);
  Array.from(buttonCollection).forEach((btn) => {
    //console.log(btn)
    if (btn.id == id) {
      if(btn.style.backgroundColor === "orange"){
        console.log("doble clickd")
        home();
        throw new Error("");

      }
      else{

        btn.style.backgroundColor = "orange";
      }
    }
    else{
      btn.style.backgroundColor = "rgb(2 132 199)";
    }
  });
  // const clicked = document.getElementById(id);

}

function myFunction(id) {
  
  
  clickColor(id);

  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data.results);
      //showMovies(data.results);
      getMatched(data.results, id);
    });
  //console.log(id);
}



function showMovies(data) {
  data.forEach((movie) => {
    const { title, overview, poster_path, vote_average } = movie;

    movieEl = document.createElement("div");
    movieEl.classList.add("relative");
    movieEl.innerHTML = `
        <img src=${IMG_URL + poster_path} alt="">
        <div class="flex justify-between">
            <h1 class="font-bold">${title}</h1>
            <h1 class="font-bold text-orange-600" >${vote_average}</h1>

        </div>

        <div class="overflow-x-scroll absolute w-54 right-0 bottom-0 left-0 bg-white opacity-0 -translate-y-6 hover:opacity-90 duration-300 text-sm p-8  ">
            <h1 class="font-semibold">Overview</h1>
            <p>${overview}</p>
        </div>
        `;
    main.appendChild(movieEl);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = "";
  const searchTerm = search.value;
  console.log(searchUrl);
  if (searchTerm) {
    getMovies(searchUrl + "&query=" + searchTerm);
  }
});

titleBtn.addEventListener("click",home);



function getMatched(data, id) {
  const catagorizedData = [];
  data.forEach((element) => {
    const { genre_ids } = element;
    //console.log(genre_ids);
    genre_ids.forEach((e) => {
      if (e == id) {
        catagorizedData.push(element);
      }
    });
    main.innerHTML = "";
    showMovies(catagorizedData);
    //console.log(genre_ids.find(e=>{e == id}));
    //console.log(data.find(c=>{c.genre_ids.find(e=>{e==id})}));
  });
  //console.log(catagorizedData)
}
