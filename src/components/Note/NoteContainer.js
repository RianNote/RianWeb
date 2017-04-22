import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import NoteTag from "./NoteTag";
import NoteTimeline from "./NoteTimeline";
import NoteEditor from "./NoteEditor";
import MockTimeline from "./NoteTimeline/MockListTimeline.js"
import { modeChange } from "../../actions/ModeActions";

@connect(mapState, mapDispatch)
export default class Note extends Component {
  constructor(props) {
    super(props);
    console.log(props, "NOTE PROPS");
  }
  componentWillUnmount() {
    this.props.modeChange(3);
  }
  render() {
    const { mode } = this.props.Mode;
    return (
      <div className={`body-${mode}`}>
        <NoteTag />
        <MockTimeline />
        <NoteEditor />
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

