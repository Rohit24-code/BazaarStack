import { useAuthStore } from "@/features/auth/store"
import { useAuth } from "@clerk/react"
import { Navigate, Outlet } from "react-router-dom"

function ProtectedLayout() {
  const { isLoaded, isSignedIn } = useAuth()
  const { isBootStrapped, status } = useAuthStore()

  if (!isLoaded) return null

  if (isSignedIn && (!isBootStrapped || status === "loading")) {
    return null
  }

  if (isSignedIn) {
    return <Navigate to={"/profile"} replace />
  }
  return <Outlet />
}

export default ProtectedLayout
