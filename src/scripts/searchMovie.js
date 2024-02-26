import { API_FULL_ROUTE, DEFAULT_LANGUAGE, options } from "./config.js";

window.addEventListener("DOMContentLoaded", () => {
  const search_movie = window.location.search.split("=")[1];

  if (search_movie) {
    const display_search_movie = document.getElementById("search_therm");
    display_search_movie.innerText = search_movie;
    searchMovie();
  }

  function searchMovie() {
    fetch(
      `${API_FULL_ROUTE}/search/movie?query=${search_movie}&include_adult=false&language=${DEFAULT_LANGUAGE}&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        const quantity = response.results.length;
        const search_therm_result = document.getElementById(
          "search_therm_result"
        );
        search_therm_result.innerText = `retornou ${quantity} resultados`;

        if (quantity > 0) {
          const movie_list = document.querySelector(".search_list_movies");
          for (let movie of response.results) {
            const movie_card = buildMovieCard(movie);
            movie_list.append(movie_card);
          }
        }
      })
      .catch((err) => console.error(err));
  }

  function buildMovieCard(movie) {
    const movie_card = document.createElement("div");
    movie_card.classList.add("movie");

    const movie_cover = document.createElement("img");
    movie_cover.classList.add("movie_cover");
    movie_cover.alt = movie.title;
    movie_cover.title = movie.title;
    movie_cover.src = `https://image.tmdb.org/t/p/w780/${movie.poster_path}`;

    const movie_link = document.createElement("a");
    movie_link.classList.add("movie_link");
    movie_link.href = `../movie/movie.html?id=${movie.id}`;
    movie_link.innerText = `${movie.title} (${new Date().getFullYear(
      movie.release_date
    )})`;

    movie_card.append(movie_cover, movie_link);

    return movie_card;
  }
});
