import React, {useContext, useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import "./Sidebar.css";
import UserApplicationDash from "../../Lease/UserApplicationDash";
import {UserContext} from "../../context.js";


function Sidebar() {

    const history = useHistory();

    const {user, userUnits, setUnitOptionsApplication, setSelectedApplication} = useContext(UserContext)

    const keinoUrl = "https://media.licdn.com/dms/image/D4E03AQFfeQmJjk6LIQ/profile-displayphoto-shrink_800_800/0/1671663647371?e=1687392000&v=beta&t=ZWFM9Gk5fRlnvyM-yO_U5hXgGEXWdwGrhwxjnzue2nU"
    const kaiUrl = "https://m.media-amazon.com/images/I/61yQAF86FKL._AC_SL1500_.jpg"

    const [urlTest, setUrlTest] = useState("https://m.media-amazon.com/images/I/61yQAF86FKL._AC_SL1500_.jpg")
    
    useEffect(() => {
        if (user) {
            setUrlTest((user.first_name === "Keino") ? keinoUrl : kaiUrl)
    }},[user])


    function navToApp() {
        setSelectedApplication(false)
        setUnitOptionsApplication(true)
        history.push("/unit_application")
    }

console.log(user)

    return (
        <div className="sidebar-container">
            <div className = "side-avatar-container">
                <img className = "side-avatar" src={urlTest}/>
                <div className = "user-info">
                    <h3 className="side-name">{user ? user.first_name : ""} {user ? user.last_name : ""} </h3>
                </div>
            </div>
            {/* <h2>Menu</h2>
                <label>Select View</label>
            <select>
                <option>My Listings (set f(ct))</option>
                <option>Applications (set f(ct))</option>
                <option>Tenants </option>
                <option>Leases</option>
            </select> */}
            <br/>
            <div>
                <div className="links">
                    <li onClick={()=>history.push("/newunit")}>Add New Unit</li>
                </div>
                {(userUnits.length > 0)? 
                <div className="links">
                    <li onClick={()=>history.push("/newlease")} >Add new Lease</li>
                </div>
                : <></>
}
                <div className="links">
                    <li className="link" onClick={()=>navToApp()} >Apply to Apartment</li>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
