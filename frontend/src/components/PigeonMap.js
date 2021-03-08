/* eslint react/prop-types: 0 */
import React, { useState } from 'react'
import { Map, Marker } from 'pigeon-maps'

const PigeonMap = ({ pois }) => {
    const [center, setCenter] = useState([50.879, 4.6997])
    const [zoom, setZoom] = useState(11)

    let markerPois = pois.map((poi) => {
        return <Marker key={poi.id} anchor={[poi.coord.lat, poi.coord.lon]} />
    })

    return (
        <>
            <Map
                width={600}
                height={400}
                center={center}
                zoom={zoom}
                onBoundsChanged={({ center, zoom }) => {
                    setCenter(center)
                    setZoom(zoom)
                }}
            >
                {markerPois}
            </Map>
        </>
    )
}

export default PigeonMap
