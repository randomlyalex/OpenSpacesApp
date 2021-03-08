import React, { useState } from 'react'
import { Map, Marker } from 'pigeon-maps'

export function PigeonMap() {
    const [center, setCenter] = useState([50.879, 4.6997])
    const [zoom, setZoom] = useState(11)
    return (
        <Map
            width={600}
            height={400}
            defaultCenter={[50.879, 4.6997]}
            defaultZoom={12}
        >
            <Marker
                anchor={[50.874, 4.6947]}
                color="black"
                payload={1}
                onClick={({ event, anchor, payload }) => {
                    console.log('Clicked marker nr: ', payload)
                }}
            />
        </Map>
    )
}
