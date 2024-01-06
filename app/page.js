"use client";
import Image from "next/image";
import MapboxMap from "./components/Map";
import "bootstrap/dist/css/bootstrap.min.css";
import "mapbox-gl/dist/mapbox-gl.css";

import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUserStore from "./useUserStore";
import { useEffect } from "react";

export default function Home() {
  // const { lat, lng, setLocation, spinning, setSpinning } = useUserStore();

  // const handlePositionClick = () => {
  //   setSpinning(true);
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       setLocation(position.coords.latitude, position.coords.longitude);
  //     });
  //   } else {
  //     document.getElementById("location").innerHTML =
  //       "Geolocation is not supported by this browser.";
  //   }
  // };

  // useEffect(() => {
  //   setSpinning(false);
  // }, [lat, lng]);
  console.log("rnder");
  return (
    <main>
      <MapboxMap />
      {/* <FontAwesomeIcon
        onClick={() => handlePositionClick()}
        className={`position-btn ${spinning ? "spin" : ""}`}
        size="2x"
        icon={faCrosshairs}
      /> */}
    </main>
  );
}
