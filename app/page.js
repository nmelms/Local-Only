"use client";
import Image from "next/image";
import styles from "./page.module.css";
import OpenStreetMap from "./components/Map";
import "bootstrap/dist/css/bootstrap.min.css";
// ... other imports

export default function Home() {
  return (
    <main className={styles.main}>
      <OpenStreetMap />
    </main>
  );
}
