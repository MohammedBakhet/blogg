import React from 'react';
import { Link } from 'react-router-dom';
import '../Pages/Home.css';

export default function Post({ _id, title, summary, cover, content, createdAt, author }) {
  return (
    <div>
      <div className="post">
        <div className="image">
            <Link to= {`/post/${_id}`}>
          <img
            src= {'http://localhost:4000/' + cover}
            alt=""
          />
          </Link>
        </div>
       
        <div className="text">


        <Link to= {`/post/${_id}`}>  <h2>{title}</h2></Link>


          <p className="info">
            <a className="author"> {author && author.username} </a>
            <time>{new Date(createdAt).toLocaleDateString()}</time>
          </p>
          <p className="summary">{summary}</p>
        </div>
      </div>
    </div>
  );
}
