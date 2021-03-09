import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
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


const LeafletMap = ({ pois }) => {
    const [centreMap, setCentreMap] = useState([55.9533, -3.1883])
    
    return (
        <>
        <h3>Double Click on the map to find your location</h3>
            <MapContainer center={centreMap} 
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
                            <Marker
                                key={poi.id}
                                position={[poi.coord.lat, poi.coord.lon]}
                            >
                                <Popup>
                                    <h2>{poi.type}</h2>
                                    <p>Space For: {poi.capacity}</p>
                                    <p>Accessibility: {poi.accessibility}</p>
                                    <p>Privacy: {poi.privacy}</p>
                                    <p>Is Sheltered? :{poi.sheltered.toString()}</p>
                                </Popup>
                            </Marker>
                        )
                    })
                }
                <LocationMarker/>
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
