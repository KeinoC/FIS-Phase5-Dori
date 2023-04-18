import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import UserApplicationDash from "../../Lease/UserApplicationDash";
import {UserContext} from "../../context.js";


function Sidebar() {

    const {user} = useContext(UserContext)

    const keinoUrl = "https://media.licdn.com/dms/image/D4E03AQFfeQmJjk6LIQ/profile-displayphoto-shrink_800_800/0/1671663647371?e=1687392000&v=beta&t=ZWFM9Gk5fRlnvyM-yO_U5hXgGEXWdwGrhwxjnzue2nU"
    


    return (
        <div className="sidebar-container">
            <div className = "side-avatar-container">
                <img className = "side-avatar" src={keinoUrl}/>
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
                    <Link  to="/newunit">Add New Unit</Link>
                </div>
                <div className="links">
                    <Link  to="/newlease">Add new Lease</Link>
                </div>
                <div className="links">
                    <Link  to="/unit_application">Apply to Apartment</Link>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
