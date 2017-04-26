import React, { Component } from "react";
import ProjectHomeNav from "./ProjectHomeNav";
import ProjectHomeMain from "./ProjectHomeMain";
import ProjectHomeComment from "./ProjectHomeComment";
import "./ProjectHome.css";
import MOCK_COMMENT from "./MockData/MOCK_COMMENT";

export default class ProjectHome extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { Calendar, Project } = this.props;
    return (
      <div className="body-3-calendar">
        <ProjectHomeNav />
        <ProjectHomeMain />
        <ProjectHomeComment Data={MOCK_COMMENT} />

      </div>
    );
  }
}