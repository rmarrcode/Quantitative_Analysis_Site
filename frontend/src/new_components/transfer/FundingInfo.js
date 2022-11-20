import React, { useCallback, useState, useEffect } from "react";
import Cookies from 'js-cookie';

const FundingInfo = () => {

    const [text, setText] = useState("");

    useEffect(()=>{
        const getInfo = async () => {
            const headers = new Headers({
                "X-CSRFToken": Cookies.get('csrftoken')
            });
            const response = await fetch('api/funding_info',
                {
                    method: "GET", 
                    credentials: 'include',
                    headers: headers,
                });
            const {last_equity} =  await response.json()
            const info = "Current funding: $" + last_equity
            setText(info)
        }
        getInfo()
    }, [])

    return (
        <div className="ui container" style={{ margin: "10px" }}>
        {text}
        </div>
    )
};

export default FundingInfo;
