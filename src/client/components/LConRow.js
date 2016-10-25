import React, { Component, PropTypes } from "react";
import LConKnob from "./LConKnob";
import LConPadRect from "./LConPadRect";
import { toCX, toCY } from "../designer";

export default class LConRow extends Component {
  static propTypes = {
    row          : PropTypes.number.isRequired,
    data         : PropTypes.arrayOf(PropTypes.number).isRequired,
    onValueChange: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProp) {
    return nextProp.data !== this.props.data;
  }

  render() {
    const { row, data } = this.props;
    const elems = data.map((colData, col) => {
      const cx = toCX(col);
      const cy = toCY(row);
      const onValueChange = this.props.onValueChange.bind(null, col);
      const LConCol = row === 2 ? LConPadRect : LConKnob;

      if (row === 2) {
        colData = ((colData & 0x30) >> 2) + (colData & 0x03);
      }

      return (
        <LConCol key={ col } cx={ cx } cy={ cy } data={ colData } onValueChange={ onValueChange }/>
      );
    });

    return (<g className="lcon-row">{ elems }</g>);
  }
}
