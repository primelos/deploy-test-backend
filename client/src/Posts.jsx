import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Posts = (props) => {
  console.log(props);
  const [post, setPost] = useState([])

  useEffect(() => {
    const temp = props.location.state.p.id
    async function userData() {
      const response = await fetch(`http://localhost:4001/api/users/${temp}/posts`);
      const res = await response.json();
      setPost(res);
    }
    userData();
  }, []);
  console.log('POSTED', post);
  return (
    <div>
      <Link to="/">Home</Link>
      <div>
        {
          post.map(data => {
            return (
              <p key={data.id}>{data.text}</p>
            )
          })
        }
      </div>
    </div>
  );
}

export default Posts
