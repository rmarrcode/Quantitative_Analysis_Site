import { React } from "react";
// import CSRFToken from "../misc/csrftoken";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';

function MatadorSignUp() {

    let navigate = useNavigate();

    const headers = new Headers({
      "X-CSRFToken": Cookies.get('csrftoken')
    });
  
  
    const handleSignup=async(event)=>{
      // Prevent the form from doing the default html garbage
      event.preventDefault();
      // Get the form data and send info to server.
      const formData = new FormData(event.target);
      const res = await fetch("api/signupUser",
      {
        method: "POST",
        headers: headers,
        body: formData
      })
      
      console.log("signup response >>>", res);

      if (res) {
        alert("An email verification link has been sent to your email.");
        navigate("/signin", { replace: true });
    }

      else {
        alert("Sign up didn't work");
        navigate("/landing", { replace: true });

      }

    }

  return (
    <div class='authform'>
          <h1>Matador</h1>
          <p>Create an Account</p>
          <form method="post" action="api/signupUser" onSubmit={handleSignup}>
            <div class="form-group inputWrapper">
              <label for="fname">First Name</label>
              <input class="form-control" id="fname" name="fname" type="text" required />
            </div>

            <div class="form-group inputWrapper">
              <label for="lname">Last Name</label>
              <input class="form-control" id="lname" name="lname" type="text" required />
            </div>

            <div class="form-group inputWrapper">
              <label for="username">Username</label>
              <input class="form-control" id="username" name="username" type="text" required />
            </div>

            <div class="form-group inputWrapper">
              <label for="email">E-mail</label>
              <input class="form-control" id="email" name="email" type="email" required />
            </div>

            <div class="form-group inputWrapper">
              <label for="password1">Password</label>
              <input class="form-control" id="password1" name="password1" type="password" required />
            </div>

            <div class="form-group inputWrapper">
              <label for="password2">Confirm password</label>
              <input class="form-control" id="password2" name="password2" type="password" required />
            </div>

            <Button style={{"margin-top": "10px"}} type="submit" variant="outline-dark">
              Sign Up
            </Button>
          </form>
        </div>
  );
}

export default MatadorSignUp;
