import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <main className="flex-1 flex w-full bg-[#f9f9f9] ">
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
