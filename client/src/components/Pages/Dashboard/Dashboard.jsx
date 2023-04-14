import React, { useState, useContext } from "react";
import Sidebar from "../Global/Sidebar.jsx";
import "./Dashboard.css";
import UnitCards from "../../Unit/UnitMapCards.jsx";
import { UserContext } from "../../context";
import UserUnitsDash from "../../Unit/UserUnitsDash.jsx";
import UserApplicationDash from "../../Lease/UserApplicationDash.jsx";

function Dashboard() {
    const { user, userApplications, userUnits, userUnitCount, userApplicationCount } =
        useContext(UserContext);

    const [showUnits, setShowUnits] = useState(false);
    const [showApplications, setShowApplications] = useState(false);

    function toggleShowUnits() {
        showUnits ? setShowUnits(false) : setShowUnits(true);
        setShowApplications(false);
    }

    function toggleShowApplications() {
        showApplications
            ? setShowApplications(false)
            : setShowApplications(true);
        setShowUnits(false);
    }

    console.log(userUnitCount)

    return (
        <div className="dashboard-page">
            <Sidebar />

            {/* conditionally rendering user units */}
            {userUnitCount > 0 ? (
                <div className="dashboard-container">
                    <div className="dash-tag" onClick={toggleShowUnits}>
                        Units {userUnitCount}
                    </div>
                    {showUnits ? <UserUnitsDash /> : null}
                </div>
            ) : null}

            {/* conditionally rendering user applications */}
            {userApplicationCount > 0 ? (
                <div className="dashboard-container">
                    <div className="dash-tag" onClick={toggleShowApplications}>
                        Applications
                    </div>
                    {showApplications ? <UserApplicationDash /> : null}
                </div>
            ) : null}
        </div>
    );
}

export default Dashboard;
