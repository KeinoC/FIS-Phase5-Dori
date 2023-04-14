import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";
import { UserContext } from "./context";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const { setUser, user } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          history.push("/Home"); // navigate to dashboard component after successful login
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }


  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button variant="fill" color="primary" type="submit">
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
