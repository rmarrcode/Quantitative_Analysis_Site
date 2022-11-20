



function UserEquity() { 
    // TODO: Get this value from alpaca.
    var money = 30571.34;
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    var money_str = formatter.format(money);

    const style = {
        "color": "white",
        "backgroundColor": "black",
        "padding": "5px",
        "textAlign": "right",
        "margin": "-2px",
        "borderRadius": "0.5rem 0.5rem 0 0",
        // "marginLeft": "auto",
        // "marginRight": "0"
    }
    return (
        <div style={style}>
            <h3>{money_str}&nbsp;</h3>
        </div>
        
    )
}

export default UserEquity;