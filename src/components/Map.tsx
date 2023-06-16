'use client'

import { Icon, Map as MapType } from 'leaflet'
import { TileLayer, Marker, MapContainerProps, MapContainer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import { memo, useEffect, useRef, useState } from 'react'

type MapProps = {
  location: [number, number]
} & MapContainerProps

const Map = ({ location, ...props }: MapProps) => {
  const [center, setCenter] = useState(location)
  const mapRef = useRef<MapType>(null)

  useEffect(() => {
    console.log('render')
    setCenter(location)
    mapRef.current?.flyTo(location, 14)
  }, [location])

  return (
    <MapContainer
      center={center}
      zoom={14}
      ref={mapRef}
      zoomControl={false}
      boxZoom={false}
      tap={false}
      touchZoom={false}
      keyboard={false}
      {...props}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={center}
        draggable={false}
        icon={new Icon({ iconUrl: './icon.svg', iconSize: [24, 30] })}
      ></Marker>
    </MapContainer>
  )
}

export default memo(Map)
