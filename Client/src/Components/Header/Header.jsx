import React, { useContext }from 'react'
import './Header.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';


export default function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  return (
    <nav className="nav">
      <ul className='nav-list'>
        <li><Link className='link' to="/">Tetx to Speech</Link></li>
        {isAuthenticated ? (
        <li className='nav-auth' onClick={logout}>Logout</li>
         ) : (
        <li><Link className='link nav-auth' to="/Auth">Login</Link></li>
        )}
      </ul>
    </nav>
  )
}
