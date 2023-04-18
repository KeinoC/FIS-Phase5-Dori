import React, { useState, useContext } from "react";
import { UserContext } from "../context.js";
import "./NewUnitForm.css";
import { Link, useHistory } from "react-router-dom";

function NewUnitForm() {
    const { user, myId, setMyId, handleInputChange, handleNewUnitSubmit, newUnitFormData, setNewUnitFormData } = useContext(UserContext)


    const history = useHistory();
    const handleSubmit = (event) => {
        event.preventDefault();
        history.push("/dashboard");
        handleNewUnitSubmit(event);
    }


    const renderInput = (inputName,) => {

        return (
            <label>
                {inputName}:
                <input
                    // type={inputType}
                    name={inputName}
                    value={newUnitFormData[inputName]}
                    onChange={handleInputChange}
                />
            </label>
        );
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                {renderInput("name")}
                {renderInput("image_url")}
                {renderInput("type")}
                {renderInput("unit_num")}
                {renderInput("lot")}
                {renderInput("street")}
                {renderInput("city")}
                {renderInput("state")}
                {renderInput("zip")}
                {renderInput("beds")}
                {renderInput("baths")}
                {renderInput("sqft")}
                {renderInput("price")}
                
                <Link to="/dashboard">
                    <button type="button">Cancel</button>
                </Link>


                    <button type="submit">Submit</button>


            </form>
        </>
    );
}

export default NewUnitForm;