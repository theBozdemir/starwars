/**
 *  Renders a planet page. Each planet is referenced by a parameter ID which matches a planet key in the Redux store.
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getPlanetFromAPI } from "./actions/planets";
import Sublist from "./Sublist";


function Planet() {
  const {id} = useParams();
  const planet = useSelector(st => st.planets[id]);
  const filmState = useSelector(st => st.films);
  const characterState = useSelector(st => st.people);
  const dispatch = useDispatch();
  const missing = !planet;

  //If no planet object was pulled from the Redux store, missing will be true and triggers a call to the API to retrieve that planet
  useEffect(function() {
    if (missing) {
      dispatch(getPlanetFromAPI(id));
    }
  }, [missing, id, dispatch]);

  if (missing) return "loading...";

  //used to display links to films that are related to that planet
  const films = planet.films.map(fid => ({
    id: fid,
    url: `/films/${fid}`,
    display: filmState[fid] ? filmState[fid].name : "Unknown"
  }));

  //used to display links to people that are residents of that planet
  const residents = planet.residents.map(pid => ({
    id: pid,
    url: `/people/${pid}`,
    display: characterState[pid] ? characterState[pid].name : "Unknown"
  }));

  return (
    <div>
      <h1 className="mt-3 mb-3">
        {planet.name}
        <small className="text-muted float-right">{id}</small>
      </h1>

      <p><b>Climate: </b>{planet.climate}</p>
      <p><b>Population: </b>{planet.population}</p>

      <Sublist title="People" items={residents} />
      <Sublist title="Films" items={films} />
    </div>
  );
}

export default Planet;
