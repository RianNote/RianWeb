import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "./Navigation.css";

export default class MeNavigation extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="nav-bar">
        <NavLink exact className="link" to="/me">한눈에보기</NavLink>
        <NavLink exact className="link" to="/me/note">노트</NavLink>
        <NavLink exact className="link" to="/me/calendar">캘린더</NavLink>
      </div>
    );
  }
}
