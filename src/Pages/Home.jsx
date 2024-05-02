import React from "react";
import "./Home.css";
import Post from "../Components/Post";
import Header from "../Components/Header";


const Home = () => {
  return (
    <div>
      <main>
        <Header/>
    <Post /> 
    <Post /> 
    <Post /> 
         
      </main>
    </div>
  );
};

export default Home;
