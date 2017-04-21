import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import RockofRian from "./RockofRianCollaboEditor.js";
import {
  changeRenderedNote,
  changEditorState
} from "../../../actions/NoteEditorActions.js";
import { noteGet } from "../../../epics/NoteEpic";
import * as noteEpic from "../../../epics/NoteEpic";

@connect(mapState, mapDispatch)
export default class NoteEditorContainer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.notelocation !== nextProps.notelocation) {
      console.log("RenderNoteEditor");
      return true;
    } else if (this.props.onEditor !== nextProps.onEditor) {
      return true;
    } else {
      return false;
    }
  }

  componentWillUnmount() {
    this.props.changeEditorState(false);
  }

  render() {
    return (
      <div className="editorContainer">
        {this.props.onEditor &&
          <div
            ref="Editor"
            style={{ margin: "0", height: "800px", position: "relative" }}
          >
            <RockofRian
              user={this.props.userid}
              notelocation={this.props.notelocation}
              indexlocation={this.props.indexlocation}
              inforlocation={this.props.inforlocation}
              changeRenderedNote={this.props.changeRenderedNote}
              allofTimelineGet={this.props.allofTimelineGet}
            />
          </div>}
        {!this.props.onEditor &&
          <Button
            onClick={() => {
              this.props.changeEditorState(true);
              this.props.changeRenderedNote(false);
            }}
          />}

      </div>
    );
  }
}

function mapState(state) {
  return {
    data: state.NoteEditor.data,
    userid: state.User._id,
    onEditor: state.NoteEditor.onEditor,
    notelocation: state.NoteEditor.notelocation,
    inforlocation: state.NoteEditor.inforlocation,
    indexlocation: state.NoteEditor.indexlocation
  };
}

function mapDispatch(dispatch) {
  return {
    changeEditorState: a => dispatch(changEditorState(a)),
    changeRenderedNote: a => {
      dispatch(changeRenderedNote(a));
    },
    allofTimelineGet: sorting => dispatch(noteGet(sorting))
  };
}

