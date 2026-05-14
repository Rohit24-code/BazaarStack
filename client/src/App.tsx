import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { useBootStrapAuth } from "./features/auth/useBootstrapAuth"
import { ErrorModal } from "@/components/ErrorModal"
import { Toaster } from "@/components/ui/sonner"

export function App() {
  useBootStrapAuth()
  return (
    <>
      <RouterProvider router={router} />
      <ErrorModal />
      <Toaster />
    </>
  )
}

export default App
