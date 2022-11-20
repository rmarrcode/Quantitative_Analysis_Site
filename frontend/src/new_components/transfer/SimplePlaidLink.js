import React, { useCallback, useState, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
//hard code this in for now until we set up login
import Cookies from "js-cookie";


// const ALPACA_ACCOUNT_ID = "5cb7c9de-a51c-4ed8-97c2-d385c9d63f4a";

const SimplePlaidLink = () => {

    const [token, setToken] = useState(null);

    // Create the header
    const headers = new Headers({
        "X-CSRFToken": Cookies.get('csrftoken')
    }); 

    // get link_token from your server when component mounts
    useEffect(() => {
        const createLinkToken = async () => {
            // Send the request
            const response = await fetch('api/create_link_token',
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: headers
                });
            // Set the link token appropriately.
            const { link_token } = await response.json();
            setToken(link_token);
        };
        createLinkToken();
    }, []);

    const onSuccess = useCallback(async (publicToken, metadata) => {
            // send public_token to your server
            // https://plaid.com/docs/api/tokens/#token-exchange-flow
            var public_token = publicToken;
            var account_id = metadata.accounts[0].id;
            const str = JSON.stringify({
                public_token: public_token,
                account_id: account_id,
            })
            const response = await fetch('api/processor_token_create',
                {
                    method: "POST", 
                    credentials: 'include',
                    headers: headers,
                    body: str
                });
            const { processor_token } = await response.json();
            createACH(processor_token);
    }, []);      

    const { open, ready } = usePlaidLink({
        token,
        onSuccess,
    });


    const createACH = async (processor_token) => {
        const str = JSON.stringify({
            // alpaca_id: ALPACA_ACCOUNT_ID,
            processor_token: processor_token,
        })
        const response = await fetch('api/ach',
            {
                method: "POST", 
                credentials: 'include',
                headers: headers,
                body: str
            }
        )
    };

    return (
        <button onClick={() => open()} disabled={!ready}>
            Connect a bank account
        </button>
    );
};

export default SimplePlaidLink;