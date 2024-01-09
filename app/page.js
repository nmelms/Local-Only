"use client";
import Image from "next/image";
import { useRef, useEffect } from "react";
import MapboxMap from "./components/Map";
import "bootstrap/dist/css/bootstrap.min.css";
import "mapbox-gl/dist/mapbox-gl.css";
import ShopOffcanvas from "./components/ShopOffcanvas";

export default function Home() {
  return (
    <main>
      <MapboxMap />
      <ShopOffcanvas />
    </main>
  );
}
