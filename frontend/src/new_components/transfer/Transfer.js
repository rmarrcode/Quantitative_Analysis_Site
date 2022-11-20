import { React, useState } from 'react';
import Cookies from 'js-cookie';

//hard code this in for now until we set up login
// const ALPACA_ACCOUNT_ID = "5cb7c9de-a51c-4ed8-97c2-d385c9d63f4a"

const Transfer = () => {
    
    const [textValue, setTextValue] = useState("");

    const onClick = async (direction) => {
        const headers = new Headers({
            "X-CSRFToken": Cookies.get('csrftoken')
        });
        const str = JSON.stringify({
            // alpaca_id: ALPACA_ACCOUNT_ID,
            transfer_type: "ach",
            amount: textValue,
            direction: direction 
        })
        const response = await fetch('api/transfer',
            {
                method: "POST", 
                credentials: 'include',
                headers: headers,
                body: str
            });
    };

    const handleChange = (e) => {
        setTextValue(e.target.value)
    };

    return (
        <div className="ui container" style={{ margin: "10px" }}>
        <button onClick={() => onClick("INCOMING")} > Deposit</button>
        <button onClick={()=>onClick("OUTGOING")} > Withdrawal</button>
        <input
        type="text"
        placeholder="enter dollar amount (ex: 15.00)"
        value={textValue}
        onChange={handleChange}
        />
        </div>
    )
};

export default Transfer;
