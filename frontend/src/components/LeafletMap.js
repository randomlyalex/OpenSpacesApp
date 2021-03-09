import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import '../App.css'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'


function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
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
            <Button
                variant="contained"
                color="secondary"
                
            >
                <Typography color="initial">Locate Me</Typography>
            </Button>
            <MapContainer center={centreMap} 
            zoom={15} 
            scrollWheelZoom={true}
            
            >
              
                <Typography color="initial">Locate Me</Typography>
          
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
