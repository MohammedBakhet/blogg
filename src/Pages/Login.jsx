import React, { useContext, useState } from 'react';
import Header from '../Components/Header';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../Components/UserContext';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const[redirect, setRedirect] = useState('');
    const {setUserInfo} = useContext(UserContext)


    async function login(ev) {
        ev.preventDefault();
     
        const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
                credentials:'include',
            });
            if (response.ok) {
                response.json().then(userInfo =>{
                    setUserInfo(userInfo);
                     setRedirect(true);
                });
            } else {
        alert('Invalid')
    }
    } 
    
    if (redirect) {
        return <Navigate to ={'/'}/>
    }
    return (
        <div>
            <main>
                <Header />
                <form className="login" onSubmit={login}>
                    <h1>Logga in</h1>
                    <input type="text" placeholder='Användarnamn' value={username} onChange={ev => setUsername(ev.target.value)} />
                    <input type="password" placeholder='Lösenord' value={password} onChange={ev => setPassword(ev.target.value)} />
                    <button type="submit">Logga in</button>
                </form>
            </main>
        </div>
    );
}
