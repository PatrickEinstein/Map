import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

// Add traffic layer to the map
export function addTrafficLayer(map) {
  const trafficLayer = new TileLayer({
    source: new XYZ({
      url: 'https://mt1.google.com/vt/lyrs=h,traffic&x={x}&y={y}&z={z}',
    }),
    opacity: 1.0
  });

  console.log(`traffic layer added`, trafficLayer);
  map.addLayer(trafficLayer);
}


import { Fill, Stroke, Style } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';

// Create a colored overlay layer
export function addTrafficOverlay(map) {
  const trafficOverlayLayer = new VectorLayer({
    source: new VectorSource(),
    style: new Style({
      fill: new Fill({
        color: 'rgba(255, 0, 0, 1.0)' // Red background with 50% opacity
      }),
      stroke: new Stroke({
        color: 'red',
        width: 1
      })
    })
  });

  // Example feature to cover the whole map area
  const feature = new Feature(new Point([0, 0])); // Replace with actual extent of the map
  trafficOverlayLayer.getSource().addFeature(feature);

  map.addLayer(trafficOverlayLayer);
}
