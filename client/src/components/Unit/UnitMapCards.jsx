import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context.js";
import { useHistory } from "react-router-dom";
// import '../../styles/tailwind.css'
import "./UnitMapCards.css";


function UnitMapCards() {
    const {
        allUnits,
        handlePSearch,
        searchState,
        filteredUnits,
        setFilteredUnits,
        llPhoneFromMapView,
        llPhoneById,
        setCurrentAppUnit,
    } = useContext(UserContext);
    
    const history = useHistory();

    
    const filteredUnitCards = filteredUnits.map((unit) => {
        const {
            id,
            image_url,
            name,
            unit_num,
            lot,
            street,
            city,
            state,
            zip,
            beds,
            sqft,
        } = unit;
        
        function continueToApplication() {
            setCurrentAppUnit(unit);
            history.push("/unit_application");
        }


        return (
            <div className=".sm: unit-card-div" key={id}>
                <div className="unit-card-slides">
                    <img className="w-6 unit-card-image" src={unit.image_url} />
                </div>

                <div className="unit-card-info">

                    <div className="bookmakr-container">
                        <button className="bookmark-ph">bookmark</button>
                    </div>

                    <h4>{name}</h4>

                    <p>
                        <span>{lot}</span>
                        <span> {street}</span>
                        <span> {city}</span>
                        <span> {state},</span>
                        <span> {zip}</span>
                    </p>
                    <li>Unit Number:{unit_num}</li>

                    <div className="bed-bath-tag">
                        <p>
                            <span className="b">Beds:</span>{" "}
                            <span>{beds} </span>
                        </p>
                        <p>
                            <span className="b">Sqft:</span> <span>{sqft}</span>
                        </p>

                </div>
                    <button className="phone-ph" onClick={()=>llPhoneById(unit.lessor_id)}>Call: {llPhoneFromMapView}</button>
                    <button className="email-ph">Email</button>
                    <button className="inmail-ph">In-Mail</button>
                    <button className="apply-ph" type="button" onClick={continueToApplication}>Apply Now</button>
                </div>
            </div>
        );
    });
    return <div className="scroll-div">{filteredUnitCards}</div>;
}

export default UnitMapCards;
