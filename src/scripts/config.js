const API_ROUTE = "https://api.themoviedb.org";

// VERSÃO ATUAL ESTÁVEL DA API
const API_VERSION = "/3";

// CONCATENAÇÃO DO LINK DA API COM A VERSÃO ESTÁVEL
export const API_FULL_ROUTE = API_ROUTE + API_VERSION;

// CHAVE NECESSÁRIA PARA FAZER A REQUISIÇÃO (FETCH, REQUEST, RESPONSE)
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDUxNzRkMzcwMGM1YWFiZjIzNWQ2ZDhjZWY1MTQwMyIsInN1YiI6IjY1ODJkMjUyYjM0NDA5NDZlMDFhZWJjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3dqemApaRhZuCyX64_RySFq0XePhbyiTtx3RNUVhu08";

// IDIOMA PADRÃO DOS DADOS RETORNADOS PELA API
export const DEFAULT_LANGUAGE = "pt-BR";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
