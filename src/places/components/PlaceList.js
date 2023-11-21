import React from "react";
import PlaceItem from "./PlaceItem";
import "./PlaceList.css";
import { Link } from "react-router-dom";

function PlaceList(props) {
  return (
    <>
      {props.places.length === 0 && (
        <div className="no__places" >          
          <h2>No places found</h2>
          <Link to="/places/new"><div>add a new place</div></Link>
          </div>
      )}
      {props.places && (
        <ul>
          {props.places.map((place) => (
            <PlaceItem
              key={place.id}
              id={place.id}
              url={place.url}
              title={place.title}
              description={place.description}
              address={place.address}
              creatorId={place.creatorId}
              coordinates={place.location}
              onDelete={props.onDelete}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default PlaceList;
