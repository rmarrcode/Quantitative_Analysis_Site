import { React } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from './useAuth';
import Button from 'react-bootstrap/Button';

import Cookies from 'js-cookie';

import '../matador_components.css';

const SignIn = () => {

  let navigate = useNavigate();

  const { signinFrontend } = useAuth();
  
  const headers = new Headers({
    "X-CSRFToken": Cookies.get('csrftoken')
  }); 

  const handleSignin = async (event) => {
    // Prevent the form from doing the default html garbage
    event.preventDefault();
    // Get the form data and send signin req to server.
    const formData = new FormData(event.target);
    const response = await fetch("api/signinUser",
      {
        method: "POST",
        headers: headers,
        body: formData
      });

    const apiResponse  = await response.json();

    console.log("Response:", apiResponse)
    // Check if the login succeeded
    if (apiResponse.auth) {
      signinFrontend({
        username: formData.get("username"),
        password: formData.get("password")
      });
    }
    
  };

  return (
      <div className='authform'>
      <h1>Quantitative-Analysis-Site</h1>
      <p>Sign in to Your Account</p>
      <form onSubmit={handleSignin}>

        <div class="form-group inputWrapper">
          <label for="username">Username</label>
          <input class="form-control" id="username" name="username" type="text" required />
        </div>

        <div class="form-group inputWrapper">
          <label for="password1">Password</label>
          <input class="form-control" id="password" name="password" type="password" required />
        </div>
        <Button style={{"margin-top": "10px"}} type="submit" variant="outline-dark">
          Sign In
        </Button>
      </form>
      </div>
  );
}

export default SignIn;