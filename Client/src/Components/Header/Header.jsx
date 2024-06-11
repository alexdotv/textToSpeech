import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom';


export default function Header() {
  return (
    <nav className="nav">
      <ul>
        <li><Link className='link' to="/">About</Link></li>
        <li><Link className='link' to="/TextToSpeech">Tetx to Speech</Link></li>
        <li><Link className='link' to="/Price">Price</Link></li>
        <li><Link className='link login' to="/Auth">Login</Link></li>
      </ul>
    </nav>
  )
}
