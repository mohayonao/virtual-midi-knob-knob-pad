import React, { Component, PropTypes } from "react";
import LConPadMini from "./LConPadMini";
import { TemplateLayout } from "../designer";

export default class LConTemplate extends Component {
  static propTypes = {
    template     : PropTypes.number.isRequired,
    onValueChange: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProp) {
    return nextProp.template !== this.props.template;
  }

  render() {
    const { template } = this.props;
    const elems = [ 0, 1 ].map((index) => {
      const [ cx, cy ] = TemplateLayout[index];
      const onValueChange = this.props.onValueChange.bind(null, index);
      const data = template === index ? 3 : 0;

      return (
        <LConPadMini key={ index } cx={ cx } cy={ cy } data={ data } onValueChange={ onValueChange }/>
      );
    });

    return (<g className="lcon-template">{ elems }</g>);
  }
}
