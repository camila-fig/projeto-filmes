import { API_FULL_ROUTE, DEFAULT_LANGUAGE, options } from "./config.js";

window.addEventListener("DOMContentLoaded", () => {
  // FILMES POPULARES
  function getMovies() {
    fetch(
      `${API_FULL_ROUTE}/movie/popular?language=${DEFAULT_LANGUAGE}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.results.length > 0) {
          const main = document.getElementById("main");
          const movie_list = document.getElementById("movie_list");
          movie_list.classList.add("movie_list");

          response.results.forEach((movie, index) => {
            const movie_box = buildMovieBox(movie);
            if(movie_box) {
            movie_list.append(movie_box);
            const hr = document.createElement("hr");
            if (index < response.results.length - 1) {
              movie_list.append(hr);
            }
          }
          });
          main.append(movie_list);
        }
      })
      .catch((err) => console.error(err));
  }

  // CRIA O ELEMENTO
  function buildMovieBox(movie) {
    if (movie.title.length > 0 && movie.overview.length > 0 && movie.poster_path.length > 0) {
    const box = document.createElement("section");
    box.classList.add("movie_box");

    const description = document.createElement("div");
    description.classList.add("movie_box__description");

    const category = document.createElement("span");
    category.classList.add("movie_box__new_title");
    category.innerText = movie.title;

    const title = document.createElement("h2");
    title.classList.add("movie_box__title");
    title.innerText = movie.title;

    const resume = document.createElement("p");
    resume.classList.add("movie_box__resume");
    resume.innerText = movie.overview;

    const link = document.createElement("a");
    link.classList.add("movie_box__learn_more");
    link.setAttribute("href", `pages/movie/movie.html?id=${movie.id}`);
    link.innerText = "+DETALHES";

    const cover = document.createElement("img");
    cover.classList.add("movie_box__cover-img");
    cover.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w780/${movie.poster_path}`
    );

    description.append(category, resume, link);
    box.append(description, cover);

    return box;
    }
  }

  getMovies();
});
