import React, { useCallback, useState, useRef } from 'react'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
    Circle,
} from '@react-google-maps/api'
import mapStyles from '../mapStyles'
import OpenSpaceMarker from '../assets/001-tree.svg'
import ToiletMarker from '../assets/002-wc.svg'
import TableMarker from '../assets/003-table.svg'
import BenchMarker from '../assets/004-bench.svg'
import PlusMarker from '../assets/plus.svg'
import UserMarker from '../assets/user.svg'
import { Cancel, CheckCircle, AssignmentInd, AddBox } from '@material-ui/icons'
import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@material-ui/core'

const libraries = ['places']
const mapContainerStyle = {
    height: '55vh',
    width: '85vw',
    margin: '10px auto',
}
const center = {
    lat: 55.9533,
    lng: -3.1883,
}
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    ControlPosition: true,
}
const GMap = ({
    pois,
    handleClickMapCallback,
    clickedMapLatLng,
    handleShowAddPoiForm,
    sliderValue,
}) => {
    const { isAuthenticated } = useAuth0()

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    const mapRef = useRef()
    const onMapLoad = useCallback((map) => {
        mapRef.current = map
    }, [])

    const [selected, setSelected] = useState(null)
    const [newMarker, setNewMarker] = useState({})

    function AddNewPoiToMap() {
        if (newMarker.lat != false && isAuthenticated) {
            handleClickMapCallback(newMarker)

            return (
                <Marker
                    key={newMarker.lat}
                    icon={{
                        url: PlusMarker,
                        scaledSize: new window.google.maps.Size(30, 30),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                    }}
                    position={{ lat: newMarker.lat, lng: newMarker.lng }}
                >
                    {newMarker.lat && (
                        <InfoWindow
                            position={{
                                lat: newMarker.lat,
                                lng: newMarker.lng,
                            }}
                            onCloseClick={() => {
                                handleShowAddPoiForm(false)
                            }}
                        >
                            <>
                                <Button
                                    onClick={() => {
                                        handleShowAddPoiForm(true)
                                    }}
                                >
                                    Add Poi Here
                                </Button>
                            </>
                        </InfoWindow>
                    )}
                </Marker>
            )
        } else {
            return null
        }
    }

    const addMarker = useCallback((e) => {
        setNewMarker({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        })
        handleShowAddPoiForm(false)
    }, [])

    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng })
        mapRef.current.setZoom(14)
    })

    const AllLoadedPois = () => {
        const dynamicMarker = (poi) => {
            let icon = null
            switch (poi.type) {
                case 'bench':
                    icon = BenchMarker
                    break
                case 'table':
                    icon = TableMarker
                    break
                case 'toilet':
                    icon = ToiletMarker
                    break
                case 'space':
                    icon = OpenSpaceMarker
                    break
            }
            return icon
        }

        return pois.map((poi) => {
            return (
                <Marker
                    key={poi.id}
                    position={{ lat: poi.lat, lng: poi.lon }}
                    icon={{
                        url: dynamicMarker(poi),
                        scaledSize: new window.google.maps.Size(30, 30),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                    }}
                    onClick={() => {
                        setSelected(poi)
                    }}
                >
                    {selected && selected.id == poi.id ? (
                        <InfoWindow
                            position={{ lat: poi.lat, lng: poi.lon }}
                            onCloseClick={() => {
                                setSelected(null)
                            }}
                        >
                            <div>
                                <h2>{poi.type}</h2>
                                {'capacity' in poi && (
                                    <p>Space For: {poi.capacity}</p>
                                )}
                                <p>Accessibility: {poi.accessibility}</p>
                                {'sheltered' in poi && (
                                    <p>
                                        Sheltered?:
                                        {poi.sheltered ? (
                                            <CheckCircle />
                                        ) : (
                                            <Cancel />
                                        )}
                                    </p>
                                )}
                                <p>Privacy: {poi.privacy}</p>
                            </div>
                        </InfoWindow>
                    ) : null}
                </Marker>
            )
        })
    }

    const [locateMarkerPosition, setLocateMarkerPosition] = useState(null)

    function Locate({ panTo }) {
        return (
            <Button
                color="primary"
                variant="outlined"
                onClick={() => {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            setLocateMarkerPosition({
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            })
                            panTo({
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            })
                        },
                        () => {}
                    )
                }}
            >
                Locate Me!
            </Button>
        )
    }

    if (loadError) return 'Error loading Google Maps'
    if (!isLoaded) return 'Loading Maps'
    return (
        <div className="gMap-container">
            <Locate panTo={panTo} />
            {/*^^^ button for locate me! ^^^*/}
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={center}
                options={options}
                onLoad={onMapLoad}
                onClick={addMarker}
            >
                {locateMarkerPosition ? (
                    <Circle
                        center={locateMarkerPosition}
                        radius={sliderValue}
                        options={{
                            fillColor: '#61dafb',
                            strokeColor: '#61dafb',
                        }}
                    ></Circle>
                ) : // (<Marker
                //   icon={{
                //     url: UserMarker,
                //     scaledSize: new window.google.maps.Size(30, 30),
                //     origin: new window.google.maps.Point(0, 0),
                //     anchor: new window.google.maps.Point(15, 15)
                //   }}
                //   position={locateMarkerPosition}>
                // </Marker> )
                null}
                <AllLoadedPois />
                <AddNewPoiToMap />
            </GoogleMap>
        </div>
    )
}

GMap.propTypes = {
    pois: PropTypes.array.isRequired,
}

export default GMap
