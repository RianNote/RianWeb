import React, { Component } from "react";
// import { connect } from "react-redux";

import "./Chat.css";

// @connect(mapState, mapDispatch)
export default class ChatContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="chatButton">
        Chat
      </div>
    );
  }
}

// function mapState(state) {
//   return {
//     User: state.User,
//     Calendar: state.Calendar,
//     Project: state.Project
//   };
// }

// function mapDispatch(dispatch) {
//   return {
//     calendarChangeWeek: date => {
//       dispatch(calendarChangeWeek(date));
//     },
//     calendarChangeMonth: date => {
//       dispatch(calendarChangeMonth(date));
//     }
//   };
// }
