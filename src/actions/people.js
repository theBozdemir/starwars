/**
 *  Thunk action that retrieves a person from the API and call an async dispatch with that person object
 */

import axios from "axios";
import { LOAD_PERSON } from "./types";


function getPersonFromAPI(id) {
  return async function (dispatch) {
    const res = await axios.get(`https://swapi.dev/api/people/${id}/`);
    let {
      name,
      gender,
      birth_year: birthYear,
      homeworld,
      films
    } = res.data;

    //the match method here uses a regular expression to return a string of the ID number from the URL of each film or planet which is used as the key for that object
    films = films.map(url => url.match(/\d+/)[0]);
    homeworld = homeworld.match(/\d+/)[0];

    const person = { id, name, gender, birthYear, homeworld, films };
    dispatch(gotPerson(person));
  };
}


function gotPerson(person) {
  return { type: LOAD_PERSON, payload: person };
}


export { getPersonFromAPI }