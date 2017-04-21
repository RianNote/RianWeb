import React, { Component } from "react";
import ProjectHomeNav from "./ProjectHomeNav";
import ProjectHomeMain from "./ProjectHomeMain";
import "./ProjectHome.css";

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
        <div className="right"> HEY3 </div>
      </div>
    );
  }
}