import { createAction, createReducer } from "@reduxjs/toolkit"
import { MarkerType } from "../../types"

type initialStateType = MarkerType[] | []
const initialState: initialStateType = []

const getMarkers = createAction("getMarkers")
const createNewMarker = createAction<MarkerType>("createNewMarker")

const markersReducer = createReducer(initialState, (builder) => {
  builder.addCase(getMarkers, () => {
    const markers: MarkerType[] = JSON.parse(localStorage.getItem("markers") || "[]")
    return markers
  })

  builder.addCase(createNewMarker, (state, action) => {
    const updateMarkers = [...state, action.payload]
    localStorage.setItem("markers", JSON.stringify(updateMarkers))
    return updateMarkers
  })

  builder.addDefaultCase((state) => state)
})

export default markersReducer
