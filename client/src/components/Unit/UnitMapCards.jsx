import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context.js";
// import '../../styles/tailwind.css'
import "./UnitMapCards.css";

function UnitMapCards() {
    const {
        allUnits,
        handlePSearch,
        searchState,
        filteredUnits,
        setFilteredUnits,
    } = useContext(UserContext);

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
                    
                </div>
            </div>
        );
    });
    return <div className="scroll-div">{filteredUnitCards}</div>;
}

export default UnitMapCards;
