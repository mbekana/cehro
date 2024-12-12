import React from "react";
import { Map, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

const IncidentMap = ({ regionsData }: { regionsData: any }) => {
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

  return (
    <Map
      style={{ height: "100px !important", width: "100%" }}
      zoom={5}
      center={[9.145, 40.4897]} 
      scrollWheelZoom={true}
    >

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <GeoJSON
        data={regionsData} 
        style={style} 
        onEachFeature={onEachRegion} 
      />
    </Map>
  );
};

export default IncidentMap;
