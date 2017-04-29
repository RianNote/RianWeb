import React, { Component } from "react";
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
import './penguin.css'

import sharedb from 'sharedb/lib/client';
import 'quill/dist/quill.snow.css'
import richText from 'rich-text';
import Quill from 'quill';
sharedb.types.register(richText.type);

// Open WebSocket connection to ShareDB server
var socket = new WebSocket('ws://' + 'localhost:8080');
var connection = new sharedb.Connection(socket);




@connect(mapState, mapDispatch)
export default class NoteEditorContainer extends Component {

  componentDidMount() {
    // Create local Doc instance mapped to 'examples' collection document with id 'richtext'
    var doc = connection.get('examples', 'richtext');
    doc.subscribe(function(err) {
      if (err) throw err;
      var quill = new Quill('.penguin', {theme: 'snow'});
      quill.setContents(doc.data);
      quill.on('text-change', function(delta, oldDelta, source) {
        if (source !== 'user') return;
        doc.submitOp(delta, {source: quill});
      });
      doc.on('op', function(op, source) {
        if (source === quill) return;
        quill.updateContents(op);
      });
    });


  }


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
      <div className="right editorContainer">
        <div className="penguin" />
      </div>
    );
  }
}
//<img src={require("../rian_1024.png")} height="600" width="570" />
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

  // {this.props.onEditor &&
  //         <div
  //           ref="Editor"
  //           style={{ margin: "0", height: "800px", position: "relative" }}
  //         >
  //           <RockofRian
  //             user={this.props.userid}
  //             notelocation={this.props.notelocation}
  //             indexlocation={this.props.indexlocation}
  //             inforlocation={this.props.inforlocation}
  //             changeRenderedNote={this.props.changeRenderedNote}
  //             allofTimelineGet={this.props.allofTimelineGet}
  //           />
  //         </div>}
  //       {!this.props.onEditor &&
  //         <Button
  //           onClick={() => {
  //             this.props.changeEditorState(true);
  //             this.props.changeRenderedNote(false);
  //           }}
  //         />}

