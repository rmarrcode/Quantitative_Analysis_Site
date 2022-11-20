import React from "react";
import ProtectedRoute from "../auth/ProtectedRoute";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Local imports
import UserEquity from "./equity";
import PortfolioTable from "./portfolio_table";
import MatadorPieChart from "./portfolio_pie";
import MatadorMoneyPlot from "./matador_chart";

const MatadorDashboard = () => {
  const data_mock = [
    { title: 'One', value: 20, color: '#D7A1F9' },
    { title: 'Two', value: 30, color: '#B24BF3' },
    { title: 'Three', value: 100, color: '#7921B1' },
  ];

  var row_sty = {
    flexGrow: 1,
    flex: 1,
    height: "100%", 
    margin: "-1px", 
    padding: "0px",
    overflow: "hidden" 
  };

  var col_sty = {
    margin: "10px", 
    padding: "0px", 
    border: "2px solid black", 
    borderRadius: "0.5rem"
  }
  
  return (
    // Make the dashboard protected so you have to be signed in in order to access these pages.
    <ProtectedRoute>
    <Container style={{margin: "auto", marginTop: "3%", display: "flex", flex: 1, flexDirection: "column", padding: "0px"}} className='dashboard' fluid={"md"}>
      {/* <Row style={row_sty}>
        <Col style={col_sty} >
          <UserEquity/>
          <MatadorPieChart style={{}} data={data_mock}/>
        </Col>
        <Col style={{width: "65%", ...col_sty}} xs={'auto'}>
          <MatadorMoneyPlot/>
        </Col>
      </Row>
      <Row style={row_sty}>
        <Col style={col_sty}>
          <PortfolioTable/>
        </Col>
        <Col style={{width: "65%", ...col_sty}}  xs={'auto'}>
          <div style={{"margin": "10px"}}>
            <h3>TODO: About your portfolio</h3>
          </div>
        </Col>
      </Row> */}
    </Container>
    </ProtectedRoute>
  );
}

export default MatadorDashboard;