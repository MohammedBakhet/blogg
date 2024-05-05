import React, { useState } from 'react';
import Header from '../Components/Header';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function register(ev) {
    ev.preventDefault();
    try {
        const response = await fetch('http://localhost:4000/register', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Failed to register');
        }
        console.log('User registered successfully');
      } catch (error) {
        console.error('Error registering user:', error);
      }
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
          <button>Register</button>
        </form>
      </main>
    </div>
  );
};

export default Register;
