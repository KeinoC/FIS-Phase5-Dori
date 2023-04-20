import { useState, useContext } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import {UserContext} from "../components/context"
import "../../src/components/LoginSignUpForm.css";





function Login() {
  const [showLogin, setShowLogin] = useState(true);

  
  return (
    <div className = "login-page">
      <div className="login-card">
      {showLogin ? 
      <div className="sign-card">
          <LoginForm setShowLogin={setShowLogin} showLogin={showLogin} />
          
</div>
:
<div className="sign-card">
          <SignUpForm setShowLogin={setShowLogin} showLogin={showLogin} />
      </div>
      }
    </div>
    </div>
  );
}

export default Login;
