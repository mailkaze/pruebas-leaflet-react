import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { data } from '../data'
import LocationMarker from './LocationMarker'

export default function Map() {
  
  const [position, setPosition] = useState({
    lat: 0,
    lng: 0,
  })

  async function getPosition() {
    await navigator.geolocation.getCurrentPosition(
      function (position) {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      function (error) {
        console.log(error)
      }, 
      { enableHighAccuracy: true }
    )
  }

  function SetCenter() {
    const map = useMap()
    map.panTo(position)
    return null
  }

  useEffect(() => {
    console.log(position)
    
  }, [position])

  useEffect(() => {
    getPosition()
  }, [])

  return (
    <MapContainer 
      style={{height: "500px"}} 
      center={position} 
      zoom={13} 
    >
      <TileLayer
        attribution='&copy; <a href="&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
      />
      {data.map( d => (
        <LocationMarker 
          position={d.location} 
          countryregion={d.countryregion}
          confirmed={d.confirmed} />
      ))}
      <SetCenter />
    </MapContainer>
  )
}
