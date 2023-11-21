import React, { useState } from 'react';
import { MapContainer, TileLayer, Popup, Marker, useMapEvents } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import LocationMarker from './LocationMarker'
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';


const customIcon = new Icon({
  iconUrl: 'https://cdn.iconscout.com/icon/free/png-512/free-map-968-448084.png?f=avif&w=512',
  iconSize: [30, 40],
});

function Map() {
  var [position,setPosition] = useState([51.505, -0.09]);
  
  const handleMapClick = (e) => {
    setPosition([e.latlng.lat,e.latlng.lng]);
  };
  
  return (
      <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          <LocationMarker />
          <MapClickHandler handleClick={handleMapClick} position={position}/>
        </MarkerClusterGroup>
      </MapContainer>
  );
}

const MapClickHandler = ({ handleClick,position }) => {
  const map = useMapEvents({
    click: (e) => {
      handleClick(e);
    },
  });
  return( <Marker position={position} icon={customIcon} >
    <Popup>
          <input/>
        </Popup>
</Marker>);
};

export default Map;