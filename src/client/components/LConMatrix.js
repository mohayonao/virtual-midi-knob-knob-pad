import React, { Component, PropTypes } from "react";
import LConRow from "./LConRow";

export default class LConMatrix extends Component {
  static propTypes = {
    data         : PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    onValueChange: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProp) {
    return nextProp.data !== this.props.data;
  }

  render() {
    const { data } = this.props;
    const elems = data.map((rowData, row) => {
      const onValueChange = this.props.onValueChange.bind(null, row);

      return <LConRow key={ row } row={ row } data={ rowData } onValueChange={ onValueChange }/>;
    });

    return (<g className="lcon-matrix">{ elems }</g>);
  }
}
