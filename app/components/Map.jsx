import React, { useEffect, useState } from "react";
import Link from "next/link";
import mapboxgl from "mapbox-gl";

const MapboxMap = () => {
  const [shopData, setShopData] = useState(null);
  const convertToGeoJSON = (data) => {
    console.log(data, "this is the id data");
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

  useEffect(() => {
    fetch("api/shop-data", { method: "GET" })
      .then((res) => res.json())
      .then((data) => setShopData(convertToGeoJSON(data)));
  }, []);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.5, 40],
      zoom: 9,
    });

    map.on("load", () => {
      map.addSource("coffeeshops", {
        type: "geojson",
        data: shopData,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "coffeeshops",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#51bbd6",
            100,
            "#f1f075",
            750,
            "#f28cb1",
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            20,
            100,
            30,
            750,
            40,
          ],
        },
      });

      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "coffeeshops",
        filter: ["has", "point_count"],
        layout: {
          "text-field": ["get", "point_count_abbreviated"],
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
      });

      map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "coffeeshops",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#11b4da",
          "circle-radius": 8,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
      });
    });

    map.on("click", "unclustered-point", (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice();

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(
          `${e.features[0].properties.name} <br>
          <a href="/${e.features[0].properties.id}">Read More</a>`
        )
        .addTo(map);
    });

    map.on("click", "clusters", (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["clusters"],
      });
      const clusterId = features[0].properties.cluster_id;
      map
        .getSource("coffeeshops")
        .getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;

          map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom,
          });
        });
    });

    map.on("mouseenter", "clusters", () => {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", "clusters", () => {
      map.getCanvas().style.cursor = "";
    });
    // Add geolocate control to the map.
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );
  }, [shopData]);

  return <div id="map" style={{ height: "90vh" }} />;
};

export default MapboxMap;
