import React, { Component } from "react";
import { connect } from "react-redux";

import { modeChange } from "../../../actions/ModeActions";

@connect(mapState, mapDispatch)
export default class NoteTag extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="NoteTag" onClick={()=>this.props.modeChange.bind(this)(1)}>
      </div>
    );
  }
}

function mapState(state) {
  return {
    Mode: state.Mode
  };
}

function mapDispatch(dispatch) {
  return {
    modeChange: mode => dispatch(modeChange(mode))
  };
}

