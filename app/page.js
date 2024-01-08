"use client";
import Image from "next/image";
import MapboxMap from "./components/Map";
import "bootstrap/dist/css/bootstrap.min.css";
import "mapbox-gl/dist/mapbox-gl.css";
import ShopOffcanvas from "./components/ShopOffcanvas";

import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUserStore from "./useUserStore";
import { useEffect } from "react";

export default function Home() {
  return (
    <main>
      <MapboxMap />
      <ShopOffcanvas />

      {/* <FontAwesomeIcon
        onClick={() => handlePositionClick()}
        className={`position-btn ${spinning ? "spin" : ""}`}
        size="2x"
        icon={faCrosshairs}
      /> */}
    </main>
  );
}
