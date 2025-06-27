import { useEffect, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { NavLink, useLocation } from 'react-router-dom'
import { navItems } from '../data'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { pathname } = useLocation()

  const loggedInUser = localStorage.getItem('loggedInUser')
  const userData = loggedInUser ? JSON.parse(loggedInUser) : null

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light'
    }
    return 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    setTimeout(() => {
      location.replace(pathname)
    }, 1000)
  }

  return (
    <nav className="bg-surface text-text px-5 py-3 flex justify-between items-center shadow-md sticky top-0 z-50 border-b border-[var(--color-border)]">
      {/* Logo and App Name */}
      <div className="flex items-center gap-3">
        <NavLink to="/" end className="flex items-center gap-2 select-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
          >
            <path
              d="M379.733333 386.133333l-157.866666 155.733334-89.6-87.466667L85.333333 501.333333l136.533334 136.533334 204.8-204.8zM379.733333 108.8l-157.866666 155.733333-89.6-87.466666L85.333333 224l136.533334 136.533333L426.666667 155.733333zM379.733333 663.466667l-157.866666 155.733333-89.6-87.466667L85.333333 778.666667l136.533334 136.533333 204.8-204.8z"
              fill="#6366F1"
            />
            <path
              d="M512 469.333333h426.666667v85.333334H512zM512 192h426.666667v85.333333H512zM512 746.666667h426.666667v85.333333H512z"
              fill="#90CAF9"
            />
          </svg>

          <span className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            TodoPro
          </span>
        </NavLink>
      </div>
      <div className="flex items-center gap-4">
        {/* Auth/Menu section */}
        {userData ? (
          <div className="flex items-center space-x-4">
            <NavLink
              to="/todos"
              className={({ isActive }) =>
                isActive
                  ? 'font-semibold text-primary'
                  : 'hover:text-primary/80 transition'
              }
            >
              Todos
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? 'font-semibold text-primary'
                  : 'hover:text-primary/80 transition'
              }
            >
              Profile
            </NavLink>

            <span
              onClick={handleLogout}
              className="cursor-pointer text-error hover:text-error/80 font-semibold transition"
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
                        ? 'text-primary font-semibold underline underline-offset-4'
                        : 'hover:text-primary/80 transition'
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
              <ul className="absolute top-16 left-0 w-full bg-surface-alt text-center space-y-6 py-8 z-50 shadow-lg transition-all duration-300 border-b border-[var(--color-border)]">
                {navItems.map(item => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        isActive
                          ? 'text-primary font-semibold underline underline-offset-4'
                          : 'hover:text-primary/80 transition'
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
        {/* Dark mode toggle always visible */}
        <button
          onClick={toggleTheme}
          className="ml-2 p-2 rounded-full border border-[var(--color-border)] bg-surface-alt text-text hover:bg-surface transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? (
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
