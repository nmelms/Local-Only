import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import coffeeShops from "../data/data.json";

const OpenStreetMap = () => {
  const ZOOM_LEVEL = 9; // You can change this depending on how zoomed in you want the map to be initially
  const [center, setCenter] = useState({ lat: 39.5, lng: -98.35 }); // The geographical center of the contiguous United States

  const markerIcon = new L.Icon({
    iconUrl: "/map-marker.png", // Assuming you have marker-icon.png in the public folder
    iconSize: [25, 25],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  console.log(coffeeShops);
  return (
    <MapContainer
      center={center}
      zoom={ZOOM_LEVEL}
      style={{ height: "90vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png
"
      />
      {coffeeShops.map((shop, index) => (
        <Marker
          key={index}
          position={{ lat: shop.lat, lng: shop.lng }}
          icon={markerIcon}
        >
          <Popup>
            <strong>{shop.title}</strong>
            <p>{shop.description}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default OpenStreetMap;
