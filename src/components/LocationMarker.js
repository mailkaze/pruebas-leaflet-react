import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import { LocationIcon } from './LocationIcon'

export default function LocationMarker({position, countryregion, confirmed}) {
  return (
    <Marker position={position} icon={LocationIcon}>
      <Popup>
        {`${countryregion}: Casos confirmados: ${confirmed}`}
      </Popup>
    </Marker>
  )
}
