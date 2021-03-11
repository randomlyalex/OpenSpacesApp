import React, { useState } from 'react'
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
    LayerGroup,
    Circle,
} from 'react-leaflet'
import '../App.css'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { useAuth0 } from '@auth0/auth0-react'
import { Icon } from 'leaflet'
import OpenSpaceMarker from '../001-tree.svg'
import ToiletMarker from '../002-wc.svg'
import TableMarker from '../003-table.svg'
import BenchMarker from '../004-bench.svg'
import NewPoiMarker from '../global.svg'
import { Cancel, CheckCircle } from '@material-ui/icons'

const LeafletMap = ({ pois, sliderValue }) => {
    const { isAuthenticated } = useAuth0()
    const [centreMap, setCentreMap] = useState([55.9533, -3.1883])

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
            <LayerGroup>
                <Circle
                    center={position}
                    pathOptions={{ color: 'blue', fillColor: 'blue' }}
                    radius={sliderValue * 100}
                />
            </LayerGroup>
        )
    }

    function AddMarker() {
        const newPoiMarker = new Icon({
            iconUrl: NewPoiMarker,
            iconSize: [30, 30],
        })

        const [marker, setMarker] = useState(null)
        const map = useMapEvents({
            click(e) {
                const newMarker = e.latlng
                setMarker(newMarker)
            },
        })

        return marker === null ? null : isAuthenticated ? (
            <Marker position={marker} icon={newPoiMarker}>
                <Popup>Add a POI Here</Popup>
            </Marker>
        ) : null
    }

    const toiletMarker = new Icon({
        iconUrl: ToiletMarker,
        iconSize: [30, 30],
    })
    const benchMarker = new Icon({
        iconUrl: BenchMarker,
        iconSize: [30, 30],
    })
    const tableMarker = new Icon({
        iconUrl: TableMarker,
        iconSize: [30, 30],
    })
    const openSpaceMarker = new Icon({
        iconUrl: OpenSpaceMarker,
        iconSize: [30, 30],
    })

    const AllLoadedPois = () => {
        const dynamicMarker = (poi) => {
            let icon = null
            switch (poi.type) {
                case 'bench':
                    icon = benchMarker
                    break
                case 'table':
                    icon = tableMarker
                    break
                case 'toilet':
                    icon = toiletMarker
                    break
                case 'space':
                    icon = openSpaceMarker
                    break
            }
            return icon
        }

        return pois.map((poi) => {
            if (poi.type === 'bench' || poi.type === 'table') {
                return (
                    <Marker
                        key={poi.id}
                        position={[poi.lat, poi.lon]}
                        icon={dynamicMarker(poi)}
                    >
                        <Popup>
                            <h2>{poi.type}</h2>
                            <p>Space For: {poi.capacity}</p>
                            <p>Accessibility: {poi.accessibility}</p>
                            <p>
                                Sheltered?:{' '}
                                {poi.sheltered ? <CheckCircle /> : <Cancel />}
                            </p>
                            <p>Privacy: {poi.privacy}</p>
                        </Popup>
                    </Marker>
                )
            } else {
                return (
                    <Marker
                        key={poi.id}
                        position={[poi.lat, poi.lon]}
                        icon={dynamicMarker(poi)}
                    >
                        <Popup>
                            <h2>{poi.type}</h2>
                            <p>Accessibility: {poi.accessibility}</p>
                            <p>Privacy: {poi.privacy}</p>
                        </Popup>
                    </Marker>
                )
            }
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
