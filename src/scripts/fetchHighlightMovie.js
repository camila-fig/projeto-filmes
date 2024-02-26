import { API_FULL_ROUTE, DEFAULT_LANGUAGE, options } from "./config.js";

window.addEventListener("DOMContentLoaded", () => {
  // FILMES EM DESTAQUE NA SEMANA
  function getHighlightMovie() {
    fetch(
      `${API_FULL_ROUTE}/trending/movie/week?language=${DEFAULT_LANGUAGE}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.results.length > 0) {
          const main = document.getElementById("main");
          const movie = response.results[1];
          const highlight = buildHighlightMovie(movie);
          main.append(highlight);
          main.append(document.createElement("hr"));
        }
      })
      .catch((err) => console.error(err));
  }

  function getGenres(genre_ids) {
    let category = [];
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=pt-BR",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.genres.length > 0) {
          response.genres.map(({ id, name }) => {
            if (genre_ids.includes(id)) {
              category.push(name);
            }
          });
          return category.join(",");
        }
      })
      .catch((err) => console.error(err));
  }

  // CRIA O ELEMENTO
  function buildHighlightMovie(movie) {
    const highlight_movie = document.getElementById("highlight_movie");

    const highlight_cover = document.createElement("img");
    highlight_cover.classList.add("highlight_movie__cover-img");
    highlight_cover.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`
    );

    const highlight_description = document.createElement("div");
    highlight_description.classList.add("highlight_movie__description");

    const highlight_category = document.createElement("span");
    highlight_category.classList.add("movie_box__new_title");
    highlight_category.innerText = movie.title;

    const highlight_title = document.createElement("h1");
    highlight_title.classList.add("highlight_movie__title");
    highlight_title.innerText = movie.title;

    const highlight_resume = document.createElement("p");
    highlight_resume.classList.add("highlight_movie__resume");
    highlight_resume.innerText = movie.overview;

    const highlight_link = document.createElement("a");
    highlight_link.classList.add("highlight_movie__learn_more");
    highlight_link.innerText = "SAIBA+ AQUI";
    highlight_link.setAttribute(
      "href",
      `pages/movie/movie.html?id=${movie.id}`
    );

    highlight_description.append(highlight_category, highlight_resume);
    highlight_description.append(highlight_link);
    highlight_movie.append(highlight_cover, highlight_description);
    return highlight_movie;
  }

  getHighlightMovie();
});
