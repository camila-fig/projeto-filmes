import { API_FULL_ROUTE, DEFAULT_LANGUAGE, options } from "./config.js";

// REQUISIÇÃO COM VARIÁVEIS, CONTEÚDO DINÂMICO, MENOS TRABALHO PARA MANUTENÇÃO - TODAS AS INFORMAÇÕES DE GÊNERO, RECOMENDAÇÕES, TRAILER E ONDE ASSISTIR
function getMovieData(movie_id) {
  fetch(
    `${API_FULL_ROUTE}/movie/${movie_id}?append_to_response=genre%2Crecommendations%2Cvideos%2Cwatch%2Fproviders&language=${DEFAULT_LANGUAGE}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      buildElement(response);
    })
    .catch((err) => console.error(err));
}

function buildElement(movie) {
  const main = document.getElementById("main");

  // CRIA OS ELEMENTOS
  const movie_title = document.createElement("h1");
  const movie_subtitle_trailer = document.createElement("h2");

  const movie_details = document.createElement("section");
  const movie_trailer = document.createElement("section");

  const movie_cover = document.createElement("img");
  const movie_full_description = document.createElement("div");
  const movie_description = document.createElement("p");

  const movie_category = document.createElement("p");
  const movie_length = document.createElement("p");
  const movie_release_year = document.createElement("p");
  const movie_direction = document.createElement("p");
  const movie_script = document.createElement("p");
  const movie_cast = document.createElement("p");
  const trailer = document.createElement("iframe");

  // DEFINE OS ESTILOS
  movie_title.classList.add("page_title");
  movie_subtitle_trailer.classList.add("section_title");

  movie_details.classList.add("movie_details");
  movie_trailer.classList.add("movie_section");

  movie_cover.classList.add("img_cover");
  movie_full_description.classList.add("movie_full_description");
  movie_description.classList.add("movie_description");

  movie_category.classList.add("movie_category");
  movie_category.classList.add("badge");
  movie_length.classList.add("movie_length");
  movie_release_year.classList.add("movie_release_year");
  movie_direction.classList.add("movie_direction");
  movie_script.classList.add("movie_script");
  movie_cast.classList.add("movie_cast");

  // PASSA OS VALORES
  movie_title.innerText = movie.title;
  movie_cover.setAttribute(
    "src",
    `https://image.tmdb.org/t/p/w780/${movie.poster_path}`
  );
  if (movie.genres.length > 0) {
    movie_category.innerText = `${movie.genres[0].name}`;
  }
  movie_release_year.innerText = `Ano: ${new Date().getFullYear(
    movie.release_date
  )}`;
  movie_length.innerText = `Duração: ${movie.runtime} minutos`;
  movie_description.innerText = movie.overview
    ? movie.overview
    : "SEM DESCRIÇÃO";
  movie_subtitle_trailer.innerText = "TRAILER";
  trailer.setAttribute("width", "100%");
  trailer.setAttribute("height", 500);
  trailer.setAttribute("frameborder", "0");
  trailer.setAttribute(
    "allow",
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  );
  trailer.setAttribute("width", "100%");
  trailer.setAttribute("allowfullscreen", true);
  trailer.setAttribute("title", movie.title);

  if (movie.videos.results.length > 0) {
    trailer.setAttribute(
      "src",
      `https://www.youtube.com/embed/${movie.videos.results[0].key}`
    );
  }

  // EXIBE NA TELA
  movie_details.append(movie_cover, movie_full_description);
  movie_trailer.append(movie_subtitle_trailer, trailer);

  if (movie.genres.length > 0) {
    movie_full_description.append(movie_category);
  }

  movie_full_description.append(
    movie_release_year,
    movie_length,
    movie_description
  );

  main.append(movie_title, movie_details);
  if (movie.videos.results.length > 0) {
    main.append(movie_trailer);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const movie_id = window.location.search.split("=")[1];
  getMovieData(movie_id);
});
