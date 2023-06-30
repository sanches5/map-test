import { useEffect, useState } from "react"
import { SideBar, Map, ProgressBar } from "./components/index"
import { getData, useAppDispatch } from "./store"
import "./App.css"

function App() {
  const [newCoords, setNewCoords] = useState<[number, number] | []>([])
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useAppDispatch()

  const handleToggleForm = () => {
    setIsSideBarOpen(!isSideBarOpen)
  }

  useEffect(() => {
    dispatch(getData())
  }, [])

  return (
    <div className="app">
      {isLoading && <ProgressBar progress={50} />}

      <SideBar
        key="sidebar"
        isSideBarOpen={isSideBarOpen}
        newCoords={newCoords}
        setIsSideBarOpen={setIsSideBarOpen}
        setNewCoords={setNewCoords}
      />

      <Map
        isSideBarOpen={isSideBarOpen}
        newCoords={newCoords}
        setIsLoading={setIsLoading}
        setNewCoords={setNewCoords}
      />

      {!isSideBarOpen && !isLoading && (
        <button className="create-marker" onClick={handleToggleForm}>
          Добавить Адрес
        </button>
      )}
    </div>
  )
}

export default App
