import React, { useState, useRef, useEffect } from 'react'
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
    Circle
} from 'react-leaflet'
import '../App.css'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { SettingsInputAntennaTwoTone } from '@material-ui/icons'

function UserLocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents(
        {dblclick() 
            {map.locate()}
            ,locationfound(e) 
            {setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom())},})

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

function AddMarker() {
    const [marker, setMarker] = useState(null)
    const map = useMapEvents({
        click(e) {
            const newMarker = e.latlng
            setMarker(newMarker)
        },
    })
    return marker === null ? null : (
        <Marker position={marker}>
            <Popup>You are here</Popup>
        </Marker>
    )
}










const LeafletMap = ({ pois }) => {


    const [centreMap, setCentreMap] = useState([55.9533, -3.1883])
  

    return (
        <>
            <Typography variant="sub">
                Double Click on the map to find your location
            </Typography>
            <MapContainer
                center={centreMap}
                zoom={15}
                scrollWheelZoom={true}
                doubleClickZoom={false}
                
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    // why can't this is a map function up top?
                    pois.map((poi) => {
                        return (
                            <Marker key={poi.id} position={[poi.lat, poi.lon]}>
                                <Popup>
                                    <h2>{poi.type}</h2>
                                    <p>Space For: {poi.capacity}</p>
                                    <p>Accessibility: {poi.accessibility}</p>
                                    <p>Privacy: {poi.privacy}</p>
                                    <p>
                                        Is Sheltered? :
                                        {poi.sheltered.toString()}
                                    </p>
                                </Popup>
                            </Marker>
                        )
                    })
                }
                <UserLocationMarker />
                <MyComponent/>
                {/* <AddMarkerToClick/> */}
            </MapContainer>
        </>
    )
}
// see: https://reactjs.org/docs/typechecking-with-proptypes.html
// & https://www.npmjs.com/package/prop-types
LeafletMap.propTypes = {
    pois: PropTypes.array.isRequired,
}

export default LeafletMap
