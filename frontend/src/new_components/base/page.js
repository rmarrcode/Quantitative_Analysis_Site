import MatadorNavBar from "./navbar";
import MatadorFooter from "./footer";
import React from "react";

// Wrapper class for Matador Pages. Will add NavBar + footer to every page automatically.
function MatadorPage({ children }) {
    // TODO: Abstract the styling back to the CSS.
    return (
        <div style={{"display": "flex", "flexDirection": "column", "flexFlow": "column nowrap", "height": "100vh"}}>
        <MatadorNavBar/>
        <div style={{ "flexGrow": "1" }}>{ children }</div>
        <MatadorFooter/>
        </div>
    )
}

export default MatadorPage;