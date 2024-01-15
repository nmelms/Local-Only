import mapboxgl from "mapbox-gl";
import toTitleCase from "./toTitleCase";
let isEventHandled = false;

const initMap = (
  shopData,
  isMapSet,
  setIsMapSet,
  router,
  setShowPopup,
  showPopup
) => {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  if (isMapSet) return;
  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [-80.812992, 35.344192],
    zoom: 9,
  });
  setIsMapSet(true);

  map.on("load", () => {
    if (!map.getSource("coffeeshops")) {
      map.addSource("coffeeshops", {
        type: "geojson",
        data: shopData,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });
    }

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
        "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
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

  //show store popup on unclusted point click
  map.on("click", "unclustered-point", (e) => {
    //unclustered click was propagating into the map so i have to set this
    isEventHandled = true;

    setShowPopup(true);
    console.log("click is working", showPopup);
    const coordinates = e.features[0].geometry.coordinates.slice();
    let features = e.features[0];

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    setTimeout(() => (isEventHandled = false), 10);
  });
  map.on("click", (e) => {
    //if user clicks an unclusted point dont propogate
    //couldnt user e.stoppropogation
    if (isEventHandled) {
      return;
    }

    setShowPopup(false);
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
  map.on("mouseenter", "unclustered-point", () => {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", "unclustered-point", () => {
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
};

export default initMap;

// const popup = new mapboxgl.Popup().setLngLat(coordinates).setHTML(
//   //this is a work around to keep the Reloads down
//   `  ${toTitleCase(e.features[0].properties.name)} <br>
//   <a href="/store/${features.properties.id}" id="popup-link" type="button">
//     Find Out More
//   </a>`
// );
//prevents default link behavior and pushes to the router
//i have to do this because Link cant be used here
// popup.on("open", () => {
//   const link = document.getElementById("popup-link");
//   if (link) {
//     link.addEventListener("click", (event) => {
//       event.preventDefault();
//       router.push(link.getAttribute("href"));
//     });
//   }
// });

// popup.addTo(map);
