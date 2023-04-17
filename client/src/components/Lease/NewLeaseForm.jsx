import React, { useState, useContext } from "react";
import {UserContext} from "../context.js";
import "./NewLeaseForm.css"



function NewLeaseForm() {
    const user = useContext(UserContext)
    function Input({ label, id, name, type, value, onChange }) {
        return (
            <div>
                <label htmlFor={id}>{label}</label>
                <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            </div>
        );
    }

    const [leaseData, setLeaseData] = useState({
        lessor_id: "",
        lessee_id: "",
        unit_id: "",
        rent: "",
        sec_deposit: "",
        beds: "",
        baths: "",
        sqft: "",
        type: "",
        util_incld: "",
        util_excld: "",
        lot: "",
        street: "",
        unit_num: "",
        city: "",
        state: "",
        zip: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLeaseData({
            ...leaseData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/leases", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(leaseData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to create lease");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                // reset form data
                setLeaseData({
                    lessor_id: "",
                    lessee_id: "",
                    unit_id: "",
                    rent: "",
                    sec_deposit: "",
                    beds: "",
                    baths: "",
                    sqft: "",
                    type: "",
                    util_incld: "",
                    util_excld: "",
                    lot: "",
                    street: "",
                    unit_num: "",
                    city: "",
                    state: "",
                    zip: "",
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label>Lesser ID:</label>
                <input
                    label="Lessor ID:"
                    id="lessor_id"
                    name="lessor_id"
                    type="text"
                    value={leaseData.lessor_id}
                    onChange={handleInputChange}
                />
                <label>Lessee ID:</label>
                <input
                    label="Lessee ID:"
                    id="lessee_id"
                    name="lessee_id"
                    type="text"
                    value={leaseData.lessee_id}
                    onChange={handleInputChange}
                />
                <input
                    label="Unit ID:"
                    id="unit_id"
                    name="unit_id"
                    type="text"
                    value={leaseData.unit_id}
                    onChange={handleInputChange}
                />
                <input
                    label="Rent:"
                    id="rent"
                    name="rent"
                    type="text"
                    value={leaseData.rent}
                    onChange={handleInputChange}
                />
                <input
                    label="Security Deposit:"
                    id="sec_deposit"
                    name="sec_deposit"
                    type="text"
                    value={leaseData.sec_deposit}
                    onChange={handleInputChange}
                />
                <input
                    label="Beds:"
                    id="beds"
                    name="beds"
                    type="text"
                    value={leaseData.beds}
                    onChange={handleInputChange}
                />
                <input
                    label="Baths:"
                    id="baths"
                    name="baths"
                    type="text"
                    value={leaseData.baths}
                    onChange={handleInputChange}
                />
                <input
                    label="Square Feet:"
                    id="sqft"
                    name="sqft"
                    type="text"
                    value={leaseData.sqft}
                    onChange={handleInputChange}
                />
                <input
                    label="Type:"
                    id="type"
                    name="type"
                    type="text"
                    value={leaseData.type}
                    onChange={handleInputChange}
                />
                <input
                    label="Utilities Included:"
                    id="util_incld"
                    name="util_incld"
                    type="text"
                    value={leaseData.util_incld}
                    onChange={handleInputChange}
                />
                    <label>Utilities Excluded</label>
                <input
                    id="util_excld"
                    name="util_excld"
                    type="text"
                    value={leaseData.util_excld}
                    onChange={handleInputChange}
                />
                <input
                    label="Lot:"
                    id="lot"
                    name="lot"
                    type="text"
                    value={leaseData.lot}
                    onChange={handleInputChange}
                />
                <input
                    label="Street:"
                    id="street"
                    name="street"
                    type="text"
                    value={leaseData.street}
                    onChange={handleInputChange}
                />
                <input
                    label="Unit Number:"
                    id="unit_num"
                    name="unit_num"
                    type="text"
                    value={leaseData.unit_num}
                    onChange={handleInputChange}
                />
                <input
                    label="City:"
                    id="city"
                    name="city"
                    type="text"
                    value={leaseData.city}
                    onChange={handleInputChange}
                />
                <input
                    label="State:"
                    id="state"
                    name="state"
                    type="text"
                    value={leaseData.state}
                    onChange={handleInputChange}
                />
                <input
                    label="Zip:"
                    id="zip"
                    name="zip"
                    type="text"
                    value={leaseData.zip}
                    onChange={handleInputChange}
                />
                {/* <button type="submit">Create Lease</button> */}
            </form>
        </div>
    );
}

export default NewLeaseForm;
