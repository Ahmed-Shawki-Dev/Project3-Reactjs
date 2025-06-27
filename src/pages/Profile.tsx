import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'

interface UserData {
  username: string
  email: string
  [key: string]: unknown
}

const getUserData = (): UserData | null => {
  const user = localStorage.getItem('loggedInUser')
  if (!user) return null
  try {
    const parsed = JSON.parse(user)
    return {
      username: parsed.user?.username || parsed.username || '',
      email: parsed.user?.email || parsed.email || '',
      ...parsed.user,
    }
  } catch {
    return null
  }
}

const ProfilePage = () => {
  const [user, setUser] = useState<UserData | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    setUser(getUserData())
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    location.replace('/')
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-surface p-8 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold mb-2 text-error">Not logged in</h2>
          <Button color="primary" onClick={() => navigate('/login')}>
            Go to Login
          </Button>
        </div>
      </div>
    )
  }

  const initials = user.username
    ? user.username
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U'

  return (
    <div className="flex items-center w-full justify-center min-h-full bg-surface-alt py-10 px-2">
      <div className="bg-surface rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-4xl font-bold text-on-primary mb-4">
          {initials}
        </div>
        <h2 className="text-2xl font-bold mb-1 text-primary">
          {user.username}
        </h2>
        <p className="text-text-secondary mb-6">{user.email}</p>
        <Button color="error" width="w-full" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  )
}

export default ProfilePage
