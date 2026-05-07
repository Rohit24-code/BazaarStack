import { useAuthStore } from "@/features/auth/store"
import { useAuth } from "@clerk/react"
import { Navigate, Outlet, useLocation } from "react-router-dom"

function PublicOnlyLayout() {
  const { isLoaded, isSignedIn } = useAuth()
  const { isBootStrapped, status } = useAuthStore()

  if (!isLoaded || (isSignedIn && (!isBootStrapped || status === "loading")))
    return null

  if (isSignedIn) {
    return <Navigate to="/profile" replace />
  }

  return <Outlet />
}

export default PublicOnlyLayout
