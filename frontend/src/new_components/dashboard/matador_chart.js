import ResizableBox from "./resizable_box";
import useDemoConfig from "./useDemoConfig.tsx";
import React from "react";
import { AxisOptions, Chart } from "react-charts";
import { JSONTree } from "react-json-tree";

export default function MatadorMoneyPlot() {
    const [{ clicked, focused }, setState] = React.useState({
        clicked: null,
        focused: null,
    });

    const { data, interactionMode, elementType, randomizeData, Options } =
        useDemoConfig({
            series: 4,
            show: ["elementType", "interactionMode"],
    });

    const primaryAxis = React.useMemo(
        () => ({
            getValue: (datum) => datum.primary,
        }),
        []
    );

    const secondaryAxes = React.useMemo(
        () => [
            {
            getValue: (datum) => datum.secondary,
            elementType: 'area',
            },
        ],
        []
    );

    return (
        <ResizableBox>
        <Chart
            options={{
            data,
            interactionMode,
            primaryAxis,
            secondaryAxes,
            showVoronoi: true,
            // onClickDatum: (datum) => {
            //     if (datum) setState((old) => ({ ...old, clicked: datum}));
            // },
            // onFocusDatum: (datum) => {
            //     if (datum) setState((old) => ({ ...old, focused: datum }));
            // },
            }}
        />
        {/* </div> */}
        </ResizableBox>
        //{/* <br /> */}
        //{/* <div>Focused Datum:</div>
        //<JSONTree hideRoot data={focused} />
        //<div>Clicked Datum:</div>
        //<JSONTree hideRoot data={clicked} /> */}
    );
}