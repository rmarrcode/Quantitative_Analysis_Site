import React from 'react';
import "./Header.css";

import { useNavigate } from "react-router-dom";

function Header() {

    const navigate = useNavigate();
    
    return ( 
    <div className="nav__header">
        <div className="nav__header__left">
        <img className="App-logo"
                src = "https://img.favpng.com/22/19/17/benny-the-bull-image-nickelodeon-television-show-character-png-favpng-77jm2QAv0R824kqP9zujRbghq.jpg" 
                alt="logo"
            />
            <h1>Matador</h1>
        </div>
        <div className="nav__header__middle">
            
            <div className="nav__header__option">
                <a>About Us</a>
            </div>
    
            <div className="nav__header__option">
                <a>Stategies</a>
            </div>

            <div className="nav__header__option">
                <a>Team</a>
            </div>
        </div>

        <div className="nav__header__right">

            <div onClick={() => navigate("/signin")} className="nav__header__signin">
                <a>Sign In</a>
            </div>

            <button onClick={() => navigate("/signup")} className="nav__header__signup">Sign Up</button>

        </div>
        
    
    </div>
    );
}

export default Header;