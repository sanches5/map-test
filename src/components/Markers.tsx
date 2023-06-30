import { FC, useEffect } from "react"
import { useSelectorApp, useAppDispatch } from "../store"
import Marker from "./Marker"

const Markers: FC = () => {
  const markers = useSelectorApp((state) => state.markers)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch({ type: "getMarkers" })
  }, [])

  return (
    <>
      {markers.length ? (
        markers.map((marker) => (
          <Marker
            key={marker.id}
            title={marker.title}
            description={marker.description}
            geometry={marker.geometry}
          />
        ))
      ) : (
        <div className="not-marker">Пусто</div>
      )}
    </>
  )
}

export default Markers
