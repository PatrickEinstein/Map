import { initializeMap, addMarker } from './src/MapComponent.js';
import { addTrafficLayer, addTrafficOverlay } from './src/TrafficLayer.js';
import { searchLocation } from './src/SearchComponent.js';

// Initialize the map
const map = initializeMap();


const searchButton = document.getElementById('searchButton');

console.log(`our button`,searchButton);
searchButton.addEventListener('click', () => {
  console.log("Clicked on search")
  const query = document.getElementById('searchInput').value;
  searchLocation(map, query);
});

// Add a traffic layer to the map
addTrafficLayer(map);
addTrafficOverlay(map);
