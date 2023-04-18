import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext} from "./context.js"

function SignUpForm() {

const {setUser} = useContext(UserContext)


  const [username, setUsername] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [dob, setDob] = useState("");
  const [lot, setLot] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [photo_id, setPhoto_id] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bio, setBio] = useState("bleh");
  // const [errors, setErrors] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("hit submit")
    // setErrors([]);
    // setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        password: password,
        dob: dob,
        lot: lot,
        street: street,
        city: city,
        state: state,
        zip: zip,
        photo_id: photo_id,
        image_url: imageUrl,
        bio: bio,
      }),
    })
      .then((response) => {
        // setIsLoading(false);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      // .catch((error) => {
        // setErrors([...errors, error.message]);
        // setIsLoading(false);
      // });
  }

  return (
    
    <form onSubmit={(e)=>handleSubmit(e)}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          id="first_name"
          autoComplete="off"
          value={first_name}
          onChange={(e) => setFirst_name(e.target.value)}
        />
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          id="last_name"
          autoComplete="off"
          value={last_name}
          onChange={(e) => setLast_name(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          autoComplete="off"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <label htmlFor="password">Password Confirmation</label>
        <input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />
        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          id="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <label htmlFor="lot">Lot Number</label>
        <input
          type="text"
          id="lot"
          value={lot}
          onChange={(e) => setLot(e.target.value)}
        />
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <label htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <label htmlFor="zip">Zip Code</label>
        <input
          type="text"
          id="zip"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        <label htmlFor="photo_id">Photo ID</label>
        <input
          type="text"
          id="photo_id"
          value={photo_id}
          onChange={(e) => setPhoto_id(e.target.value)}
        />
        <label htmlFor="image_url">Image URL</label>
        <input
          type="text"
          id="image_url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <label htmlFor="bio">Bio</label>
        <i
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
          <button type="submit">
            Sign Up
          </button>
</form>
  );
}

export default SignUpForm;
