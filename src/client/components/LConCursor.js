import React, { Component, PropTypes } from "react";
import { LConPadMini } from "./LConPad";
import { CursorLayout } from "../designer";

export default class LConCursor extends Component {
  static propTypes = {
    cursor       : PropTypes.arrayOf(PropTypes.number).isRequired,
    onValueChange: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProp) {
    return nextProp.cursor !== this.props.cursor;
  }

  render() {
    const { cursor } = this.props;
    const elems = cursor.map((data, index) => {
      const [ cx, cy ] = CursorLayout[index];
      const onValueChange = this.props.onValueChange.bind(null, index);
      const color = data & 0x03;

      return (
        <LConPadMini key={ index } cx={ cx } cy={ cy } data={ color } onValueChange={ onValueChange }/>
      );
    });

    return (<g className="lcon-cursor">{ elems }</g>);
  }
}
