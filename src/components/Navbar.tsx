import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { NavLink, useLocation } from 'react-router-dom'
import { navItems } from '../data'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const {pathname} = useLocation(); 

  const loggedInUser = localStorage.getItem('loggedInUser')
  const userData = loggedInUser ? JSON.parse(loggedInUser) : null

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    setTimeout(() => {
      location.replace(pathname)
    }, 1500);
  }

  return (
    <nav className="bg-[#f9f9f9] text-black px-5 py-3 flex justify-between items-center shadow-md relative">
      {/* Logo */}
      <NavLink to="/" end>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="5" width="6" height="6" rx="1" />
          <path d="m3 17 2 2 4-4" />
          <path d="M13 6h8" />
          <path d="M13 12h8" />
          <path d="M13 18h8" />
        </svg>
      </NavLink>

      {/* If User is Logged In */}
      {userData ? (
        <div className="flex items-center space-x-4">
         <NavLink to='/profile'>profile</NavLink>
          <span
            onClick={handleLogout}
            className="cursor-pointer text-red-700 hover:text-red-500 transition"
          >
            Logout
          </span>
        </div>
      ) : (
        <>
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-lg">
            {navItems.map(item => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-indigo-400 font-semibold'
                      : 'hover:text-indigo-300'
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile Icon */}
          <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <ul className="absolute top-16 left-0 w-full bg-black text-center space-y-6 py-8 z-50 shadow-lg transition-all duration-300">
              {navItems.map(item => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? 'text-indigo-400 font-semibold'
                        : 'hover:text-indigo-300'
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </nav>
  )
}

export default Navbar
