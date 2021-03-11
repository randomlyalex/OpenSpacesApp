import React, { useState, useRef } from 'react'
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
} from 'react-leaflet'
import '../App.css'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        dblclick() {
            map.locate()
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })
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

    const AllLoadedPois = () => {
        return pois.map((poi) => {
            if(poi.type === ("bench" || "table")){

                return (
                    <Marker key={poi.id} position={[poi.lat, poi.lon]}>
                    <Popup>
                        <h2>{poi.type}</h2>
                        <p>Space For: {poi.capacity}</p>
                        <p>Accessibility: {poi.accessibility}</p>
                        <p>Sheltered?: {poi.sheltered.toString()}</p>
                        <p>Privacy: {poi.privacy}</p>
                    </Popup>
                </Marker>
            )
        }return (
            <Marker key={poi.id} position={[poi.lat, poi.lon]}>
                    <Popup>
                        <h2>{poi.type}</h2>
                        <p>Accessibility: {poi.accessibility}</p>
                        <p>Privacy: {poi.privacy}</p>
                    </Popup>
                </Marker>
        )

        })
    }

    return (
        <>
            <Typography variant="subtitle1">
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
                <AllLoadedPois />
                <LocationMarker />
                <AddMarker />
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
