import "../style.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";
import { fromLonLat } from "ol/proj";
import coordinates from "../data";

// Initialize the map
export function initializeMap() {
  const map = new Map({
    target: "map",
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: [0, 0], // Initial center of the map [longitude, latitude]
      zoom: 2,
    }),
  });

  // Create a vector source and vector layer
  const vectorSource = new VectorSource();
  // Loop through the coordinates and add markers
  coordinates.forEach((coord) => {
    const marker = new Feature({
      geometry: new Point(fromLonLat([coord.longitude, coord.latitude])), // Convert to map projection
      name: coord.name,
    });

    // Customize the marker's style (optional)
    marker.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: "https://openlayers.org/en/latest/examples/data/icon.png", // Example marker icon
        }),
      })
    );

    // Add the marker to the vector source
    vectorSource.addFeature(marker);
  });

  // Create and add the vector layer to the map
  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });
  map.addLayer(vectorLayer);

  // Get the user's current location, center the map, and add a location marker
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoordinates = [
          position.coords.longitude,
          position.coords.latitude,
        ];

        // Center the map on the user's location
        map.getView().setCenter(fromLonLat(userCoordinates));
        map.getView().setZoom(12); // Set the desired zoom level when the map centers on the user

        // Create a marker for the user's location
        const userMarker = new Feature({
          geometry: new Point(fromLonLat(userCoordinates)), // Convert to map projection
        });

        // Customize the user's location marker (optional)
        userMarker.setStyle(
          new Style({
            image: new Icon({
              anchor: [0.5, 1],
              src: "https://openlayers.org/en/latest/examples/data/icon.png", // Example marker icon
              color: "#FF0000", // Change the color to distinguish the user's location
            }),
          })
        );

        // Add the user's location marker to the vector source
        vectorSource.addFeature(userMarker);
      },
      (error) => {
        console.error("Error getting location: ", error);
      }
    );
  } else {
    console.error("Geolocation not supported by this browser.");
  }

  return map;
}

export function addMarker(map, coordinates, isUser = false) {
  const vectorSource = new VectorSource();
  const marker = new Feature({
    geometry: new Point(fromLonLat(coordinates)),
  });

  // Style marker based on if it's the user location
  marker.setStyle(
    new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: isUser
          ? "https://openlayers.org/en/latest/examples/data/icon.png"
          : "https://openlayers.org/en/latest/examples/data/dot.png",
        color: isUser ? "#FF0000" : "#0000FF",
      }),
    })
  );

  vectorSource.addFeature(marker);

  const markerLayer = new VectorLayer({
    source: vectorSource,
  });

  map.addLayer(markerLayer);
}
