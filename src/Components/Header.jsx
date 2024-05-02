import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
        
    <header>
    <Link to="/" className="logo">
      MyBlog
    </Link>
    <nav>
        
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  </header></div>
  )
}

export default Header