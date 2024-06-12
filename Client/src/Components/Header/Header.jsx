import React, { useContext }from 'react'
import './Header.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';


export default function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  return (
    <nav className="nav">
      <ul>
        <li><Link className='link' to="/">About</Link></li>
        <li><Link className='link' to="/TextToSpeech">Tetx to Speech</Link></li>
        <li><Link className='link' to="/Price">Price</Link></li>
        {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
         ) : (
        <li><Link className='link login' to="/Auth">Login</Link></li>
        )}
      </ul>
    </nav>
  )
}
