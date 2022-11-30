import React, { useState, useEffect } from "react";

import './console.css';

function Console() {

  const [allBranches, setAllBranches] = useState([])
  const [message, setMessage] = useState('');
  const [pastEvents, setPastEvents] = useState([]);
  const [formBranch, setFormBranch] = useState('');
  const [formAlg, setFormAlg] = useState('');
  const [formTickers, setFormTickers] = useState('');
  const [formStartDate, setFormStartDate] = useState('');
  const [formEndDate, setFormEndDate] = useState('');
  const [experimentData, setExperimentData] = useState({})

  const getAllBranches = async event => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch("api/getbranches", requestOptions)
      .then(response => response.text())
      .then(result => setAllBranches(JSON.parse(result)['ec2 data']))
      .catch(error => console.log('error', error))
  }

  const deploy = async => {
    var data = {
      'op': 'deploy',
      'branch': formBranch,
      'alg': formAlg,
      'tickers': formTickers,
      'startDate': formStartDate,
      'endDate': formEndDate,
    }
    console.log(data)
    var requestOptions = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    };
    fetch("api/deploy", requestOptions)
      .then(response => response.text())
      .then(result => setPastEvents(JSON.parse(result).data))
      .catch(error => console.log('error', error))
  };


  const addExperimentData = (experimentData, experiment, data) => {
    const val = experimentData
    val[experiment] = data
    return val
  }

  //const getExperimentData (id) = async event => {
  async function getExperimentData(id) {
    var data = {
      'op': 'getexperimentdata',
      'id': id,
    }
    var requestOptions = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    };
    fetch("api/getExperimentData", requestOptions)
      .then(response => console.log(response.text()))
      .then(result => console.log(JSON.parse(result).data))
      .catch(error => console.log('error', error))
  }

  const makeTable = array => {
    var table = document.createElement('table');
    for (var i = 0; i < array.length; i++) {
        var row = document.createElement('tr');
        row.appendChild(array[i]);
        table.appendChild(row);
    }
    return table;
  }

  useEffect(() => {
    getAllBranches()
  }, []);

  console.log(experimentData)

  return (
    <div class="row">

      <div class="column">
        <h1>Stock Selector</h1>
        <form>
          <label>
            branch:
            <select name="alg" id="alg" form="alg" onChange={x => setFormBranch(x.target.value)}>
            {
              allBranches.map(row => {
                return (<option value={row}>{row}</option>)
            })}
            </select>
          </label>
          <br/>
          <label>
            alg:
            <select name="alg" id="alg" form="alg" onChange={x => setFormAlg(x.target.value)}>
              <option value="">-----</option>
              <option value="JAXSLAC">JAXSLAC</option>
              <option value="SAC">SAC</option>
              <option value="SLAC">SLAC</option>
            </select>
          </label>
          <br/>
          <label>
            tickers:
            <input 
              type="text"
              value={formTickers}
              onChange={(e) => setFormTickers(e.target.value)}
            />
          </label>   
          <br/>
          <label>
            start date:
            <input 
              type="text"
              value={formStartDate}
              onChange={(e) => setFormStartDate(e.target.value)}
            />
          </label>       
          <br/>
          <label>
            end date:
            <input 
              type="text"
              value={formEndDate}
              onChange={(e) => setFormEndDate(e.target.value)}
            />
          </label>      
        </form>
        <button onClick={deploy}>Submit Now</button>  
      </div>
        
      <div class="column">
        <h1>PAST EVENTS</h1>
        {pastEvents.map(element => {
          return (
            <div>
              <tr><td>
                <p>{element}</p>
                  {
                    element in experimentData ? 
                    <p>experimentData[element]</p> : 
                    <button onClick={x => getExperimentData(element)}>details</button>
                  }
              </td></tr>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}

export default Console;