import React, { useContext, useState, createContext} from 'react'

const LoginContext = createContext()

const LoginProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const[profile, setProfile] = useState([])
  const[history, setHistory] = useState([])

  return (
    <LoginContext.Provider  value={{ isLoggedIn, setIsLoggedIn, profile, setProfile, history, setHistory }}>
      {children}
    </LoginContext.Provider>
  )
}

export const useLogin = () => useContext(LoginContext)

export default LoginProvider
