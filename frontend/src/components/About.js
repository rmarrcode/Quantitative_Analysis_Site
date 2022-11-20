import React from 'react'
// import HomeIcon from '@material-ui/icons/Home';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import EngineeringIcon from '@mui/icons-material/Engineering';
import GrassIcon from '@mui/icons-material/Grass';


import "./About.css"

function About() {
  return (
    <div class="about__body">
        <div class="example__graph">
            <img src='https://thumbs.dreamstime.com/b/business-chart-going-up-4658301.jpg' alt="success graph"/>
        </div>
        <div className="story story1">
            <div className="about__icon">
                <ElectricBoltIcon fontSize="inherit" />
            </div>
            <h1>Simple</h1>
            <h2>dsahfkjdsafjkh kfahdsakhfkjadh askdhfkdsafkjhsaf kdsahfkjdsa</h2>
        </div>
        <div className="story story2">
            <div className="about__icon">
                <EngineeringIcon fontSize="inherit"/>
            </div>
            <h1>Effective</h1>
            <h2>dsahfkjdsafjkh kfahdsakhfkjadh askdhfkdsafkjhsaf kdsahfkjdsa</h2>
        </div>
        <div className="story story3">
            <div className="about__icon">
                <GrassIcon fontSize="inherit" />
            </div>
            <h1>Sustainable</h1>
            <h2>dsahfkjdsafjkh kfahdsakhfkjadh askdhfkdsafkjhsaf kdsahfkjdsa</h2>
        </div>
    </div>
  )
}

export default About