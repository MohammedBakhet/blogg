import React, { useContext, useEffect, useState } from "react";
import Header from "../Components/Header";
import { useParams } from "react-router-dom";
import "./Home.css";
import { UserContext } from "../Components/UserContext";
import { Link } from "react-router-dom";


export default function PostPage() {
  const [postInfo, setPostInfo] = useState();
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setPostInfo(postInfo);
        });
      });
  }, [id]); // Include 'id' as a dependency in useEffect to re-fetch data when 'id' changes

  if (!postInfo || !userInfo) return null; // Return null or a loading indicator if data is not available

  return (
    <div className="post-page">
      <main>
        <Header />
        <h1>{postInfo.title}</h1>
        <div className="author">
          Av @ {postInfo.author && postInfo.author.username}
        </div>
        {userInfo.id === postInfo.author?._id && (
          <div className="edit-row">
           <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"             >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              Redigera
            </Link>
          </div>
        )}
        <div className="image">
          {postInfo.cover && (
            <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
          )}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postInfo.content }}></div> 
        {/* Add other components or elements here */}
      </main>
    </div>
  );
}
