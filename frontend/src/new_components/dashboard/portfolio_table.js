import DataTable from 'react-data-table-component';

// A super simple expandable component.
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

const columns = [
    {
        name: 'Portfolio',
        selector: row => row.portfolio_id,
    },
    {
        name: 'Equity Invested ($)',
        selector: row => row.usd_invested,
    },
    {
        name: '% of Portfolio',
        selector: row => row.p_invested
    }
];

const sub_columns = [
    {
        name: 'Stock',
        selector: row => row.ticker
    },
    {
        name: 'Price',
        selector: row => row.price
    }
]
// Eventually replace this with not dummy data.
const data = [
    {
        portfolio_id: 1,
        usd_invested: 30.3,
        p_invested: 5,
        stocks: [
            {ticker: "BAC", price: "$40.34"},
            {ticker: "XOM", price: "$69.72"},
            {ticker: "SPY", price: "$135.55"},
        ],
    },
    {
        portfolio_id: 2,
        usd_invested: 400.3,
        p_invested: 66,
        stocks: [
            {ticker: "F", price: "$2.55"},
            {ticker: "AAPL", price: "$111.11"},
            {ticker: "TSLA", price: "$1089.99"},
        ],
    },
]

function PortfolioDecomposition({ data }) {
    var stocks = data.stocks;
    // TODO: Add styling
    // const customStyles = {
    //     rows: {
    //         style: {
    //             textAlign: 'right'
    //         },
    //     },
    //     headCells: {
    //         style: {
    //             textAlign: 'right'
    //         },
    //     },
    //     cells: {
    //         style: {
    //             textAlign: 'right',
    //             marginRight: 0
    //         },
    //     },
    // };
    return (
        <DataTable
            columns={sub_columns}
            data={stocks}
            // customStyles={customStyles}
        />
    )
}

function PortfolioTable() {
    return (
        <div style={{margin: 0}}>
        <div style={{margin: "10px", border: "2px solid black", borderRadius: "0.5rem"}}>
        <DataTable
            columns={columns}
            data={data}
            expandableRows
            expandableRowsComponent={PortfolioDecomposition}
        />
        </div>
        </div>
    );
};

export default PortfolioTable