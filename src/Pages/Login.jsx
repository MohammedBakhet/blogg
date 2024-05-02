import React from 'react'
import Header from '../Components/Header'

const Login = () => {
  return (
    <div>
        <main>
        <Header/>
        
        <form className="login">
            <h1>Login</h1>
            <input type="text" placeholder='username' />
            <input type="Password" placeholder='Password' />
            <button type="submit">Login</button>
        </form>
        </main>

        </div>
  )
}

export default Login