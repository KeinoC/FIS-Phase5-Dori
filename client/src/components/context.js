import React, { useEffect, useState, createContext } from "react";
import { useHistory } from "react-router-dom";
import Geocode from "react-geocode";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const history = useHistory();

    const [user, setUser] = useState(null);
    const [allUnits, setAllUnits] = useState([]);

    const [allApplications, setAllApplications] = useState(null);
    const [userApplications, setUserApplications] = useState(null);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [myId, setMyId] = useState("");

    const [llPhoneFromMapView, setLlPhoneFromMapView] = useState("");

    const [allLeases, setAllLeases] = useState(null);
    const [userLeases, setUserLeases] = useState(null);

    const [userUnits, setUserUnits] = useState([]);
    const [pSearchResults, setPSearchResults] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [searchState, setSearchState] = useState("All");
    const [filteredUnits, setFilteredUnits] = useState([]);
    const [currentAppUnit, setCurrentAppUnit] = useState(null);
    const [currentAppUnitId, setCurrentAppUnitId] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [currentAppLessorId, setCurrentAppLessorId] = useState(
        currentAppUnit ? currentAppUnit.lessor_id : ""
    );

    const [newUnitFormData, setNewUnitFormData] = useState({
        lessor_id: "",
        // lessor: user,
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

    ///////////////////////// lease prefill ////////////////////////
    const [selectedLeaseApp, setSelectedLeaseApp] = useState(null);
    const [newLeaseFormData, setNewLeaseFormData] = useState({
        lessor_id: selectedLeaseApp ? selectedLeaseApp.unit.lessor_id : "",
        lessee_id: selectedLeaseApp ? selectedLeaseApp.lessee_id : "",
        unit_id: selectedLeaseApp ? selectedLeaseApp.unit_id : "",
        rent: selectedApplication ? selectedApplication.rent : "",
        start_date: selectedApplication ? selectedApplication.start_date : "",
        end_date: selectedApplication ? selectedApplication.end_date : "",
        rent: selectedApplication ? selectedApplication.unit.rent : "",
        sec_deposit: selectedApplication ? selectedApplication.sec_deposit : "",
        beds: selectedApplication ? selectedApplication.unit.beds : "",
        baths: selectedApplication ? selectedApplication.unit.baths : "",
        sqft: selectedApplication ? selectedApplication.unit.sqft : "",
        type: selectedApplication ? selectedApplication.unit.type : "",
        util_incld: selectedApplication
            ? selectedApplication.unit.util_incld
            : "",
        util_excluded: selectedApplication
            ? selectedApplication.unit.util_excluded
            : "",
        lot: selectedApplication ? selectedApplication.unit.lot : "",
        street: selectedApplication ? selectedApplication.unit.street : "",
        unit_num: selectedApplication ? selectedApplication.unit.unit_num : "",
        city: selectedApplication ? selectedApplication.unit.city : "",
        state: selectedApplication ? selectedApplication.unit.state : "",
        zip: selectedApplication ? selectedApplication.unit.zip : "",
    });

    useEffect(() => {
        if (selectedLeaseApp) {
            setNewLeaseFormData({
                lessor_id: selectedLeaseApp.unit
                    ? selectedLeaseApp.unit.lessor_id
                    : "",
                lessee_id: selectedLeaseApp.lessee_id || "",
                unit_id: selectedLeaseApp.unit_id || "",
                rent: selectedLeaseApp.rent || "",
                start_date: selectedLeaseApp.start_date || "",
                end_date: selectedLeaseApp.end_date || "",
                rent: selectedLeaseApp.unit ? selectedLeaseApp.unit.rent : "",
                sec_deposit: selectedLeaseApp.sec_deposit || "",
                beds: selectedLeaseApp.unit ? selectedLeaseApp.unit.beds : "",
                baths: selectedLeaseApp.unit ? selectedLeaseApp.unit.baths : "",
                sqft: selectedLeaseApp.unit ? selectedLeaseApp.unit.sqft : "",
                type: selectedLeaseApp.unit ? selectedLeaseApp.unit.type : "",
                util_incld: selectedLeaseApp.unit
                    ? selectedLeaseApp.unit.util_incld
                    : "",
                util_excluded: selectedLeaseApp.unit
                    ? selectedLeaseApp.unit.util_excluded
                    : "",
                lot: selectedLeaseApp.unit ? selectedLeaseApp.unit.lot : "",
                street: selectedLeaseApp.unit
                    ? selectedLeaseApp.unit.street
                    : "",
                unit_num: selectedLeaseApp.unit
                    ? selectedLeaseApp.unit.unit_num
                    : "",
                city: selectedLeaseApp.unit ? selectedLeaseApp.unit.city : "",
                state: selectedLeaseApp.unit ? selectedLeaseApp.unit.state : "",
                zip: selectedLeaseApp.unit ? selectedLeaseApp.unit.zip : "",
            });
        }
    }, [selectedLeaseApp]);

    //////////////////////////// Deletes by Id //////////////////////

    function deleteAppById(id) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this application?"
        );
        if (confirmDelete) {
            fetch(`/unit_applications/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data);
                    setAllApplications(allApplications.filter(app => app.id !== id))
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    }

    function deleteLeaseById(id) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this lease?"
        );
        if (confirmDelete) {
            fetch(`/leases/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data);
                    setAllLeases(allLeases.filter(lease => lease.id !== id))
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    }

    function deleteUnitById(id) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this unit?"
        );
        if (confirmDelete) {
            fetch(`/units/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data);
                    setAllUnits(allUnits.filter(unit => unit.id !== id))
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    }

    //////////////////// All Leases //

    useEffect(() => {
        if (user) {
            fetch("/leases", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data);
                    setAllLeases(data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    }, [user]);

    console.log(allLeases);
    /////////////////////// user leases /////////////////////////

    useEffect(() => {
        if (user) {
            const uLeases = allLeases.filter((lease) => {
                if (lease.lessee_id === user.id) {
                    setUserLeases((userLeases) => [...userLeases, lease]);
                }
            });
        }
    }, [allLeases]);

    //////////////by id helpers //////////////////////

    useEffect(() => {
        fetch("/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                setUsers(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    const [users, setUsers] = useState([]);
    const [selectedAppLessee, setSelectedAppLessee] = useState(null);

    useEffect(() => {
        if (selectedApplication) {
            const lessee = users.find(
                (user) => user.id === selectedApplication.lessee_id
            );
            setSelectedAppLessee(lessee);
        }
    }, [selectedLeaseApp]);

    /////////////////////// new unit /////////////////////////

    const handleNewUnitSubmit = (event) => {
        event.preventDefault();
        fetch("/units", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUnitFormData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                setAllUnits((allUnits) => [...allUnits, data]);
                setNewUnitFormData({
                    lessor_id: myId,
                    // lessor: user,
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

    ///////////////////////  UNIT EDIT  /////////////////////////
    const [unitToEdit, setUnitToEdit] = useState(null);
    const [unitEditPrefill, setUnitEditPrefill] = useState({
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

    useEffect(() => {
        if (unitToEdit) {
            setUnitEditPrefill({
                name: unitToEdit.name,
                image_url: unitToEdit.image_url,
                type: unitToEdit.type,
                unit_num: unitToEdit.unit_num,
                lot: unitToEdit.lot,
                street: unitToEdit.street,
                city: unitToEdit.city,
                state: unitToEdit.state,
                zip: unitToEdit.zip,
                beds: unitToEdit.beds,
                baths: unitToEdit.baths,
                sqft: unitToEdit.sqft,
                price: unitToEdit.price,
            });
        }
    }, [unitToEdit]);

    ///////////////////////////////////////////////////////////////////

    const [unitOptionsApplication, setUnitOptionsApplication] = useState(false);

    // const [newUnitApplication, setNewUnitApplication] = useState({
    //     lessee_id: user ? user.id : "",
    //     unit_id: currentAppUnit ? currentAppUnit.unit_id : "",
    //     status: "Submitted, Pending Landlord Approval",
    // });

    const [currentAppLessor, setCurrentAppLessor] = useState({});

    ///refactor this for lease later. Application only needs unit id, lessor id and status
    const [appFormUnitPrefill, setAppFormUnitPrefill] = useState({
        lessor_id: currentAppUnit ? currentAppUnit.lessor_id : "",
        lessee_id: user ? user.id : "",
        unit_id: currentAppUnit ? currentAppUnit.unit_id : "",
        beds: currentAppUnit ? currentAppUnit.beds : "",
        baths: currentAppUnit ? currentAppUnit.baths : "",
        sqft: currentAppUnit ? currentAppUnit.sqft : "",
        type: currentAppUnit ? currentAppUnit.type : "",
        lot: currentAppUnit ? currentAppUnit.lot : "",
        street: currentAppUnit ? currentAppUnit.street : "",
        unit_num: currentAppUnit ? currentAppUnit.unit_num : "",
        city: currentAppUnit ? currentAppUnit.city : "",
        state: currentAppUnit ? currentAppUnit.state : "",
        zip: currentAppUnit ? currentAppUnit.zip : "",
    });

    useEffect(() => {
        // auto-login & set user variables
        fetch("/check_session").then((r) => {
            if (r.ok) {
                r.json().then((user) => {
                    setUser(user);
                    setMyId(user.id);
                });
            }
        });
    }, []);

    ///////////////////// UNITS BY ID //////////////////////////

    useEffect(() => {
        // fetch allUnits
        if (currentAppLessorId)
            fetch("/users/" + currentAppLessorId).then((r) => {
                if (r.ok) {
                    r.json().then((user) => setCurrentAppLessor(user));
                }
            });
    }, [currentAppLessorId]);

    useEffect(() => {
        if (user) {
            setCurrentAppUnit((prevState) => ({
                ...prevState,
                lessee_id: user.id,
            }));
        }
    }, [user]);

    useEffect(() => {
        // fetch allUnits
        fetch("/units").then((r) => {
            if (r.ok) {
                r.json().then((units) => setAllUnits(units));
            }
        });
    }, []);

    useEffect(() => {
        if (user) {
            setNewUnitFormData((prevState) => ({
                ...prevState,
                lessor_id: user.id,
            }));
        }
    }, [user]);

    /////////////////////// New Unit Post request

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const updated = { ...newUnitFormData, [name]: value };
        setNewUnitFormData(updated);
    };

    ////////////////////////////////////////////////////////////
    ///////////////////// Applications /////////////////////////

    /// New Application
    function handleApplicationSubmit() {
        if (user && currentAppUnit) {
            const lessee_id = user.id;
            const unit_id = currentAppUnit.id;
            const status = "pending";

            fetch("/unit_applications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    lessee_id,
                    unit_id,
                    status,
                }),
            })
                .then((response) => response.json())
                .then((newUnitApplication) => {
                    console.log("Success:", newUnitApplication);
                    history.push("/dashboard");
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else {
            console.log("error: failed to submit application");
        }
    }

    useEffect(() => {
        if (currentAppUnit && currentAppUnit.lessor_id) {
            setCurrentAppLessorId(currentAppUnit.lessor_id);
            setCurrentAppUnitId(currentAppUnit.id);
        }
    }, [currentAppUnit]); ///watch***********

    //// Fetch & set all applications
    useEffect(() => {
        fetch("/unit_applications")
            .then((r) => r.json())
            .then((applications) => {
                setAllApplications(applications);
            });
    }, []);

    //// Current User's Applications
    useEffect(() => {
        if (user && allApplications) {
            const uApps = allApplications.filter(
                (app) =>
                    app.lessee_id === user.id ||
                    app.lessor_id === app.unit.lessor_id
            );
            setUserApplications(uApps);
        }
    }, [user, allApplications]);

    // userApplications.map((app) => {
    //   const userAppList = []
    //   const unit = allUnits.filter(unit => app.unit_id === unit.id)
    //   setUserUnits((prevState) => [...prevState, unit])
    // })

    /////////////////////////////////////////////////////////////
    /////////////////////  CURRENT USER'S UNITS  ////////////////

    useEffect(() => {
        if (user && allUnits) {
            const uUnits = allUnits.filter(
                (unit) => unit.lessor_id === user.id
            );
            setUserUnits(uUnits);
        }
    }, [allUnits, user]);

    /////////////////////////////////////////////////////////
    /////////////// Map View Helpers //////////////////////

    function llPhoneById(id) {
        fetch("/users/" + id)
            .then((r) => r.json())
            .then((user) => {
                setLlPhoneFromMapView(user.phone);
            });
    }

    ////// address to lat/long for map view

    const getCoordinates = async (address) => {
        try {
            const response = await Geocode.fromAddress(address);
            const { lat, lng } = response.results[0].geometry.location;
            return { lat, lng };
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const testAddy = "1738 brooklyn Avenue brooklyn, ny 11210";
    console.log(getCoordinates(testAddy));

    //////handle Property search //////////////////

    function updateSearch(e) {
        e.preventDefault();
        const value = e.target.value;
        console.log(value);
        setSearchState(value);
    }

    function handlePSearch(e) {
        e.preventDefault();
        const value = searchState;
        const results = allUnits.filter((unit) => unit.address.includes(value));
        setPSearchResults(results);
    }

    // useEffect(() => {
    //     if(allUnits) {
    //     setFilteredUnits(allUnits);
    //     }
    // }, [allUnits]);

    useEffect(() => {
        if (
            allUnits &
            (searchState.length === 0 ||
                searchState === "" ||
                searchState === null)
        ) {
            setFilteredUnits(allUnits);
        } else {
            const fUnits = allUnits.filter((unit) => {
                return (
                    unit.name
                        .toString()
                        .toLowerCase()
                        .includes(searchState.toLowerCase().trim()) ||
                    unit.unit_num
                        .toString()
                        .toLowerCase()
                        .includes(searchState.toLowerCase().trim()) ||
                    unit.lot
                        .toString()
                        .toLowerCase()
                        .includes(searchState.toLowerCase().trim()) ||
                    unit.street
                        .toString()
                        .toLowerCase()
                        .includes(searchState.toLowerCase().trim()) ||
                    unit.city
                        .toString()
                        .toLowerCase()
                        .includes(searchState.toLowerCase().trim()) ||
                    unit.state
                        .toString()
                        .toLowerCase()
                        .includes(searchState.toLowerCase().trim()) ||
                    unit.zip
                        .toString()
                        .toLowerCase()
                        .includes(searchState.toLowerCase().trim()) ||
                    unit.sqft
                        .toString()
                        .toLowerCase()
                        .includes(searchState.toLowerCase().trim())
                );
            });
            setFilteredUnits(fUnits);
        }
    }, [searchState, allUnits, user]);

    // need to use useEffect to set up address concatenation and set it some a state that's an array of objects with lat/long

    // useEffect(() => {
    //   console.log(allUnits)

    // },[])
    // console.log(allUnits)
    // ///////// To Convert Address to Lat/Long //////////
    // const u = allUnits[0]
    // console.log(u)

    // const address = u.lot + " " + u.street + " " + u.city + " " + u.state + " " + u.zip

    // console.log(address)
    // const addressArr = []

    // function showAddress() {
    //   var url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + 'address'
    //   fetch(url)
    //                 .then(response => response.json())
    //                 .then(data => addressArr = data)
    //                 .then(() => console.log(addressArr))
    //                 .catch(err => console.log(err))
    // }

    // function getLatLong(address) {
    //   const geocoder = new google.maps.Geocoder();
    //   geocoder.geocode({ address: address }, (results, status) => {
    //     if (status === "OK") {
    //       console.log(results[0].geometry.location.lat());
    //       console.log(results[0].geometry.location.lng());
    //     } else {
    //       alert("Geocode was not successful for the following reason: " + status);
    //     }
    //   });
    // }

    return (
        <UserContext.Provider
            value={{
                user,
                allUnits,
                userUnits,
                setUser,
                updateSearch,
                handlePSearch,
                filteredUnits,
                setFilteredUnits,
                searchState,
                currentAppUnit,
                setCurrentAppUnit,
                unitOptionsApplication,
                setUnitOptionsApplication,
                appFormUnitPrefill,
                setAppFormUnitPrefill,
                currentAppLessor,
                handleApplicationSubmit,
                unitToEdit,
                setUnitToEdit,
                unitEditPrefill,
                setUnitEditPrefill,
                userApplications,
                setUserApplications,
                selectedApplication,
                setSelectedApplication,
                handleNewUnitSubmit,
                newUnitFormData,
                setNewUnitFormData,
                myId,
                setMyId,
                handleInputChange,
                llPhoneById,
                selectedLeaseApp,
                newLeaseFormData,
                setNewLeaseFormData,
                setSelectedLeaseApp,
                allLeases,
                setAllLeases,
                userLeases,
                setUserLeases,
                selectedAppLessee,
                deleteAppById,
                deleteLeaseById,
                deleteUnitById,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
