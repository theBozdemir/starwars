/**
 *  Thunk action that retrieves a film from the API and call an async dispatch with that film object
 */

import axios from 'axios';
import { LOAD_FILM } from "./types";


function getFilmFromAPI(id) {
  return async function (dispatch) {
    const res = await axios.get(`https://swapi.dev/api/films/${id}/`);
    let {
      title: name,
      director,
      opening_crawl: openingCrawl,
      characters,
      planets
    } = res.data;

    //the match method here uses a regular expression to return a string of the ID number from the URL of each character or planet which is used as the key for that object
    characters = characters.map(url => url.match(/\d+/)[0]);
    planets = planets.map(url => url.match(/\d+/)[0]);

    const film = { id, name, director, openingCrawl, characters, planets };
    dispatch(gotFilm(film));
  };
}


function gotFilm(film) {
  return { type: LOAD_FILM, payload: film };
}


export { getFilmFromAPI }