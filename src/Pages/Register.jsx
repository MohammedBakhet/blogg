import React, { useState } from 'react';
import Header from '../Components/Header';
import { Navigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false); 

  async function register(ev) {
    ev.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        console.log('User registered successfully');
        setRedirect(true); 
      } else {
        throw new Error('Failed to register');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }

  if (redirect) {
    return <Navigate to="/" />; 
  }

  return (
    <div>
      <main>
        <Header />
        <form className="register" onSubmit={register}>
          <h1>Registrera</h1>
          <input
            type="text"
            placeholder="Användarnamn"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button>Registrera</button>
        </form>
      </main>
    </div>
  );
};

export default Register;
