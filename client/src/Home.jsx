import React, { useState, useEffect } from "react";
import {  Link } from "react-router-dom";
const Home = () => {

  const [actors, setActors] = useState([]);

  useEffect(() => {
    async function userData() {
      const response = await fetch("http://localhost:4001/api/users/")
        const res = await response.json()
        setActors(res);
    }
    userData();
  }, []);

  // useEffect(() => {
  //   async function deleteUser(){
  //       const response = await fetch(`http://localhost:4001/api/users/${id}`)
  //         const res = await response.json()
  //         setActors(res);
  //   }
  //   deleteUser()
  // }, [actors])

  // function removeUser(){
  //   // setTodos((x) => (x = todos.filter((el) => el.id !== todo.id)));
  //   setActors((x) => x = actors.filter(gone => gone.id !== actors.id ))
  
  // }

  return (
    <div>
     
      {actors.map((actor) => {
        console.log("a", actor);
        return (
          <div key={actor.id}>
            <Link
              to={{
                pathname: `/${actor.id}/posts`,
                state: { p: actor },
              }}
            >
              {actor.name}
            </Link>
            <span>
              <i className="fas fa-pen"></i>
            </span>
            <span >
              <i className="fas fa-window-close"></i>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Home
