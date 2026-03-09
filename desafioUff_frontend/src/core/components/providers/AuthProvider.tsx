import { decodeToken } from "@/core/lib/utils/tokenValidation"
import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface AuthContextData {
  username: string | null
  login: (token: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("jwtToken")
    if (!token) return

    const decoded = decodeToken(token)
    if (!decoded) return

    setUsername(decoded.username)
  }, [])

  const login = (token: string) => {
    localStorage.setItem("jwtToken", token)

    const decoded = decodeToken(token)
    if (!decoded) return

    setUsername(decoded.username)
  }

  const logout = () => {
    localStorage.removeItem("jwtToken")
    navigate("/Login")
    setUsername(null)
  }

  return (
    <AuthContext.Provider
      value={{
        username,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
