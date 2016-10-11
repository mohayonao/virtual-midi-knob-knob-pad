import React, { Component, PropTypes } from "react";
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

export class KnobFocusItem extends Component {
  static propTypes = {
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
  };
  static Size = 84;

  constructor(...args) {
    super(...args);

    this.state = { visible: false };
    this._timerId = 0;
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.row !== this.props.row) {
      this.setState({ visible: true });
      clearTimeout(this._timerId);
      this._timerId = setTimeout(() => {
        this.setState({ visible: false });
      }, 1000);
    }
  }

  shouldComponentUpdate(nextProp, nextState) {
    return (
      nextProp.row !== this.props.row ||
      nextState.visible !== this.state.visible
    );
  }

  render() {
    const { row, col } = this.props;

    if (row === -1 || !this.state.visible) {
      return null;
    }

    const cx = toCX(col);
    const cy = toCY(row);
    const x = cx - (KnobFocusItem.Size / 2);
    const y = cy - (KnobFocusItem.Size / 2);
    const width  = KnobFocusItem.Size;
    const height = KnobFocusItem.Size;

    return (<rect x={ x } y={ y } width={ width } height={ height } fill="transparent" stroke="#b5a2a2"/>)
  }
}
