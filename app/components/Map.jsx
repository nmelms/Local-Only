import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import coffeeShops from "../data/data.json";
import useUserStore from "../useUserStore.jsx";

const OpenStreetMap = () => {
  const ZOOM_LEVEL = 9;
  const { lat, lng } = useUserStore();
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && lat != null && lng != null) {
      mapRef.current.flyTo([lat, lng], 15);
    }
  }, [lat, lng]);

  const markerIcon = new L.Icon({
    iconUrl: "/map-marker.png",
    iconSize: [25, 25],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const userIcon = new L.Icon({
    iconUrl: "/map-marker.png",
    iconSize: [25, 25],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <MapContainer
      center={{ lat: 39.5, lng: -98.35 }}
      zoom={ZOOM_LEVEL}
      ref={mapRef}
      className="map-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <Marker position={{ lat, lng }} icon={userIcon}></Marker>
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
