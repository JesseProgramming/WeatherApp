import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../api";
const cords = [0,0];
function GetLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      console.log(cords);
    } 
    else { 
      console.log("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
  cords[0] = position.coords.latitude;
  cords[1] = position.coords.longitude;
}
export default GetLocation;


/*
const GetLocation = ({ onSearchChange }) => {
    const loadOptions = (inputValue) => {
      return {
        value: `${GetLocation2()}`
      }
    }
    //46.9860352 -122.765312
    return (
        <button onClick={loadOptions} value="46.9860352 -122.765312">Use current Location</button>
    );
}

function GetLocation2() {
  if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      console.log("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
  console.log(position.coords.latitude, position.coords.longitude);
  const myPosition = position.coords.latitude;
}

export default GetLocation;

*/