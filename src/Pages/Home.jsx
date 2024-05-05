import React, { useEffect, useState } from "react";
import "./Home.css";
import Post from "../Components/Post";
import Header from "../Components/Header";

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/post')
            .then(response => response.json())
            .then(posts => {
                setPosts(posts);
            });
    }, []);

    return (
        <div>
            <main>
                <Header />
                <img className="FotImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlObSIJJJAMJVMAVEMlvk3QbiJs09gPAGyFDA8X3Ks5Q&s"></img>
                {posts.length > 0 && posts.map(post => {
                    return <Post key={post._id} {...post} />;
                })}
            </main>
        </div>
    );
}
