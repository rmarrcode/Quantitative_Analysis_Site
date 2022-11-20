import React from 'react'

import "./Strategy.css";


function Strategy() {
    
  return (
        <div class="strategy__graph">

                <div class="charts-container cf">
                <div class="chart" id="graph-1-container">
                    <h2 class="title">Cumulative Matador Returns</h2>
                    <div class="chart-svg">
                    <svg class="chart-line" id="chart-1" viewBox="0 0 80 40">
                        
                    </svg>
                    <h3 class="valueX">time</h3>
                    </div>
                    <div class="chart-values">
                    <p class="h-value">1689h</p>
                    <p class="percentage-value"></p>
                    <p class="total-gain"></p>
                    </div>
                    <div class="triangle green"></div>
                </div>
                <div class="chart" id="graph-2-container">
                    <h2 class="title">Cumulative SP 500 Returns</h2>
                    <div class="chart-svg">
                    <svg class="chart-line" id="chart-2" viewBox="0 0 80 40">
                    </svg>
                    <h3 class="valueX">time</h3>
                    </div>
                    <div class="chart-values">
                    <p class="h-value">322h</p>
                    <p class="percentage-value"></p>
                    <p class="total-gain"></p>
                    </div>
                    <div class="triangle red"></div>
                </div>
                <div class="chart circle" id="circle-1">
                    <h2 class="title">Matador Annual Metrics</h2>
                    <div class="chart-svg align-center">
                    <h2 class="circle-percentage"></h2>
                    <svg class="chart-circle" id="chart-3" width="50%" viewBox="0 0 100 100">
                        <path class="underlay" d="M5,50 A45,45,0 1 1 95,50 A45,45,0 1 1 5,50" />
                    </svg>
                    </div>
                    <div class="triangle green"></div>
                </div>
                <div class="chart circle" id="circle-2">
                    <h2 class="title">SP 500 Annual Metrics</h2>
                    <div class="chart-svg align-center">
                    <h2 class="circle-percentage"></h2>
                    <svg class="chart-circle" id="chart-4" width="50%" viewBox="0 0 100 100">
                        <path class="underlay" d="M5,50 A45,45,0 1 1 95,50 A45,45,0 1 1 5,50" />
                    </svg>
                    </div>
                    <div class="triangle red"></div>
                </div>
                </div>

                <div class="heartIt">
                <p>If you like it - use it</p>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/176026/heart292_(1).png" alt="heart this pen" />
                <p>Thanks!</p>

                </div>
    </div>

  )
}

export default Strategy