import React from 'react'

const Post = () => {
  return (
    <div> 
        
    <div className="post">
    <div className="image">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6hctapq5Vgl1wuCkw8BPOO1CwnE2M8sqKZQ&s"
        alt=""
      />
    </div>
    <div className="text">
      <h2> Världens Bästa</h2>
      <p className="info">
        <a className="author">Darwin nunez</a>
        <time>2019.04.20 18:00</time>
      </p>
      <p className="summary">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque
        ratione aut quaerat alias voluptates rerum sit veniam asperiores,
        ullam enim animi? Sunt nostrum aliquam, sequi voluptatibus quas
        corporis adipisci obcaecati.
      </p>
    </div>
  </div></div>
  )
}

export default Post