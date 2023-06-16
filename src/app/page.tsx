'use client'
import dynamic from 'next/dynamic'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { api } from '@/lib/axios'

import arrowIcon from '../assets/icon-arrow.svg'
import { minifyIspName } from '@/aux/minifyIspName'

const Map = dynamic(() => import('../components/Map'), {
  ssr: false
})

const API_AUTH = process.env.NEXT_PUBLIC_API_AUTH

interface Location {
  ip: string
  country: string
  city: string
  lat: number
  lng: number
  postalCode: string
  timezone: string
  isp: string
}

interface APIResponse {
  ip: string
  location: {
    country: string
    region: string
    city: string
    lat: number
    lng: number
    postalCode: string
    timezone: string
    geonameId: number
  }
  as: {
    asn: number
    name: string
    route: string
    domain: string
    type: string
  }
  isp: string
}

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null)

  const [location, setLocation] = useState<Location>({
    ip: '192.212.174.101',
    isp: 'SpaceX Starlink',
    city: 'Brooklyn',
    country: 'NY',
    timezone: 'UTC -05:00',
    lat: 40.650002,
    lng: -73.949997,
    postalCode: '10001'
  })

  async function getLocation() {
    if (inputRef.current === null) {
      return
    }

    const ip = inputRef.current.value
    const { data } = await api.get(`/country,city?apiKey=${API_AUTH}&ipAddress=${ip}`)

    const response = JSON.parse(data) as APIResponse

    setLocation({
      ip: response.ip,
      isp: minifyIspName(response.isp),
      city: response.location.city,
      country: response.location.country,
      timezone: location.timezone,
      lat: response.location.lat,
      lng: response.location.lng,
      postalCode: response.location.postalCode
    })
  }

  return (
    <div className="h-screen w-screen overflow-hidden">
      <section className="relative flex h-[40vh] w-full flex-col gap-6 bg-mobile bg-cover p-6 desktop:justify-center desktop:bg-desktop">
        <h1 className="text-center text-3xl font-medium text-white">IP Address Tracker</h1>

        <div className="group z-20 flex w-full items-center self-center overflow-hidden rounded-xl desktop:w-[500px]">
          <input
            type="text"
            className="text-md h-full w-full pl-4 font-sans outline-none desktop:text-input desktop:placeholder:text-input"
            placeholder="Search for any IP Address ou domain"
            ref={inputRef}
          />
          <button
            className="flex cursor-pointer items-center justify-center bg-black p-4 transition-colors hover:opacity-80"
            onClick={getLocation}
          >
            <Image src={arrowIcon} alt="Arrow icon" />
          </button>
        </div>

        <main className="absolute bottom-[-30%] z-20 flex w-[327px] flex-col items-center justify-center gap-4 rounded-xl bg-white p-5 px-[19%] shadow-xl tablet:bottom-[-30%] tablet:w-[94vw] desktop:left-1/2 desktop:w-[80%] desktop:-translate-x-1/2 desktop:-translate-y-[20%] desktop:flex-row desktop:justify-around desktop:gap-6 desktop:px-[0%] desktop:py-12">
          <div className="flex flex-col items-center justify-center">
            <strong className="text-sm uppercase tracking-widest text-dark-grey">Ip Address</strong>
            <span className="text-xl font-semibold text-very-dark">{location.ip}</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <strong className="text-sm uppercase tracking-widest text-dark-grey">Location</strong>
            <span className="text-xl font-semibold text-very-dark">
              {location.city}, {location.country}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <strong className="text-sm uppercase tracking-widest text-dark-grey">Timezone</strong>
            <span className="text-xl font-semibold text-very-dark">{location.timezone}</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <strong className="text-sm uppercase tracking-widest text-dark-grey">Isp</strong>
            <span className="text-center text-xl font-semibold text-very-dark">{location.isp}</span>
          </div>
        </main>
      </section>
      <Map location={[location.lat, location.lng]} className="z-10 h-full overflow-hidden" />
    </div>
  )
}
