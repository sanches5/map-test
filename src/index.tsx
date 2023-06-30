import ReactDOM from "react-dom/client"
import { YMaps } from "@pbe/react-yandex-maps"
import { Provider } from "react-redux"
import App from "./App"
import store from "./store"
import "./index.css"

const API_KEY = "f6877766-7039-4b1c-9b9a-71f52df8538a"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <Provider store={store}>
    <YMaps query={{ apikey: API_KEY }}>
      <App />
    </YMaps>
  </Provider>
)
