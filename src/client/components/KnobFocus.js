import React, { Component, PropTypes } from "react";
import VolatileSurface from "./ui/VolatileSurface";
import { toCX, toCY } from "../designer";

export default class KnobFocus extends Component {
  static propTypes = {
    knob: PropTypes.arrayOf(PropTypes.number).isRequired,
  };

  shouldComponentUpdate(nextProp) {
    return nextProp.knob !== this.props.knob;
  }

  render() {
    const { knob } = this.props;
    const elems = knob.map((row, col) => {
      return (<KnobFocusItem key={ col } row={ row } col={ col }/>);
    });

    return (<g>{ elems }</g>);
  }
}

export class KnobFocusItem extends VolatileSurface {
  static propTypes = {
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
  };
  static size = 84;

  shouldComponentUpdate(nextProps) {
    return nextProps.row !== this.props.row;
  }

  renderChild() {
    const { row, col } = this.props;

    if (row === -1) {
      return null;
    }

    const cx = toCX(col);
    const cy = toCY(row);
    const x = cx - (KnobFocusItem.size / 2);
    const y = cy - (KnobFocusItem.size / 2);
    const width  = KnobFocusItem.size;
    const height = KnobFocusItem.size;

    return (<rect x={ x } y={ y } width={ width } height={ height } fill="transparent" stroke="#b5a2a2"/>)
  }
}
