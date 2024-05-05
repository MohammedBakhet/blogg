import React from 'react'
import { Link } from 'react-router-dom'
import {useContext, useEffect} from "react";
import { UserContext } from './UserContext';
import { GiSoccerKick } from "react-icons/gi";
import { IoIosLogIn } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";

export default function Header() {
    
const {setUserInfo, userInfo} = useContext(UserContext);

    useEffect(() =>{
    fetch('http://localhost:4000/profile', {
        credentials: 'include',
    }).then(response => {
        response.json().then(userInfo =>{
      setUserInfo(userInfo);
        });
    });
    }, []);

function logout(){
    fetch('http://localhost:4000/logout', {
        credentials: 'include',
        method: 'POST',
    });
    setUserInfo(null);
}

const username = userInfo?.username;

  return (
    <div className='Header1'>        
    <header  >
    <Link to="/" className="logo">
      Fotbolls<GiSoccerKick />Bloggen 
    </Link>
    <nav>
        {username && (
            <>
            <Link to="/create">Skapa ny post</Link>
            <a onClick={logout}>logga ut</a>
            </>
        )}
          {!username && (
            <>
             <Link to="/login"> <IoIosLogIn />Logga in</Link>
             <Link to="/register"> <IoCreateOutline />Registrera</Link>
            </>
        )}
     
    </nav>
  </header></div>
  )
}

