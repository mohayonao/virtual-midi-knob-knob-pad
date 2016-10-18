import React, { Component, PropTypes } from "react";
import { clamp, linlin } from "../../common/utils";

export default class LConKnob extends Component {
  static propTypes = {
    cx           : PropTypes.number.isRequired,
    cy           : PropTypes.number.isRequired,
    data         : PropTypes.number.isRequired,
    onValueChange: PropTypes.func.isRequired,
  };

  constructor(...args) {
    super(...args);

    this.state = { focus: false };

    this._events = {
      "onMouseDown" : ::this.onMouseDown,
      "onMouseMove" : ::this.onMouseMove,
      "onMouseUp"   : ::this.onMouseUp,
      "onMouseOut"  : ::this.onMouseOut,
      "onTouchStart": ::this.onTouchStart,
      "onTouchMove" : ::this.onTouchMove,
      "onTouchEnd"  : ::this.onTouchEnd,
    };
  }

  shouldComponentUpdate(nextProp, nextState) {
    return (
      nextProp.data !== this.props.data ||
      nextState.focus !== this.state.focus
    );
  }

  onMouseDown(e) {
    const value = this.computeValue(e.nativeEvent);

    this.props.onValueChange(value);
    this.setState({ focus: true });
  }

  onMouseMove(e) {
    if (this.state.focus) {
      const value = this.computeValue(e.nativeEvent);

      if (Math.abs(value - this.props.data) < 16) {
        this.props.onValueChange(value);
      }
    }
  }

  onMouseUp() {
    this.setState({ focus: false });
  }

  onMouseOut() {
    this.onMouseUp();
  }

  onTouchStart(e) {
    this.onMouseDown(e);
  }

  onTouchMove(e) {
    this.onMouseMove(e);
  }

  onTouchEnd() {
    this.onMouseUp();
  }

  computeValue(e) {
    const svg = e.target.ownerSVGElement;
    const pt  = svg.createSVGPoint();

    pt.x = e.targetTouches ? e.targetTouches[0].clientX : e.clientX;
    pt.y = e.targetTouches ? e.targetTouches[0].clientY : e.clientY;

    const { cx, cy } = this.props;
    const {  x,  y } = pt.matrixTransform(svg.getScreenCTM().inverse());

    const x1 = x - cx;
    const y1 = y - cy;
    const rad = Math.atan2(y1, x1);
    const deg = rad * 180 / Math.PI;
    const ang = (deg - 90 + 360) % 360;
    const val = linlin(ang, 30, 330, 0, 128)|0;

    return clamp(val, 0, 127);
  }

  render() {
    const { cx, cy, data } = this.props;
    const x = cx - 50;
    const y = cy - 50;
    const width  = 100;
    const height = 100;
    const ang  = linlin(data, 0, 128, 0, 300);
    const rad0 = ((  0 + 120) / 360) * 2 * Math.PI;
    const rad1 = ((ang + 120) / 360) * 2 * Math.PI;
    const rad2 = ((300 + 120) / 360) * 2 * Math.PI;
    const r = 30;
    const x0 = Math.cos(rad0) * r + cx;
    const y0 = Math.sin(rad0) * r + cy;
    const x1 = Math.cos(rad1) * (r + 5) + cx;
    const y1 = Math.sin(rad1) * (r + 5) + cy;
    const x2 = Math.cos(rad2) * r + cx;
    const y2 = Math.sin(rad2) * r + cy;
    const d0 = `M${ cx },${ cy } M${ x0 },${ y0 } A${ r },${ r } 0 1,1 ${ x2 },${ y2 }`;
    const d1 = `M${ cx },${ cy } L${ x1 },${ y1 }`;
    const color = this.state.focus ? "#b5b1a2" : "#77756b";

    return (
      <g className="lcon-knob">
        <path stroke={ color } fill="transparent" strokeWidth={ 10 } d={ d0 }/>
        <path stroke="#f7f7f6" fill="transparent" strokeWidth={ 5 } d={ d1 }/>
        <rect x={ x } y={ y } width={ width } height={ height } fill="transparent" { ...this._events }/>
      </g>
    );
  }
}
