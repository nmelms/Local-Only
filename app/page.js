"use client";
import Image from "next/image";
import OpenStreetMap from "./components/Map";
import "bootstrap/dist/css/bootstrap.min.css";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// ... other imports

export default function Home() {
  return (
    <main>
      <OpenStreetMap />
      <FontAwesomeIcon
        className="position-btn ps-2"
        size="2x"
        icon={faCrosshairs}
      />
    </main>
  );
}
