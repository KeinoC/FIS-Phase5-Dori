import React, { useState, useContext } from "react";
import { UserContext } from "../context.js";
import "./NewUnitForm.css";
import { Link, useHistory } from "react-router-dom";

function NewUnitForm() {
    const {
        user,
        myId,
        setMyId,
        handleInputChange,
        handleNewUnitSubmit,
        newUnitFormData,
        setNewUnitFormData,
    } = useContext(UserContext);

    const history = useHistory();
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!newUnitFormData.price) {
        alert("please enter a price value")
        return;
        } else {
            history.push("/dashboard");
        handleNewUnitSubmit(event);
        }
    };

    const renderInput = (inputName) => {
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
        <div className="new-unit-page">
            <h1 className="unit-creation" >Unit Creation Form</h1>
            <form className="new-unit-form" onSubmit={handleSubmit}>
                {renderInput("name")}
                {renderInput("image_url")}
                {renderInput("type")}
                {renderInput("unit_num")}
                {renderInput("lot", true)}
                {renderInput("street", true)}
                {renderInput("city", true)}
                {renderInput("state", true)}
                {renderInput("zip", true)}
                {renderInput("beds", true)}
                {renderInput("baths", true)}
                {renderInput("sqft", true)}
                {renderInput("price", true)}
                <div className="button-div">
                <Link to="/dashboard">
                    <button type="button">Cancel</button>
                </Link>
                <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default NewUnitForm;
