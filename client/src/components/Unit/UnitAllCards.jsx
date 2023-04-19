import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../context.js";
// import '../../styles/tailwind.css'
import "./UnitMapCards.css";





function UnitAllCards() {
    const {
        allUnits,
        handlePSearch,
        searchState,
        filteredUnits,
        llPhoneById,
        llPhoneFromMapView,
        setLlPhoneFromMapView,
        setCurrentAppUnit,
        setUnitOptionsApplication,
    } = useContext(UserContext);
    
    const history = useHistory();
    
    const allUnitCards = allUnits.map((unit) => {
        const {
            id,
            image_url,
            lessor_id,
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
            setUnitOptionsApplication(false)
            history.push("/unit_application");
        }



        return (
            <div className=".sm: unit-card-div" key={id}>
                <div className="unit-card-slides">
                    <img className="unit-card-image" src={unit.image_url} />
                </div>

                <div className="unit-card-info">
                    <div className="bookmark-container">
                        <button className="bookmark-ph">bookmark</button>
                    </div>

                    <h4>{name}</h4>

                    <p>
                        <span> {lot} </span>
                        <span> {street} </span>
                        <span> {city} </span>
                        <span> {state}, </span>
                        <span> {zip} </span>
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
    return <div className="scroll-div">{allUnitCards}</div>;
}
export default UnitAllCards;
