import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full ">
      <Navbar/>
      <main className="flex-1 flex w-full bg-surface-alt text-text">
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
