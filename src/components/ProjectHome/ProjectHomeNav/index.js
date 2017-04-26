import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MOCK_USER from "../MockData/MOCK_USER"

@connect(mapState)
export default class ProjectHomeNav extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { member, _id } = this.props.Project;
    return (
      <div className="left ProjectHomeNav">
        {member.map( (user,i) => {
          return (
            <div className="profileCard" key={i}>
              <div key="name">{user.name}</div>
              <div key="email">{user.email}</div>
            </div>
          );
        })}
        <Link className="addMember" to={`/project/${_id}/add_member`} key="button">
          Add Member
        </Link>
      </div>
    );
  }
}

function mapState(state) {
  return {
    Project: state.Project
  };
}