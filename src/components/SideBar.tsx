import React, { useEffect, useState, FC, memo } from "react"
import { useAppDispatch, useSelectorApp } from "../store"
import { MarkerType } from "../types"
import AddressContainer from "./AddressContainer"
import { Selects } from "./Selects"

type SideBarProps = {
  isSideBarOpen: boolean
  setIsSideBarOpen: (arg: boolean) => void
  newCoords: [number, number] | []
  setNewCoords: (arg: []) => void
}

export const SideBar: FC<SideBarProps> = memo((props) => {
  const { isSideBarOpen, newCoords, setIsSideBarOpen, setNewCoords } = props

  const [isMounted, setIsMounted] = useState(false)
  const [error, setError] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const { reference } = useSelectorApp((state) => state.loadJson.data)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isSideBarOpen && !isMounted) {
      setIsMounted(true)
      return
    }

    if (!isSideBarOpen && isMounted) {
      setTimeout(() => setIsMounted(false), 400)
    }
  }, [isSideBarOpen, isMounted])

  const handleToggleForm = () => {
    setIsSideBarOpen(false)
    setNewCoords([])
    setDescription("")
    setTitle("")
  }

  const handleUpdateMarkers = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (newCoords.length && title && description) {
      const newId = Date.now().toString(36) + Math.random().toString(36).substring(2)
      const newMarker: MarkerType = {
        id: newId,
        geometry: newCoords,
        title,
        description,
      }
      dispatch({ payload: newMarker, type: "createNewMarker" })
      handleToggleForm()
      setError("")
      return
    }
    setError("error")
  }

  const handleChangeTitle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTitle(event.target.value)
  }

  const handleChangeDescription = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDescription(event.target.value)
  }

  const formClassName = `form-address${isSideBarOpen ? " open" : " close"}`
  const { titles, descriptions } = reference

  return (
    <>
      {isMounted && (
        <form onSubmit={handleUpdateMarkers} className={formClassName}>
          <div>
            <div>
              <h3>Выберете Адрес на карте*:</h3>
              <div>
                <AddressContainer newCoords={newCoords} />
              </div>
            </div>
            <div className="selects-form">
              <Selects
                id="titles"
                name="Titles"
                value={title}
                values={titles}
                onChange={handleChangeTitle}
              />
              <Selects
                id="description"
                name="Description"
                value={description}
                values={descriptions}
                onChange={handleChangeDescription}
              />
            </div>
          </div>
          {error && <h3>{error}</h3>}
          <button type="submit" className="save-address">
            Save Marker
          </button>
        </form>
      )}
    </>
  )
})
