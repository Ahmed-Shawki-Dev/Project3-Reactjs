import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="text-white bg-black px-5 2xl:text-2xl">
      <ul className="flex justify-between items-center  w-full h-15 2xl:h-25 2xl:justify-around">
        <li>
          <NavLink to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 2xl:w-18 2xl:h-18"
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
        </li>

        <li className="flex w-[50%] h-full items-center justify-end gap-10">
          <NavLink to="/registrate">Registrate</NavLink>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
