import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import loadJson from "./reducers/loadJSON"
import markersReducer from "./reducers/markerReducer"

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useSelectorApp: TypedUseSelectorHook<RootState> = useSelector

const rootReducer = combineReducers({
  markers: markersReducer,
  loadJson: loadJson,
})

const store = configureStore({
  reducer: rootReducer,
})

export * from "./reducers/loadJSON"
export * from "./reducers/markerReducer"
export default store
