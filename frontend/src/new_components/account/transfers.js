import React from "react";

import SimplePlaidLink from "../transfer/SimplePlaidLink";
import Transfer from "../transfer/Transfer";
import FundingInfo from "../transfer/FundingInfo";

function MatadorTransfers() {
    return (
        <div>
            <SimplePlaidLink/>
            <Transfer/>
            <FundingInfo/>
        </div>
    )
}

export default MatadorTransfers;