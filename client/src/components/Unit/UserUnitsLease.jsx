import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context.js";
import "./UserUnitsLease.css";
// import 'semantic-ui-css/semantic.min.css'
// import { Accordion, Icon } from 'semantic-ui-react'
import { Card, Icon, Image } from 'semantic-ui-react'

function UserUnitsLease() {


    const {
        user,
        allUnits,
        handlePSearch,
        searchState,
        filteredUnits,
        setCurrentAppUnit,
        currentAppUnit,
        userUnits,
        setUnitToEdit,
        setAllUnits,
    } = useContext(UserContext);

    const handleDelete = (unit) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this unit?"
        );
        if (confirmDelete) {
            const requestOptions = {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            };
            fetch(`/units/${unit.id}`, requestOptions)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to delete unit");
                    }
                    setAllUnits(allUnits.filter((u) => u.id !== unit.id));
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const filteredUnitCards = userUnits.map((unit) => {
        const {
            id,
            lessor_id,
            name,
            image_url,
            type,
            unit_num,
            lot,
            street,
            city,
            state,
            zip,
            beds,
            baths,
            sqft,
            price,
        } = unit;

        return (

            <div
                className="l-unit-card-div"
                key={id}
                onClick={() => setCurrentAppUnit(unit)}
            >
                <div className="l-unit-card-slides">
                    {/* <img src={unit.img_url} alt="unit" /> */}
                    <img className="l-unit-card-image" src={image_url} />
                </div>

                {lessor_id === user.id ? (
                    <Link to="/editunit">
                        <button onClick={()=>setUnitToEdit(unit)}>Edit</button>
                    </Link>
                ) : null}

                {lessor_id === user.id ? (
                        <button onClick={()=>handleDelete(unit)}>Delete</button>
                ) : null}

                <div className="l-unit-card-info">
                    <h4>{name}</h4>
                    <p>rent: {price}</p>
                    <p>{type}</p>
                    <p>
                        <span>{lot}</span>
                        <span> {street}</span>
                        <span> {city}</span>
                        <span> {state},</span>
                        <span> {zip}</span>
                    </p>
                    <li>Unit Number:{unit_num}</li>

                    <div className="l-bed-bath-tag">
                        <p>
                            <span className="b">Beds:</span>{" "}
                            <span>{beds} </span>
                            <span className="b">Baths:</span>{" "}
                            <span>{baths} </span>
                        </p>
                        <p>
                            <span className="b">Sqft:</span> <span>{sqft}</span>{" "}
                            <span>{price}</span>
                        </p>
                    </div>
                </div>
            </div>
        );
    });
    return <div className="l-scroll-div">{filteredUnitCards}</div>;
}

export default UserUnitsLease;
