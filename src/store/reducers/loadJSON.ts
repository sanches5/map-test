import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getMock } from "../../api"
import { apiLoadJsonResponse } from "../../types"

type State = {
  data: apiLoadJsonResponse
  isLoading: boolean
  error: string
}

const defaultDataValue = {
  reference: {
    titles: [],
    descriptions: [],
  },
}

export const getData = createAsyncThunk("jsonSlice/getData", async () => {
  const response = await getMock()
  return response
})

const jsonSlice = createSlice({
  name: "slicePath",
  initialState: {
    data: defaultDataValue,
    isLoading: false,
    error: "",
  } as State,
  reducers: {
    start(state) {
      state.isLoading = true
    },
    loadSuccess(state, { payload }) {
      state.data = payload.data
      state.isLoading = false
      state.error = ""
    },
    fail(state, { payload }) {
      state.isLoading = false
      state.data = defaultDataValue
      state.error = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload
      state.isLoading = false
      state.error = ""
    })
    builder.addCase(getData.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getData.rejected, (state, action) => {
      state.isLoading = false
      state.data = defaultDataValue
      state.error = "Error"
    })
  },
})

export const {
  actions: { start, fail, loadSuccess },
} = jsonSlice

export default jsonSlice.reducer
