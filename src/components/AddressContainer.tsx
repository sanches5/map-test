import { useEffect, useState, FC, memo } from "react"
import { withYMaps } from "@pbe/react-yandex-maps"
import ymaps from "yandex-maps"

type AddressProps = {
  newCoords: [number, number] | []
  ymaps?: typeof ymaps
}
type AddressContainerProps = { newCoords: [number, number] | [] }

const Address: FC<AddressProps> = (props) => {
  const { ymaps, newCoords } = props
  const [address, setAddress] = useState("")

  const getGeoLocation = async () => {
    try {
      const response = await ymaps?.geocode(newCoords)
      const address = response?.geoObjects.get(0).properties.get("name", {})

      if (!address) {
        throw new Error("Search error")
      }

      setAddress(address.toString())
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (newCoords.length && ymaps) {
      getGeoLocation()
    }
  }, [])

  return (
    <label>
      Адрес:
      <h4>{address}</h4>
    </label>
  )
}

const AddressContainer: FC<AddressContainerProps> = memo(({ newCoords }) => {
  const AddressWithYMaps = withYMaps(Address, true, ["geolocation", "geocode"])

  return <AddressWithYMaps newCoords={newCoords} />
})

export default AddressContainer
