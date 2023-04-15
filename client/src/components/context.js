import React, { useEffect, useState, createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [allUnits, setAllUnits] = useState([]);
    

    const [allApplications, setAllApplications] = useState(null);
    const [userApplications, setUserApplications] = useState(null);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [myId, setMyId] = useState("");

    const [llPhoneFromMapView, setLlPhoneFromMapView] = useState("")


    const [userUnits, setUserUnits] = useState([]);
    const [userUnitCount, setUserUnitCount] = useState(0);
    const [currentAppUnitId, setCurrentAppUnitId] = useState(null);
    const [currentAppUnit, setCurrentAppUnit] = useState(null);

    const [pSearchResults, setPSearchResults] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [searchState, setSearchState] = useState("All");
    const [filteredUnits, setFilteredUnits] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [currentAppLessorId, setCurrentAppLessorId] = useState(
        currentAppUnit ? currentAppUnit.lessor_id : ""
    );

    const [newUnitFormData, setNewUnitFormData] = useState({
        lessor_id: myId ? myId : "",
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

    const [unitOptionsApplication, setUnitOptionsApplication] = useState(true);

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
                r.json().then((units) => {
                    setAllUnits(units);
                    if (user && allUnits) {
                        const uUnits = units.filter(unit => unit.lessor_id === user.id);
                        setUserUnits(uUnits);
                        setUserUnitCount(uUnits.length);
                    }
                });
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
        const updated = { ...newUnitFormData, [name]: value }
        setNewUnitFormData(updated)
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
    }, [user]);

    //// Current User's Applications
    useEffect(() => {
        if (user && allApplications) {
            const uApps = allApplications.filter(
                (app) => app.lessee_id === user.id || app.lessor_id === user.id
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
            setUserUnitCount(uUnits.length);
        }
    }, [user, allUnits]);

    ///// User Counts!!

    useEffect(() => {
        if (userUnits) {
            console.log(userUnits);
            const uLength = userUnits.length;
            console.log(uLength);
            setUserUnitCount(uLength);
        }

    }, [allUnits, user]);


/////////////// Map View Helpers //////////////////////

function llPhoneById(id) {
    fetch("/users/" + id)
        .then((r) => r.json())
        .then((user) => {
            setLlPhoneFromMapView(user.phone)
        });
}










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

    console.log(filteredUnits)
    console.log(allUnits)

    useEffect(() => {
        if (allUnits & (searchState.length === 0 || searchState === "" || searchState === null)) {
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
                
        

            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
