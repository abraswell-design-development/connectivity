import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { JWTContext } from '../../context/jwt-auth'
import './MenuBar.css'



export default function MenuBar() {
  const { user, logout } = useContext(JWTContext)

  const menuBar = user ? (
    <nav>
      <div className='menubar__flex-container'>
        <div className='menubar__flex-item'>
          <Link to={'/'}>
            {user.username}
          </Link>
        </div>
        <div className='menubar__flex-item'>
          <Link to={'/login'} onClick={logout}>
            Logout
          </Link>
        </div>
      </div>
    </nav>
  ) : (
    <nav>
      <div className='menubar__flex-container'>
        <div className='menubar__flex-item'>
          <Link 
            to={'/login'}>
            Login
          </Link>
        </div>
        <div className='menubar__flex-item'>
          <Link to={'/register'}>
            Register
          </Link>
        </div>
      </div>
    </nav>
  );




  return menuBar;
}

