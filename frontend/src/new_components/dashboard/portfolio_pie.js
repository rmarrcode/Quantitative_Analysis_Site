import { React, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';


function MatadorPieChart(props) {
    const [selected, setSelected] = useState(0);
    const [hovered, setHovered] = useState(undefined);

    const data = props.data.map((entry, i) => {
        if (hovered === i) {
          return {
            ...entry,
            strokeWidth: 15,
            color: 'tan'
          };
        }
        return entry;
    });

    var pi_sty = {
        "padding": "40px",
        "fontSize": "8px",
        // "border": "2px solid black",
        "margin": 0,
    }

    const segments_style ={transition: 'stroke .3s', cursor: 'pointer'}  

    // TODO: Add interactiveness to this.
    return (
        <div style={pi_sty}>
        <PieChart
            data={data}
            label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
            radius={PieChart.defaultProps.radius - 2}
            lineWidth={20}
            paddingAngle={16}
            rounded
            segmentsStyle={(idx) => { return (idx === selected) ? { ...segments_style, color: 'tan', strokeWidth: 12 } : segments_style}}
            onClick={(event, index) => {
                // action('CLICK')(event, index);
                console.log('CLICK', { event, index });
                setSelected(index === selected ? undefined : index);
            }}
            onMouseOver={(_, index) => {
                setHovered(index);
            }}
            onMouseOut={() => {
                setHovered(undefined);
            }}
            animate
        />
        </div>
    )
}

export default MatadorPieChart;


