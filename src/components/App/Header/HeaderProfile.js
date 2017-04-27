import React, { Component } from "react";
import { connect } from "react-redux";
import Chat from "../../Chat/ChatContainer";
import { Route } from "react-router-dom";

@connect(mapState)
export default class HeaderProfile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { User } = this.props;
    return (
      <div className="HeaderProfile">
        <div className="HeaderNotification">
          Noti
        </div>
        <img className="UserPhoto" src={`${User.picture}`} />
        <div className="UserProfile">
          김덕연
        </div> 
        <Route exact path="/project/:projectId" component={Chat} />
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
