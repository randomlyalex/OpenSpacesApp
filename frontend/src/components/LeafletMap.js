/* eslint react/prop-types: 0 */
import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "../App.css"

const LeafletMap = ({pois}) => {

  const [centerMap, setCenterMap] = useState('')


  return (
    <>

      <MapContainer center={[55.9533, -3.1883]} zoom={11} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[55.971, -3.165934]}>
    <Popup>
      example of our first poi in the DB <br /> Easily or not so easily customizable.
    </Popup>
  </Marker>
        {pois.map((poi) => {
          return <Marker
          key={poi.id} 
          position={[poi.coord.lat, poi.coord.lon]}>
            <Popup>
              <h2>{poi.type}</h2>
            </Popup>
          </Marker>
        })}
      </MapContainer>

    </>
  )
}


export default LeafletMap
