const API_KEY = "api_key=6d67021662c3fe14209fe92c098382d6";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL+"/discover/movie?sort_by=popularity.desc&"+API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchUrl = BASE_URL + "/search/movie?"+API_KEY;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const titleBtn = document.getElementById("titleBtn");

 
getMovies(API_URL);

function getMovies(url){
    fetch(url).then(res=>res.json()).then(data => {
        console.log(data.results)
        showMovies(data.results)
    })
}
function showMovies(data){
    data.forEach(movie => {
        const {title, overview, poster_path, vote_average } = movie;
               
        movieEl = document.createElement("div");
        movieEl.classList.add("relative");
        movieEl.innerHTML = `
        <img src=${IMG_URL+ poster_path} alt="">
        <div class="flex justify-between">
            <h1 class="font-bold">${title}</h1>
            <h1 class="font-bold text-orange-600" >${vote_average}</h1>

        </div>

        <div class="absolute w-54 right-0 bottom-0 left-0 bg-white opacity-0 -translate-y-6 hover:opacity-90 duration-300 text-sm p-8  ">
            <h1 class="font-semibold">Overview</h1>
            <p>${overview}</p>
        </div>
        `
        main.appendChild(movieEl);
    });


}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    main.innerHTML = "";
    const searchTerm = search.value;
    console.log(searchUrl)
    if(searchTerm){
        getMovies(searchUrl + "&query=" +searchTerm);
    }

})

titleBtn.onclick=()=>{
    main.innerHTML = "";
    getMovies(API_URL)
}


