import { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import { Outlet, useLocation, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
  const location = useLocation()
  const { isAuthenticated } = useContext(AuthContext)

  if (!isAuthenticated && (location === '/login' || '/private/admin')) {
    return <Navigate to='/login' />
  } else if (isAuthenticated) {
    return (
      <>
        <Outlet />
      </>
    )
  }
}

export default PrivateRoute
