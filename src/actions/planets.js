/**
 *  Thunk action that retrieves a planet from the API and call an async dispatch with that planet object
 */

import axios from "axios";
import { LOAD_PLANET } from "./types";


function getPlanetFromAPI(id) {
  return async function (dispatch) {
    const res = await axios.get(`https://swapi.dev/api/planets/${id}/`);
    let {
      name,
      population,
      climate,
      residents,
      films
    } = res.data;

    //the match method here uses a regular expression to return a string of the ID number from the URL of each character or film which is used as the key for that object
    residents = residents.map(url => url.match(/\d+/)[0]);
    films = films.map(url => url.match(/\d+/)[0]);

    const planet = { id, name, population, climate, residents, films };
    dispatch(gotPlanet(planet));
  };
}


function gotPlanet(planet) {
  return { type: LOAD_PLANET, payload: planet };
}


export { getPlanetFromAPI }