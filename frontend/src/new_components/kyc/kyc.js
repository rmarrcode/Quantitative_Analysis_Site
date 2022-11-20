import React from 'react'

import Cookies from 'js-cookie';

// import { useNavigate } from "react-router-dom";

function KYC() {

    // let navigate = useNavigate();

    const headers = new Headers({
      "X-CSRFToken": Cookies.get('csrftoken')
    });
  
  
    const handleKyc=async(event)=>{
      // Prevent the form from doing the default html garbage
      event.preventDefault();
      // Get the form data and send info to server.
      const formData = new FormData(event.target);
      const res = await fetch("api/kyc",
      {
        method: "POST",
        headers: headers,
        body: formData
      })
      .then((res) => res.json());
      
      console.log("kyc response >>>", res.kyc_test);

      if (res.kyc_test) {
        
        alert("KYC Success")
        // navigate("/deploy", { replace: true });
    }

      else {
        alert("Kyc didn't work");
        // navigate("/signin", { replace: true });

      }
    }

  return (
    <div className="kyc">
        <h1>Know Your Customer</h1>
        <form action="api/kyc"onSubmit={handleKyc}>
            <button type="submit" class="submitButton">
                Know Your Customer
            </button>
        </form>

    </div>
    
  )
}

export default KYC;