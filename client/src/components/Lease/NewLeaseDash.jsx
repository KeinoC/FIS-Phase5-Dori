import { React, useState, useContext } from "react";
import { UserContext } from "../context.js";
import NewLeaseForm from "./NewLeaseForm.jsx";
import "./NewLeaseDash.css";
import UserUnitsLease from "../Unit/UserUnitsLease.jsx";
import UserApplicationDash from "./UserApplicationDash.jsx";
import LeasePreview from "./LeasePreview.jsx";

function NewLeaseDash() {
    ///views through the lease experience

    const [introView, setIntroView] = useState(true);
    const [leaseUnitView, setLeaseUnitView] = useState(false);
    const [leaseAppView, setLeaseAppView] = useState(true);
    const [leaseFormView, setLeaseFormView] = useState(false);
    const [leaseReviewView, setLeaseReviewView] = useState(false);

    const [unitRight, setUnitRight] = useState(false);
    const [appRight, setAppRight] = useState(false);
    const [formRight, setFormRight] = useState(false);
    const [reviewRight, setReviewRight] = useState(false);


    function startLeaseProcess() {
        setIntroView(false);
        setLeaseUnitView(true);
    }

    function toggleActiveLeaseCard(e) {
        e.target.classList.add("complete")
    }


    function unitNext() {
        setUnitRight(true);
        setAppRight(false);
        setFormRight(false);
        setReviewRight(false);

        setLeaseUnitView(false);
        setLeaseAppView(true);
        setLeaseFormView(false);
        setLeaseReviewView(false);
    }

    function appNext() {
        setUnitRight(true);
        setAppRight(true);
        setFormRight(false);
        setReviewRight(false);

        setLeaseUnitView(false);
        setLeaseAppView(false);
        setLeaseFormView(true);
        setLeaseReviewView(false);
    }

    function appPrev() {
        setUnitRight(false);
        setAppRight(false);
        setFormRight(false);
        setReviewRight(false);

        setLeaseUnitView(true);
        setLeaseAppView(false);
        setLeaseFormView(false);
        setLeaseReviewView(false);
    }

    function formNext() {
        setUnitRight(true);
        setAppRight(true);
        setFormRight(true);
        setReviewRight(false);

        setLeaseUnitView(false);
        setLeaseAppView(false);
        setLeaseFormView(false);
        setLeaseReviewView(true);
    }

    function formPrev() {
        setUnitRight(true);
        setAppRight(false);
        setFormRight(false);
        setReviewRight(false);

        setLeaseUnitView(false);
        setLeaseAppView(true);
        setLeaseFormView(false);
        setLeaseReviewView(false);
    }

    function reviewPrev() {
        setUnitRight(true);
        setAppRight(true);
        setFormRight(false);
        setReviewRight(false);

        setLeaseUnitView(false);
        setLeaseAppView(false);
        setLeaseFormView(true);
        setLeaseReviewView(false);
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
                        {/* <div className= {(leaseUnitView && unitRight) ? "new-lease-card lcard1 lease-current-section-from-right" : leaseUnitView ? "new-lease-card lcard1 lease-current-section-from-left" : unitRight ? "new-lease-card lcard1-right" : "new-lease-card lcard1"}>
                            <div className="lease-card-face">
                                <section className="lease-card-head2"><span className="span-rotate">Apartment</span></section>
                                <section className="lease-display-area"><UserUnitsLease /></section>
                            </div>
                            <div className="button-div">
                                <button className="next-button" onClick = {()=>unitNext()}>Next</button>
                            </div>
                        </div> */}
                        <div className= {(leaseAppView && appRight) ? "new-lease-card lcard2 lease-current-section-from-right" : leaseAppView ? "new-lease-card lcard2 lease-current-section-from-left" : appRight ? "new-lease-card lcard2-right" : "new-lease-card lcard2"}>
                            <div className="lease-card-face">
                                <section className="lease-card-head2"><span className="span-rotate">Applications</span></section>
                                <section className="app-display-area"> <UserApplicationDash /> </section>
                            </div>
                            <div className="button-div">
                                <button className="next-button" onClick={()=>appPrev()}>Previous</button>
                                <button className="next-button" onClick={()=>appNext()}>Next</button>
                            </div>
                            </div>
                        <div className={(leaseFormView && formRight) ? "new-lease-card lcard3 lease-current-section-from-right" : leaseFormView ? "new-lease-card lcard3 lease-current-section-from-left" : formRight ? "new-lease-card lcard3-right" : "new-lease-card lcard3"}>
                            <div className="lease-card-face">
                                <section className="lease-card-head2"><span className="span-rotate">Lease</span></section>
                                <section className="lease-display-area"> <NewLeaseForm /> </section>
                            </div>
                            <div className="button-div">
                                <button className="next-button" onClick={()=>formPrev()}>Previous</button>
                                <button className="next-button" onClick={()=>formNext()}>Next</button>
                            </div>
                        </div>
                        <div className={(leaseReviewView && reviewRight) ? "new-lease-card lcard4 lease-current-section-from-right" : leaseReviewView ? "new-lease-card lcard4 lease-current-section-from-left" : reviewRight ? "new-lease-card lcard4-right" : "new-lease-card lcard4"}>
                            <div className="lease-card-face">
                                <section className="lease-card-head2"><span className="span-rotate">Peview</span></section>
                                <section className="lease-display-area"><LeasePreview /></section>
                            </div>
                            <div className="button-div">
                                <button className="next-button" onClick={()=>reviewPrev()}>Previous</button>
                                <button className="next-button">Save</button>
                                <button className="next-button">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NewLeaseDash;
