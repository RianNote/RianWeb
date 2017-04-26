import React, { Component } from "react";
import { connect } from "react-redux";
import ProjectCalendar from "./ProjectCalendar";
import ProjectComment from "./ProjectComment/ProjectComment";
import ProjectFile from "./ProjectFile/ProjectFile";
import ProjectTodo from "./ProjectTodo/ProjectTodo";
import MOCK_COMMENT from "../MockData/MOCK_COMMENT"
import MOCK_FILE from "../MockData/MOCK_FILE"
import MOCK_TODO from "../MockData/MOCK_TODO"



@connect(mapState)
export default class ProjectHomeMain extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { Calendar, Project } = this.props;
    return (
      <div className="ProjectHomeMain">
        <ProjectCalendar Calendar={Calendar} />
        <ProjectComment Data={MOCK_COMMENT} />
        <ProjectFile Data={MOCK_FILE} />
        <ProjectTodo Data={MOCK_TODO} />
        <div className="ProjectHomeTodo"> 해야할일 </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    User: state.User,
    Calendar: state.Calendar,
    Project: state.Project
  };
}

