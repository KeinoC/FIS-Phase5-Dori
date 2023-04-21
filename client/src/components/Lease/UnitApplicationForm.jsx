import React, { useState, useContext } from "react";
import { UserContext } from "../context.js";
import "./UnitApplicationForm.css";

function UnitApplicationForm() {
    const {
        user,
        allUnits,
        handlePSearch,
        searchState,
        filteredUnits,
        setCurrentAppUnit,
        currentAppUnit,
        unitOptionsApplication,
        setUnitOptionsApplication,
        appFormUnitPrefill,
        setAppFormUnitPrefill,
        currentAppLessor,
        handleApplicationSubmit,
    } = useContext(UserContext);

    console.log(currentAppUnit);
    console.log(currentAppUnit);
    console.log(user.id);

    return (
        <div className="unit-application-form">
            <div className="app-header">
            <div>Application Details</div>
            </div>
            <div className="app-body-wrapper">
            {user ? (
                <div className="lessee-app-block-wrapper">
                    <div className="app-sec-header">Renter's Info</div>
                    <li> ---Personal Info </li>
                    <li>
                        {" "}
                        First Name: <span>{user.first_name}</span>{" "}
                    </li>
                    <li>
                        {" "}
                        Last Name: <span>{user.last_name}</span>{" "}
                    </li>
                    <li>
                        {" "}
                        Date of Birth: <span>{user.dob}</span>{" "}
                    </li>
                    <li>
                        {" "}
                        Phone: <span>{user.phone}</span>{" "}
                    </li>
                    <li>
                        {" "}
                        Email: <span>{user.email}</span>{" "}
                    </li>
                    <li> ---Current Address </li>
                    <li>
                        {" "}
                        House #: <span>{user.lot}</span>{" "}
                    </li>
                    <li>
                        {" "}
                        Street: <span>{user.street}</span>{" "}
                    </li>
                    <li>
                        {" "}
                        City: <span>{user.city}</span>{" "}
                    </li>
                    <li>
                        {" "}
                        State: <span>{user.state}</span>{" "}
                    </li>
                    <li>
                        {" "}
                        Zip Code: <span>{user.zip}</span>{" "}
                    </li>
                </div>
            ) : (
                <div>
                    Uh Oh.. Something went wrong. Please try logging out and
                    back in again.
                </div>
            )}

            {currentAppUnit ? (
                <div className="application-unit-container">

                    <div className="unit-app-block-wrapper">
                    <div className="app-sec-header">Unit Info</div>
                    <div className="spacer"></div>
                        <div className="new-app-block">
                            <h2>--Address</h2>
                            <li>
                                Lot: <span>{currentAppUnit.lot}</span>
                            </li>
                            <li>
                                Street: <span>{currentAppUnit.street}</span>
                            </li>
                            <li>
                                City: <span>{currentAppUnit.city}</span>
                            </li>
                            <li>
                                State: <span>{currentAppUnit.state}</span>
                            </li>
                            <li>
                                Zip: <span>{currentAppUnit.zip}</span>
                            </li>
                            <li>
                                Unit Number:{" "}
                                <span>{currentAppUnit.unit_num}</span>
                            </li>
                        </div>

                        <div className="new-app-block">
                            <h2>--Details</h2>
                            <li>
                                Unit Type: <span>{currentAppUnit.type}</span>
                            </li>
                            <li>
                                Unit Size: <span>{currentAppUnit.sqft}</span>
                            </li>
                            <li>
                                Unit Beds: <span>{currentAppUnit.beds}</span>
                            </li>
                            <li>
                                Unit Baths: <span>{currentAppUnit.baths}</span>
                            </li>
                            <li>
                                Unit Rent: <span>{currentAppUnit.price}</span>
                            </li>
                        </div>

                        <div className="new-app-block">
                            <h2>--Landlord Info</h2>
                            <li>
                                First Name:{" "}
                                <span>{currentAppLessor.first_name}</span>
                            </li>
                            <li>
                                Last Name:{" "}
                                <span>{currentAppLessor.last_name}</span>
                            </li>
                            <li>
                                Phone: <span>{currentAppLessor.phone}</span>
                            </li>
                            <li>
                                Email: <span>{currentAppLessor.email}</span>
                            </li>
                        </div>
                    </div>
                </div>
            ) : (
                <h4>Please Select a Unit for this Application</h4>
                )}
                </div>
            <button onClick={handleApplicationSubmit}>
                Submit Application
            </button>
        </div>
    );
}

export default UnitApplicationForm;
