import React, { useState, } from 'react'
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
import { SettingsInputAntennaTwoTone } from '@material-ui/icons'
import PoiSubmitForm from './PoiSubmitForm'
import Request from '../helpers/request'

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

function AddMarker({getLl}) {

    
    const [marker, setMarker] = useState(null)
    const map = useMapEvents({
        click(e) {
            const newMarker = e.latlng
            setMarker(newMarker)
        },
    })
    if(marker != null){
        getLl(marker.lat, marker.lng)
    }else{
        console.log("waiting for marker click")
    }
    return marker === null ? null : (
        <Marker position={marker}>
            <Popup>{marker.lat}, {marker.lng}</Popup>
        </Marker>
    )
}
//toggle add for = flase function to set toggleaddForm = !toggleAddForm 
const LeafletMap = ({ pois }) => {

    const [centreMap, setCentreMap] = useState([55.9533, -3.1883])

    const [latForForm, setLatForForm] = useState();
    const [lonForForm, setlonForForm] = useState();

    const getLatLngForForm = (lat, lng) => {
        setLatForForm(lat)
        setlonForForm(lng)
    }
    
    const serverUrl = process.env.REACT_APP_API_SERVER
    const addPoi = (submittedPoi) => {
        const request = new Request()
        let endPoint = null
        switch (submittedPoi.type) {
            case 'bench':
                endPoint = 'benches'
                break
            case 'table':
                endPoint = 'tables'
                break
            case 'toilet':
                endPoint = 'toilets'
                break
            case 'space':
                endPoint = 'spaces'
                break
        }
        if (endPoint != null) {
            request.post(`${serverUrl}/api/${endPoint}`, submittedPoi)
        }
        console.log(endPoint)
        console.log(submittedPoi)
    }

    return (
        <>
            <Typography variant="sub">
                Double Click on the map to find your location
            </Typography>

            <PoiSubmitForm
            onPoiSubmit={(poi) => {
                addPoi(poi)
            }}
            lat={latForForm}
            lon={lonForForm}/>

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

                        if(poi.type === ("bench" || "table")){

                            return (
                                <Marker key={poi.id} position={[poi.lat, poi.lon]}>
                                <Popup>
                                    <h2>{poi.type}</h2>
                                    <p>Space For: {poi.capacity}</p>
                                    <p>Accessibility: {poi.accessibility}</p>
                                    <p>Privacy: {poi.privacy}</p>
                                    <p>Is Sheltered?: {poi.sheltered.toString()}</p>
                                </Popup>
                            </Marker>
                        )
                    }else{
                        return (
                            <Marker key={poi.id} position={[poi.lat, poi.lon]}>
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
                <UserLocationMarker />
                <AddMarker getLl={getLatLngForForm}/>
               
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
