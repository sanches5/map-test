import { FC } from "react"
import { Placemark } from "@pbe/react-yandex-maps"
import { MarkerType } from "../types"

const Marker: FC<Omit<MarkerType, "id">> = (props) => {
  const { title, description, geometry } = props

  return (
    <Placemark
      geometry={geometry}
      properties={{
        iconContent: "",
        balloonContent: `<div>
                    <h1 class="title">${title}</h1>
                    <p class="description">${description}</p>
                </div>`,
      }}
    />
  )
}

export default Marker
