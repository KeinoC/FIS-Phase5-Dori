import React, { useState, useContext } from "react";
import { UserContext } from "../context.js";
import "./NewLeaseForm.css";

function NewLeaseForm() {
    const { user, selectedLeaseApp, newLeaseFormData, setNewLeaseFormData } =
        useContext(UserContext);

    console.log(selectedLeaseApp);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewLeaseFormData({
            ...newLeaseFormData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const leaseData = {
            lessor_id: newLeaseFormData?.unit?.lessor_id || "",
            lessee_id: newLeaseFormData?.lessee_id || "",
            unit_id: newLeaseFormData?.unit_id || "",
            rent: newLeaseFormData?.rent || "",
            sec_deposit: newLeaseFormData?.sec_deposit || "",
            beds: newLeaseFormData?.beds || "",
            baths: newLeaseFormData?.baths || "",
            sqft: newLeaseFormData?.sqft || "",
            type: newLeaseFormData?.type || "",
            util_incld: newLeaseFormData?.util_incld || "",
            util_excld: newLeaseFormData?.util_excld || "",
            lot: newLeaseFormData?.lot || "",
            street: newLeaseFormData?.street || "",
            unit_num: newLeaseFormData?.unit_num || "",
            city: newLeaseFormData?.city || "",
            state: newLeaseFormData?.state || "",
            zip: newLeaseFormData?.zip || "",
        };
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
                setNewLeaseFormData(
                    Object.fromEntries(
                        Object.keys(newLeaseFormData).map((key) => [key, ""])
                    )
                );
            })
            .catch((error) => {
                console.error(error);
            });
    };

    console.log(newLeaseFormData)

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label>Lessor ID:</label>
                <input
                    label="Lessor ID:"
                    id="lessor_id"
                    name="lessor_id"
                    type="text"
                    // placeholder={newLeaseFormData ? newLeaseFormData.unit.lessor_id : ""}
                    value={newLeaseFormData.lessor_id}
                    onChange={handleInputChange}
                />
                <label>Lessee ID:</label>
                <input
                    label="Lessee ID:"
                    id="lessee_id"
                    name="lessee_id"
                    type="text"
                    value={newLeaseFormData.lessee_id}
                    onChange={handleInputChange}
                />
                <label>Unit ID</label>
                <input
                    label="Unit ID:"
                    id="unit_id"
                    name="unit_id"
                    type="text"
                    value={newLeaseFormData.unit_id}
                    onChange={handleInputChange}
                />
                <label>Monthly Rent</label>
                <input
                    label="Rent:"
                    id="rent"
                    name="rent"
                    type="text"
                    value={newLeaseFormData.rent}
                    onChange={handleInputChange}
                />
                <label>Security Deposit</label>
                <input
                    label="Security Deposit:"
                    id="sec_deposit"
                    name="sec_deposit"
                    type="text"
                    value={newLeaseFormData.sec_deposit}
                    onChange={handleInputChange}
                />
                <label>Bedrooms</label>
                <input
                    label="Beds:"
                    id="beds"
                    name="beds"
                    type="text"
                    value={newLeaseFormData.beds}
                    onChange={handleInputChange}
                />
                <label>Bathrooms</label>
                <input
                    label="Baths:"
                    id="baths"
                    name="baths"
                    type="text"
                    value={newLeaseFormData.baths}
                    onChange={handleInputChange}
                />
                <label>Square Footage</label>
                <input
                    label="Square Feet:"
                    id="sqft"
                    name="sqft"
                    type="text"
                    value={newLeaseFormData.sqft}
                    onChange={handleInputChange}
                />
                <label>Type</label>
                <input
                    label="Type:"
                    id="type"
                    name="type"
                    type="text"
                    value={newLeaseFormData.type}
                    onChange={handleInputChange}
                />
                <label>Utilities Included</label>
                <input
                    label="Utilities Included:"
                    id="util_incld"
                    name="util_incld"
                    type="text"
                    value={newLeaseFormData.util_incld}
                    onChange={handleInputChange}
                />
                <label>Utilities Excluded</label>
                <input
                    id="util_excld"
                    name="util_excld"
                    type="text"
                    value={newLeaseFormData.util_excld}
                    onChange={handleInputChange}
                />
                <label>House #</label>
                <input
                    label="Lot:"
                    id="lot"
                    name="lot"
                    type="text"
                    value={newLeaseFormData.lot}
                    onChange={handleInputChange}
                />
                <label>Street</label>
                <input
                    label="Street:"
                    id="street"
                    name="street"
                    type="text"
                    value={newLeaseFormData.street}
                    onChange={handleInputChange}
                />
                <label>Unit #</label>
                <input
                    label="Unit Number:"
                    id="unit_num"
                    name="unit_num"
                    type="text"
                    value={newLeaseFormData.unit_num}
                    onChange={handleInputChange}
                />
                <label>City</label>
                <input
                    label="City:"
                    id="city"
                    name="city"
                    type="text"
                    value={newLeaseFormData.city}
                    onChange={handleInputChange}
                />
                <label>State</label>
                <input
                    label="State:"
                    id="state"
                    name="state"
                    type="text"
                    value={newLeaseFormData.state}
                    onChange={handleInputChange}
                />
                <label>Zip</label>
                <input
                    label="Zip:"
                    id="zip"
                    name="zip"
                    type="text"
                    value={newLeaseFormData.zip}
                    onChange={handleInputChange}
                />
                <button type="submit">Create Lease</button>
            </form>
        </div>
    );
}

export default NewLeaseForm;
