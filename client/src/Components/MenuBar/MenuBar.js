import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { Context } from '../../context/auth'
import './MenuBar.css'



export default function MenuBar() {
  const { user, logout } = useContext(Context)

  const menuBar = user ? (
    <nav>
      <div className='menubar__flex-container'>
        <div className='menubar__flex-item'>
          <Link to={'/'}>
            {user.name}
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

