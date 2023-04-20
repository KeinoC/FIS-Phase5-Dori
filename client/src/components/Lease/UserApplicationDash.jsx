import React, { useContext, useState } from "react";
import { UserContext } from "../context.js";
import "./UserApplicationDash.css";

function UserApplicationDash() {
    const {
        user,
        userApplications,
        selectedApplication,
        setSelectedApplication,
        setSelectedLeaseApp,
        deleteAppById,
    } = useContext(UserContext);

    const renderUserAppCards = () => {
        if (userApplications) {
            return userApplications.map((app) => (
                <div className="user-application-card2" key={app.id}>
                    <div className="image-container">
                        <img src={app.unit.image_url} alt="unit" />
                    </div>
                    <div className="user-application-card-info-container">
                        <div className="user-application-card-info">
                            <h4>Application Status: {app.status}</h4>
                            <h4>{app.unit.name}</h4>
                            <h4>
                                Address: {app.unit.lot} {app.unit.street},{" "}
                                {app.unit.city} {app.unit.state}
                            </h4>
                            <h4>
                                City / State: {app.unit.city},{" "}
                                {app.unit.state}
                            </h4>
                                <h4>Price: ${app.unit.price} per month</h4>
                            <div className="buttons">
                                <button
                                    className="button"
                                    onClick={() => setSelectedLeaseApp(app)}>Select App</button>
                            <div className = "button delete-button" onClick={()=>deleteAppById(app.id)}>Delete</div>
                            
                            
                            </div>
                        </div>
                    </div>
                </div>
            ));
        }
        return null;
    };

    return <div className="app-scroll-div2">{renderUserAppCards()}</div>;
}

export default UserApplicationDash;
