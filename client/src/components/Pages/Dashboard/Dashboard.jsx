
import React, {useState, useContext, useEffect} from "react";
import Sidebar from "../Global/Sidebar.jsx";
import RentChart from "./RentChart.jsx";
import "./Dashboard.css"
// import UnitCards from "../../Unit/UnitMapCards.jsx"
import { UserContext } from "../../context.js";

import UserUnitsDash from "../../Unit/UserUnitsDash.jsx";
import UserApplicationDash from "../../Lease/UserApplicationDash.jsx";


function Dashboard() {
    const { user, userApplications, userUnits, userUnitCount, userApplicationCount } =
        useContext(UserContext);

const {user, allUnits, myId} = useContext(UserContext)
console.log(myId)

const [showUnits, setShowUnits] = useState(false)
const [showApplications, setShowApplications] = useState(false)


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

        <div className="dashboard-container">
            <RentChart />
            <div className="dash-tag" onClick={toggleShowUnits}>Units</div>
            {showUnits ? <UserUnitsDash /> : <></>}
            
            <div className="dash-tag" onClick={toggleShowApplications}>Applications</div>
            {showApplications ? <UserApplicationDash /> : <></>}
        </div>

        </div>
    );
}

export default Dashboard;
