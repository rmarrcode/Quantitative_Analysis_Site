// import React, { useState, useEffect } from 'react';
// // import { Line } from "react-chartjs-2";
// import numeral from "numeral";

// // import 'chart.js/auto';
// // import 'chartjs-adapter-date-fns';

// import "./Graph.css";

// const options = {
//   legend: {
//     display: true,
//   },
//   elements: {
//     point: {
//       radius: 0,
//     },
//   },
//   maintainAspectRatio: false,
//   tooltips: {
//     mode: "index",
//     intersect: false,
//     callbacks: {
//       label: function (tooltipItem, data) {
//         return numeral(tooltipItem.value).format("+0,0");
//       },
//     },
//   },
//   scales: {
//     xAxes: [
//       {
//         type: "time",
//         display: false,
//         time: {
//           format: "MM/DD/YY",
//           tooltipFormat: "ll",
//         },
//       },
//     ],
//     yAxes: [
//       {
//         gridLines: {
//           display: false,
//         },
//         ticks: {
//           // Include a dollar sign in the ticks
//           callback: function (value, index, values) {
//             return numeral(value).format("0a");
//           },
//         },
//       },
//     ],
//   },
// };


// const buildChartData = (data, casesType) => {
//     let chartData = [];
//     let lastDataPoint;
//     for (let date in data.cases) {
//       if (lastDataPoint) {
//         let newDataPoint = {
//           x: date,
//           y: data[casesType][date] - lastDataPoint,
//         };
//         chartData.push(newDataPoint);
//       }
//       lastDataPoint = data[casesType][date];
//     }
//     console.log("data for chart >>>", data)
//     return chartData;
//   };
  
  


// function Strategy({ casesType='cases' }) {

//     const [data, setData] = useState({});


//     useEffect(() => {
//         const fetchData = async () => {
//           await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
//             .then((response) => {
//               return response.json();
//             })
//             .then((data) => {
//               let chartData = buildChartData(data, casesType);
//               setData(chartData);
//               // buildChart(chartData);
//             });
//         };
    
//         fetchData();
//       }, [casesType]);
    
    
//   return (

        
//         <div class="strategy__graph">
//             {data?.length > 0 && (
//         <Line
//           data={{
//             datasets: [
//               {
//                 backgroundColor: "#3cb371",
//                 borderColor: "#00ff00",
//                 data: data,
//                 label: "Cumulative Returns Matador vs. S&P 500"
//               },
//             ],
//           }}
//           options={options}
//         />
//       )}

//         </div>
//   )
// }

// export default Strategy