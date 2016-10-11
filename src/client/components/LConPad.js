import React, { Component, PropTypes } from "react";

export default class LConPad extends Component {
  static propTypes = {
    cx           : PropTypes.number.isRequired,
    cy           : PropTypes.number.isRequired,
    data         : PropTypes.number.isRequired,
    onValueChange: PropTypes.func.isRequired,
  };

  constructor(...args) {
    super(...args);

    this._focus = false;
    this._events = {
      "onMouseDown" : ::this.onMouseDown,
      "onMouseUp"   : ::this.onMouseUp,
      "onMouseOut"  : ::this.onMouseOut,
      "onTouchStart": ::this.onTouchStart,
      "onTouchEnd"  : ::this.onTouchEnd,
    };
  }

  shouldComponentUpdate(nextProp) {
    return nextProp.data !== this.props.data;
  }

  onMouseDown() {
    this._focus = true;
    this.props.onValueChange(0x7f);
  }

  onMouseUp() {
    this._focus = false;
    this.props.onValueChange(0x00);
  }

  onMouseOut() {
    if (this._focus) {
      this.onMouseUp();
    }
  }

  onTouchStart() {
    this.onMouseDown();
  }

  onTouchEnd() {
    this.onMouseUp();
  }

  render() {
    return (
      <g className="lpad-pad" { ...this._events }>
        { this.renderChild() }
      </g>
    );
  }

  renderChildren() {
    return null;
  }
}

const CommonProps = {
  rx: 10,
  ry: 10,
  stroke: "#050504",
  strokeWidth: 1,
};

export class LConPadRect extends LConPad {
  static Size = 84;

  renderChild() {
    const { cx, cy, data } = this.props;
    const x = cx - (LConPadRect.Size / 2);
    const y = cy - (LConPadRect.Size / 2);
    const width  = LConPadRect.Size;
    const height = LConPadRect.Size;
    const color = ((data & 0x30) >> 2) + (data & 0x03);
    const fill = `url(#led${ color })`;

    return (
      <rect x={ x } y={ y } width={ width } height={ height } fill={ fill } { ...CommonProps }/>
    );
  }
}

export class LConPadMini extends LConPad {
  static Size = 48;

  renderChild() {
    const { cx, cy, data } = this.props;
    const x = cx - (LConPadMini.Size / 2);
    const y = cy - (LConPadMini.Size / 2);
    const width  = LConPadMini.Size;
    const height = LConPadMini.Size;
    const fill = `url(#led${ data })`;

    return (
      <rect x={ x } y={ y } width={ width } height={ height } fill={ fill } { ...CommonProps }/>
    );
  }
}
