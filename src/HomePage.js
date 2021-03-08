/**
 *  Loads the home page for the application and shows the button to reset the whole app.
 */

 import React from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { resetAll } from "./actions/reset";


function HomePage() {
  const loaded = useSelector(st => st.films[1] !== undefined);  //loaded is a piece of state that checks if the first movie has been loaded into the store
  const dispatch = useDispatch();

  //this reset function clears the Redux store and localStorage, effectively resetting the app the its initial state
  function reset() {
    dispatch(resetAll());
  }
  
  //this conditional render either shows a link to reset the app or begin a visitor's journey linking to the first movie
  return (
    <>
      {loaded ? (
        <button
          className="btn btn-danger btn-block btn-lg"
          onClick={reset}
        >
          Reset To Fresh Exploration
        </button>
      ) : (
        <Link to="/films/1" className="btn btn-primary btn-block btn-lg">
          Start with &ldquo;A New Hope&rdquo;
        </Link>
      )}
      <img
        className="mt-3 mb-5 w-100"
        alt="StarWars.ly"
        src="https://vignette.wikia.nocookie.net/starwars/images/c/cc/Star-wars-logo-new-tall.jpg"
      />
    </>
  );
}

export default HomePage;
