import React, {useContext, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../../styles";
// import Login from "../../../pages/Login";
import {useHistory} from "react-router-dom";
import  {UserContext}  from "../../context.js";

import "./TopBar.css"

function NavBar() {

  const {user, setUser, allUnits, setFilteredUnits, userUnits} = useContext(UserContext)

  const history = useHistory();
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null)
        history.push("/landing");
      }
    });
  }

  const renderAllUnits = () => {
    console.log("renderAllUnits")
    setFilteredUnits(allUnits)
  }



  const keinoUrl = "https://media.licdn.com/dms/image/D4E03AQFfeQmJjk6LIQ/profile-displayphoto-shrink_800_800/0/1671663647371?e=1687392000&v=beta&t=ZWFM9Gk5fRlnvyM-yO_U5hXgGEXWdwGrhwxjnzue2nU"
  const kaiUrl = "https://m.media-amazon.com/images/I/61yQAF86FKL._AC_SL1500_.jpg"

  const [urlTest, setUrlTest] = useState("https://m.media-amazon.com/images/I/61yQAF86FKL._AC_SL1500_.jpg")
  
  useEffect(() => {
      if (user) {
          setUrlTest((user.first_name === "Keino") ? keinoUrl : kaiUrl)
  }},[user])

  return (
      <div className = "top-bar">

        <div className = "logo">
        <Link to="/home">DOORi</Link>
        </div>
      
      <nav className = "top-bar-buttons-container">
        <a href="/dashboard">
          <button onClick={()=>renderAllUnits()} variant="outline">
            Dashboard
          </button>
        </a>

        <a href="/explore">
        <button onClick={renderAllUnits} variant="outline">
          Explore
        </button>
        </a>

        {!user ?
        <a href="/login">
        <button variant="outline">
          Login
        </button>
        </a>
        :
        <Link to="/landing">
        <button variant="outline" onClick={handleLogoutClick}>
          Logout
        </button>
        </Link>
        }
        {user ?
            <div className = "top-avatar-container">
                <img className = "top-avatar" src={urlTest}/>
                    <h3 className="top-name"> {user ? `Welcome, ${user.first_name}` : ""}</h3>
            </div>
: <></>
}
      </nav>

      </div>

  );
}


export default NavBar;
