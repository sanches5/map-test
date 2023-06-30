import { FC, useRef } from "react"
import { Map as MapYandex, ZoomControl, Placemark } from "@pbe/react-yandex-maps"
import { MapEvent } from "yandex-maps"
import Markers from "./Markers"

type MapProps = {
  isSideBarOpen: boolean
  newCoords: [number, number] | []
  setNewCoords: (arg: []) => void
  setIsLoading: (arg: boolean) => void
}

const defaultMapState = {
  center: [47.2313, 39.7233],
  zoom: 5,
}

const optionMarker = {
  iconImageSize: [10, 10],
  preset: "islands#greenIcon",
}

export const Map: FC<MapProps> = (props) => {
  const { setIsLoading, newCoords, setNewCoords, isSideBarOpen } = props
  const mapRef = useRef()

  const handleMapClick = (event: MapEvent) => {
    if (!isSideBarOpen) {
      return
    }

    const coords = event.get("coords")
    setNewCoords(coords)
  }

  return (
    <MapYandex
      instanceRef={mapRef}
      modules={[
        "geolocation",
        "geocode",
        "geoObject.addon.balloon",
        "geoObject.addon.hint",
        "layout.ImageWithContent",
      ]}
      onLoad={() => {
        setIsLoading(false)
      }}
      defaultState={defaultMapState}
      className={"map"}
      width="100%"
      height="100vh"
      onClick={handleMapClick}
    >
      <ZoomControl options={{ position: { right: "15px", top: "150px" } }} />

      {isSideBarOpen && <Placemark geometry={newCoords} options={optionMarker} />}

      {!isSideBarOpen && <Markers />}
    </MapYandex>
  )
}
