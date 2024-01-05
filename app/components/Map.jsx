import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import coffeeShops from "../data/data.json";

const OpenStreetMap = () => {
  const ZOOM_LEVEL = 9;
  const [mapPosition, setMapPostion] = useState({ lat: 39.5, lng: -98.35 });

  const markerIcon = new L.Icon({
    iconUrl: "/map-marker.png",
    iconSize: [25, 25],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <MapContainer
      center={mapPosition}
      zoom={ZOOM_LEVEL}
      className="map-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
