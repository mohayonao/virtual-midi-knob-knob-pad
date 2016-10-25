import React, { Component } from "react";
import Panel from "./ui/Panel";
import { toCY } from "../designer";

const FontParams = {
  fill: "#b5b5b5",
  textAnchor: "middle",
  dominantBaseline: "middle",
};

const StrokeParams = {
  stroke: "#b5b5b5",
  fill: "transparent",
  strokeWidth: 5,
};

@Panel()
export default class FacePanel extends Component {
  render() {
    const elems = [
      <rect key={ 0 } x={ 860 } y={ 90 } width={ 130 } height={ 60 } rx={ 10 } ry={ 10 } fill="#757575"/>,
      <text key={ 1 } x={ 890 } y={ toCY(0) + 48 } { ...FontParams }>User</text>,
      <text key={ 2 } x={ 960 } y={ toCY(0) + 48 } { ...FontParams }>Factory</text>,
      <path key={ 3 } d="M878,236 L890,222 L902,236" { ...StrokeParams }/>,
      <path key={ 4 } d="M948,222 L960,236 L972,222" { ...StrokeParams }/>,
      <path key={ 5 } d="M897,344 L883,356 L897,368" { ...StrokeParams }/>,
      <path key={ 6 } d="M953,344 L967,356 L953,368" { ...StrokeParams }/>,
    ];

    return (<g>{ elems }</g>);
  }
}
