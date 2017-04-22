import React, { Component } from "react";
import { connect } from "react-redux";
import ProjectCalendar from "./ProjectCalendar";

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

