import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

export default class ProjectNavigation extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const { location } = this.props;
    const path = location.pathname.split("/")[2];
    return (
      <div id="nav-bar">
        <NavLink exact className="link" to={`/project/${path}`}>한눈에보기</NavLink>
        <NavLink exact className="link" to={`/project/${path}/note`}>노트</NavLink>
        <NavLink exact className="link" to={`/project/${path}/file`}>파일방</NavLink>
      </div>
    )
  }
}
