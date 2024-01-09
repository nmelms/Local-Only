"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import mapboxgl from "mapbox-gl";
import useUserStore from "../useUserStore";
import initMap from "../lib/initMap";

const MapboxMap = () => {
  const { shopData, setShopData } = useUserStore();
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const router = useRouter();
  const convertToGeoJSON = (data) => {
    return {
      type: "FeatureCollection",
      features: data.map((shop) => ({
        type: "Feature",
        geometry: {
          type: shop.geometryType || "Point",
          coordinates: [shop.lng, shop.lat],
        },
        properties: {
          id: shop.id,
          name: shop.name,
          street: shop.street,
          city: shop.city,
          state: shop.state,
          zip: shop.zip,
        },
      })),
    };
  };

  // useEffect(() => {
  //   const handlePopupClick = (event) => {
  //     console.log(event.target);
  //     // Check if the clicked element is your link
  //     if (event.target.matches(".map-popup-link")) {
  //       event.preventDefault();
  //       console.log("prevent");
  //       const href = event.target.getAttribute("href");
  //       router.push(href);
  //     }
  //   };

  //   // Attach the event listener to the whole document
  //   document.addEventListener("click", handlePopupClick);

  //   // Clean up the event listener
  //   return () => {
  //     document.removeEventListener("click", handlePopupClick);
  //   };
  // }, [router]);

  useEffect(() => {
    if (!shopData) {
      fetch("api/shop-data", { method: "GET" })
        .then((res) => res.json())
        .then((data) => setShopData(convertToGeoJSON(data)));
    }
  }, []);

  useEffect(() => {
    if (shopData && !mapRef.current) {
      initMap(shopData, mapRef, router);
    }
  }, [shopData]);

  return <div id="map" style={{ height: "90vh" }} />;
};

export default MapboxMap;
