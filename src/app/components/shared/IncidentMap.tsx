import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import "leaflet-boundary-canvas";
import { GeoJSON } from 'react-leaflet';

// Dynamically import MapContainer to avoid SSR issues with Leaflet
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });

// Define the position and map style types
const position: [number, number] = [9.1450, 40.4897];
const mapStyle: React.CSSProperties = { height: '700px' };

const IncidentMap: React.FC<any> = ({ regionsData }) => {
  const [map, setMap] = useState<L.Map | null>(null);
  const getColor = (incidents: number) => {
    if (incidents >= 1000000) return "#741f1f";  
    if (incidents >= 500000) return "#9c2929";  
    if (incidents >= 200000) return "#c57f7f"; 
    if (incidents >= 50000) return "#d8aaaa";   
    return "#ebd4d4";                         
  };

  const style = (feature: any) => {
    return {
      fillColor: getColor(feature.properties.incidents), 
      weight: 1,
      opacity: 1,
      color: "black",
      fillOpacity: 0.7,
    };
  };

  const onEachRegion = (region: any, layer: any) => {
    const { ADMIN, incidents } = region.properties; 
    layer.bindPopup(`<strong>${ADMIN}</strong><br>Incidents: ${incidents}`);
  };

  useEffect(() => {
    if (!map) return;

    const fetchGeoJSON = async () => {
      const response = await fetch(
        'https://cdn.rawgit.com/johan/world.geo.json/34c96bba/countries/ETH.geo.json'
      );
      const geoJSON = await response.json();
      const osm = L.TileLayer.boundaryCanvas(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          boundary: geoJSON,
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, UK shape <a href="https://github.com/johan/world.geo.json">johan/word.geo.json</a>'
        }
      );
      map.addLayer(osm);
      const ukLayer = L.geoJSON(geoJSON);
      map.fitBounds(ukLayer.getBounds());
    };

    fetchGeoJSON();
  }, [map]);

  return (
    <MapContainer
      center={position}
      zoom={18}
      style={mapStyle}
      whenCreated={setMap}
    >
        <GeoJSON
        data={regionsData} 
        style={style} 
        onEachFeature={onEachRegion} 
      />
      </MapContainer>
  );
};

export default IncidentMap;
