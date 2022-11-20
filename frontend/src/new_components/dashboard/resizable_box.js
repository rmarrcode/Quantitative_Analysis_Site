import React from "react";
import { ResizableBox as ReactResizableBox } from "react-resizable";

import "react-resizable/css/styles.css";

export default function ResizableBox({
  children,
  resizable = false,
  style = {},
  className = "",
}) {
  return (
      <div
        style={{
          width: "100%",
          height: "100%",
          textAlign: "center",
          ...style,
        }}
      >
        <h5>My Portfolio Returns</h5>
        <div
        style={{
            // paddingBottom: "0px",
            // top: "0px",
            margin: 'auto',
            height: "90%",
            width: "95%"
            // boxSizing: "border-box",
        }}
        className={className}
        >
        {children}
        </div>
      </div>
  );
}