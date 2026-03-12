import { decodeToken } from "@/core/lib/utils/tokenValidation"
import { createContext, useEffect, useState } from "react"

interface AuthContextData {
  userId: string | null
  username: string | null
  login: (token: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("jwtToken")
    if (!token) return

    const decoded = decodeToken(token)
    if (!decoded) return

    setUsername(decoded.username)
    setUserId(decoded.sub)
  }, [])

  const login = (token: string) => {
    localStorage.setItem("jwtToken", token)

    const decoded = decodeToken(token)
    if (!decoded) return

    setUsername(decoded.username)
    setUserId(decoded.sub)
  }

  const logout = () => {
    localStorage.removeItem("jwtToken")
    // navigate("/Login")

    setUsername(null)
    setUserId(null)
  }

  return (
    <AuthContext.Provider
      value={{
        userId,
        username,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
