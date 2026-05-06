import { Outlet } from "react-router-dom"

function AdminLayout() {
  return (
    // <div className="min-h-screen bg-background text-foreground">
    //   <main className="mx-auto max-w-7xl px-4 py-8">
    <Outlet />
    // </main>
    // </div>
  )
}

export default AdminLayout
