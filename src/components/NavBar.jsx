import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import authAPI from '../services/authAPI'
import { useNavigate } from 'react-router'

const NavBar = () => {
  const navigate = useNavigate()

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)

  const handleDisconnect = () => {
    authAPI.logOut()
    setIsAuthenticated(false)
    navigate('/login')
  }

  return (
    <nav>
      <Link to='/'>Home</Link>
      {isAuthenticated && <Link to='/private/admin'>Admin</Link>}
      {!isAuthenticated && <Link to='/login'>Connect</Link>}
      {isAuthenticated && <span onClick={handleDisconnect}>Disconnect</span>}
    </nav>
  )
}

export default NavBar
