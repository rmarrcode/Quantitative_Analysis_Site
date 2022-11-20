import React from 'react'
import './Info.css';

import { useNavigate } from "react-router-dom";

function Info() {

  const navigate = useNavigate();

  return (

    <div className="info">

      <h1>Quantitative finance  <br/>
      for everyone.</h1>

        <h2>A machine learning-based fintech company <br/>
            specializing in developing omni-market <br/>
            algorithmic trading solutions.
        </h2>

        <button onClick={() => navigate("/signup")}className="info__signup">Sign Up</button>


       
    </div>

  )
}

export default Info