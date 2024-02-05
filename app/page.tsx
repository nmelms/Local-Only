"use client";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import "mapbox-gl/dist/mapbox-gl.css";
import ShopOffcanvas from "./components/ShopOffcanvas";
import mapboxgl from "mapbox-gl";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    mapboxgl.accessToken = process.env
      .NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;
    let map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-80.812992, 35.344192],
      zoom: 9,
    });
  }, []);
  return (
    <main>
      <div id="map"></div>
      <ShopOffcanvas />
    </main>
  );
}
