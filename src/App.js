import './style/app.scss'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'

import Home from './pages/Home'
import Article from './pages/Articles'
import LoginPage from './pages/LoginPage'
import AdminPostPage from './pages/AdminPostPage'
import AuthContext from './contexts/AuthContext'
import authAPI from './services/authAPI'
import PrivateRoute from './components/PrivateRoute'
import NavBar from './components/NavBar'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    authAPI.isAuthenticated
  )

  useEffect(() => {
    authAPI.setUp()
    authAPI.isAuthenticated()
  })

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <div className='App'>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/post/:id' element={<Article />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/private' element={<PrivateRoute />}>
            <Route path='/private/admin' element={<AdminPostPage />} />
          </Route>
        </Routes>
      </div>
    </AuthContext.Provider>
  )
}

export default App

// https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src%2FApp.tsx
