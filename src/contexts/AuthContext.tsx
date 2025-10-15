import { createContext, useContext, useState, useEffect } from 'react'
import { getUserById } from '../services/users'
import type { ReactNode } from 'react'
import type { AuthContextType, User } from '../types'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const login = (user: User) => {
    setCurrentUser(user)
    localStorage.setItem("currentUser", user.id.toString())
  }

  useEffect(() => {
    const restoreUser = async () => {
      console.log("Starting user restoration")
      const storedUserId = Number(localStorage.getItem("currentUser"));
      console.log("Stored ID is ", localStorage.getItem("currentUser"))
      const storedUser = await getUserById(storedUserId);
      console.log("Found stored user: ", storedUser)
      if (storedUser) {
        login(storedUser)
        console.log("Logged in as ", storedUser)
      } else {
        logout()
        console.log("Logged out.")
      }
      setIsLoading(false)
    }

    restoreUser()
  }, [])

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem("currentUser");
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}