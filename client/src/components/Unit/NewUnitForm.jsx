import React, { useState, useContext } from "react";
import { UserContext } from "../context.js";
import "./NewUnitForm.css";
import { Link, useHistory } from "react-router-dom";

function NewUnitForm() {
    const { user } = useContext(UserContext);
    const history = useHistory();

    console.log(user);

    const [formData, setFormData] = useState({
        lessor_id: user.id,
        name: "",
        image_url: "",
        type: "",
        unit_num: "",
        lot: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        beds: "",
        baths: "",
        sqft: "",
        price: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/units", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                setFormData({
                    lessor_id: user.id,
                    name: "",
                    image_url: "",
                    type: "",
                    unit_num: "",
                    lot: "",
                    street: "",
                    city: "",
                    state: "",
                    zip: "",
                    beds: "",
                    baths: "",
                    sqft: "",
                    price: "",
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };



    const renderInput = (inputName, inputType = "text") => {
        return (
            <label>
                {inputName}:
                <input
                    type={inputType}
                    name={inputName}
                    value={formData[inputName]}
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
                {renderInput("beds", "number")}
                {renderInput("baths", "number")}
                {renderInput("sqft", "number")}
                {renderInput("price", "number")}
                
                <Link to="/dashboard">
                    <button type="button">Cancel</button>
                </Link>

                    <button type="submit" onSubmit={() => history.push("/dashboard")}>Submit</button>

            </form>
        </>
    );
}

export default NewUnitForm;