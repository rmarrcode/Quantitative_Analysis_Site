import React, { useState, useEffect, Component } from "react";

import './console.css';
import SITE_IP from '../constants.js'

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

  useEffect(() => {
    const sockUrl = 'ws://127.0.0.1:8000/ws/expstate/';
    const updatesSocket = new WebSocket(sockUrl);
    updatesSocket.onopen = () => {
      console.log("socket is opened")                             
    }
    updatesSocket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        console.log(data);
    }; 
    updatesSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    };
  }, []);

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

  async function deploy() {
    var data = {
      'op': 'deploy',
      'branch': formBranch,
      'alg': formAlg,
      'tickers': formTickers,
      'startDate': formStartDate,
      'endDate': formEndDate,
    }
    var requestOptions = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      redirect: 'follow'
    };
    fetch("api/deploy", requestOptions)
      .then(response => response.text())
      .then(result => setPastEvents(JSON.parse(result).data))
      .catch(error => console.log('error', error))
  };


  function updateExperimentData(id, result) {
    var newObj= {};
    newObj[id] = result;
    setExperimentData(olddata => ({
      ...olddata,
      ...newObj})
    )
  }

  async function getExperimentData(id) {
    var raw = JSON.stringify({
      "op": "getexperimentdata",
      "id": id
    });
    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: raw,
      redirect: 'follow'
    };
    
    fetch("api/getExperimentData", requestOptions)
      .then(response => response.text())
      .then(result => updateExperimentData(id, result))
      .catch(error => console.log('error', error));
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

  return (
    <div class="row">
      <div class="column">
        <h1>Stock Selector</h1>
        <form>
          <label>
            alg:
            <select name="alg" id="alg" form="alg" onChange={x => setFormAlg(x.target.value)}>
              <option value="">-----</option>
              <option value="JAXSLAC">JAXSLAC</option>
              <option value="AEJAXSAC">AEJAXSAC</option>
              <option value="VAEJAXSAC">VAEJAXSAC</option>
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
        </form>
        <button onClick={deploy}>Submit Now</button>  
      </div>
        
      {/* <div class="column">
        <h1>PAST EVENTS</h1>
        {pastEvents.map(element => {
          return (
            <div>
              <tr><td>
                <p>{element}</p> 
                {
                  element in experimentData ? 
                  <p>{experimentData[element]}</p> : 
                  <button onClick={x => getExperimentData(element)}>details</button>
                }
              </td></tr>
            </div>
          );
        })}
      </div> */}
    </div>
  );
  return (
    <div>
      <h1>PAST EVENTS</h1>
    </div> 
  )
}

export default Console;