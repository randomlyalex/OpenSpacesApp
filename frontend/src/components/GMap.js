import React, { useCallback, useState } from 'react'
import {
  GoogleMap, useLoadScript,
  Marker, InfoWindow
} from '@react-google-maps/api';
import mapStyles from '../mapStyles';
import OpenSpaceMarker from '../assets/001-tree.svg';
import ToiletMarker from '../assets/002-wc.svg';
import TableMarker from '../assets/003-table.svg';
import BenchMarker from '../assets/004-bench.svg';
import { Cancel, CheckCircle } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@material-ui/core';




const libraries = ["places"];
const mapContainerStyle = {
  height: '55vh',
  width: '85vw',
  margin: '10px auto'
}
const center = {
  lat: 55.9533,
  lng: -3.1883,
}
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,

}
const GMap = ({ pois, handleClickMapCallback, clickedMapLatLng, handleShowAddPoiForm }) => {

  const { isAuthenticated } = useAuth0();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });

  const [selected, setSelected] = useState(null);
  const [newMarker, setNewMarker] = useState({});
  

  

  function AddNewPoiToMap(){

    if(newMarker.lat != false && isAuthenticated){

    handleClickMapCallback(newMarker)
    
    return <Marker
      key={newMarker.lat}
      position={{lat: newMarker.lat, lng: newMarker.lng}}
      >
        {newMarker.lat && 
        <InfoWindow
              position={{lat: newMarker.lat, lng: newMarker.lng}}
              onCloseClick={() => {handleShowAddPoiForm(false)}}>
                <>
                <Button onClick={() => {handleShowAddPoiForm(true)}}>Add Poi Here</Button>
                </>
        </InfoWindow>}
      </Marker>} else {
        return null
      }
        
      
  }


  const addMarker = useCallback((e) => {
    setNewMarker({
      lat:e.latLng.lat(),
      lng:e.latLng.lng()
    })
    handleShowAddPoiForm(false)
  }, [])

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
      if (poi.type === 'bench' || poi.type === 'table') {
        return (
          <Marker
            key={poi.id}
            position={{ lat: poi.lat, lng: poi.lon }}
            icon={{
              url: dynamicMarker(poi),
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15)
            }}
            onClick={() => {
              setSelected(poi)
            }}
          >
            {selected && (selected.id == poi.id) ? (
              <InfoWindow
                position={{ lat: poi.lat, lng: poi.lon }}
                onCloseClick={() => {
                  setSelected(null)
                }}
              >
                <div>

                  <h2>{poi.type}</h2>
                  <p>Space For: {poi.capacity}</p>
                  <p>Accessibility: {poi.accessibility}</p>
                  <p>
                    Sheltered?:{' '}
                    {poi.sheltered ? <CheckCircle /> : <Cancel />}
                  </p>
                  <p>Privacy: {poi.privacy}</p>
                  
                </div>
              </InfoWindow>) : null}
          </Marker>
        )
      } else {
        return (
          <Marker
            key={poi.id}
            position={{ lat: poi.lat, lng: poi.lon }}
            icon={{
              url: dynamicMarker(poi),
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15)
            }}
            onClick={() => {
              setSelected(poi)
            }}
          >
            {selected && (selected.id == poi.id) ?
              (<InfoWindow
                position={{ lat: poi.lat, lng: poi.lon }}
                onCloseClick={() => {
                  setSelected(null)
                }}
              >
                <div>
                  <h2>{poi.type}</h2>
                  <p>Accessibility: {poi.accessibility}</p>
                  <p>Privacy: {poi.privacy}</p>
                </div>
              </InfoWindow>) : null}
          </Marker>
        )
      }
    })
  }


  if (loadError) return "Error loading Google Maps"
  if (!isLoaded) return "Loading Maps"
  return (
    <div className='gMap-container'>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onClick={addMarker}>
          
        <AllLoadedPois />
        <AddNewPoiToMap/>
      </GoogleMap>
    </div>
  )
}

GMap.propTypes = {
  pois: PropTypes.array.isRequired,
}

export default GMap
