import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { useBootStrapAuth } from "./features/auth/useBootstrapAuth"

export function App() {
  useBootStrapAuth()
  return <RouterProvider router={router} />
}

export default App
