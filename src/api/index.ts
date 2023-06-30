import axios from "axios"
import { apiLoadJsonResponse } from "../types"

const instance = axios.create({
  baseURL: "https://run.mocky.io/v3",
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
})

export const getMock = (): Promise<apiLoadJsonResponse> => {
  return instance
    .get("/6102c1b2-254f-4b7c-addb-67d4df752866")
    .then((res) => res.data)
}

export default instance
