import { React, useState, useContext } from "react";
import { UserContext } from "../context.js";
import NewLeaseForm from "./NewLeaseForm.jsx";
import "./NewLeaseDash.css";

function NewLeaseDash() {
    ///views through the lease experience

    const [introView, setIntroView] = useState(true);
    const [leaseUnitView, setLeaseUnitView] = useState(false);
    const [leaseAppView, setLeaseAppView] = useState(false);
    const [leaseFormView, setLeaseFormView] = useState(false);

    function startLeaseProcess() {
        setIntroView(false);
        setLeaseUnitView(true);
    }

    return (
        <div className="new-lease-dash">
            {introView ? (
                <>
                    <div className="lease-intro-container">
                        <label>Use DOORi's Lease Assistant</label>
                        <button onClick={() => startLeaseProcess()}>
                            Start
                        </button>
                    </div>
                    <div className="lease-intro-container">
                        <label> Already have a lease?</label>
                        <button> Upload </button>
                    </div>
                </>
            ) : (
                <div className="lease-progress-container">
                    <div>
                        <h1 className="new-lease-header"> New Lease </h1>
                    </div>
                    <div className="new-lease-card-container">
                        <div className="new-lease-card">
                            <div className="lease-card-face">
                                <section className="lease-card-head2"><span className="span-rotate">Apartment</span></section>
                                <section className="lease-display-area"></section>
                            </div>
                        </div>
                        <div className="new-lease-card">
                            <div className="lease-card-face">
                                <section className="lease-card-head2"><span className="span-rotate">Tenant</span></section>
                                <section className="lease-display-area"></section>
                            </div>
                            </div>
                        <div className="new-lease-card">
                            <div className="lease-card-face">
                                <section className="lease-card-head2"><span className="span-rotate">Lease</span></section>
                                <section className="lease-display-area"></section>
                            </div>
                        </div>
                        <div className="new-lease-card">
                            <div className="lease-card-face">
                                <section className="lease-card-head2"><span className="span-rotate">Review</span></section>
                                <section className="lease-display-area"></section>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NewLeaseDash;
