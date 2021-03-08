/**
 *  Renders a person page. Each person is referenced by a parameter ID which matches a people key in the Redux store.
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { getPersonFromAPI } from "./actions/people";
import Sublist from "./Sublist";


function Person() {
  
  const dispatch = useDispatch();
  const {id} = useParams();
  const person = useSelector(st => st.people[id]);
  const planetState = useSelector(st => st.planets);
  const filmState = useSelector(st => st.films);
  const missing = !person;

  //If no person object was pulled from the Redux store, missing will be true and triggers a call to the API to retrieve that person
  useEffect(function() {
    if (missing) {
      dispatch(getPersonFromAPI(id));
    }
  }, [id, missing, dispatch]);

  if (missing) return "loading...";

  //used to display a link to this person's homeworld
  const hw = person.homeworld;
  const homeworld = {
    id: hw,
    url: `/planets/${hw}`,
    display: planetState[hw] ? planetState[hw].name : "Unknown"
  };

  //used to display links to films that are related to that person
  const films = person.films.map(fid => ({
    id: fid,
    url: `/films/${fid}`,
    display: filmState[fid] ? filmState[fid].name : "Unknown"
  }));

  return (
    <div>
      <h1 className="my-3">
        {person.name}
        <small className="text-muted float-right">{person.id}</small>
      </h1>

      <p><b>Gender: </b>{person.gender}</p>
      <p><b>Birth Year: </b>{person.birthYear}</p>
      <p>
        <b>Homeworld: </b>
        <Link to={homeworld.url}>{homeworld.display}</Link>
      </p>

      <Sublist title="Films" items={films} />
    </div>
  );
}

export default Person;

