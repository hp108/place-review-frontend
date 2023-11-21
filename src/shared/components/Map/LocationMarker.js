import { useMapEvents } from "react-leaflet"
import { Marker } from "react-leaflet"
import { Popup } from "react-leaflet"
import { useState } from "react"
import { Icon } from "leaflet"

const customIcon = new Icon({
  iconUrl: 'https://cdn.iconscout.com/icon/free/png-512/free-map-968-448084.png?f=avif&w=512',
  iconSize: [30, 40]
});


export let map = null;


let b= false;

function LocationMarker(props) {  
    const [position, setPosition] = useState(null);
    // console.log('rendering')
    
     map = useMapEvents({
        locationfound(e) {
            if(!b)
            {
                setPosition(e.latlng)
                map.flyTo(e.latlng, map.getZoom(13))
                b=(true);
            }
        }
    })
    if(!b)
    {
        map.locate();
    }
    return position === null ? null : (
        <>
            <Marker position={position} icon={customIcon}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </>
    )
}

export default LocationMarker;

