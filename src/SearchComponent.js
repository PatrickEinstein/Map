import { addMarker } from "./MapComponent.js";
import { fromLonLat } from "ol/proj";

export function searchLocation(map, query) {
  fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        // const { lat, lon } = data[0];
        data.forEach(({ lat, lon }) => {
          const coords = [parseFloat(lon), parseFloat(lat)];
          map.getView().setCenter(fromLonLat(coords));
          map.getView().setZoom(5);
          console.log(data);
          // Add marker to the search result location
          addMarker(map, coords);
        });
      } else {
        alert("Location not found.");
      }
    })
    .catch((error) => console.error("Error searching location:", error));
}
