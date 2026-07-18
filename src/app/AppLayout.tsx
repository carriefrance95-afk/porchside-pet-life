import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="flex min-h-screen">
        {/* Sidebar goes here */}

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}