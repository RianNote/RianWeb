import React, { Component } from "react";
import { connect } from "react-redux";
import CalendarSub from "./CalendarSub";
import CalendarMain from "./CalendarMain";
import CalendarInbox from "./CalendarInbox";
import { calendarMainChangeMonth } from "../../actions/CalendarActions";
import { renderTime } from "../../lib/calendarUtils";

import "./Calendar.css";

@connect(mapState, mapDispatch)
export default class Calendar extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    const { currentYear, currentMonth, currentWeek } = this.props.Calendar;
    const nextMonthDays = renderTime(currentYear, currentMonth);
    this.props.calendarMainChangeMonth(
      currentYear,
      currentMonth,
      currentWeek,
      nextMonthDays
    );
  }

  render() {
    return (
      <div className="body-3-calendar">
        <CalendarSub />
        <CalendarMain />
        <CalendarInbox />
      </div>
    );
  }
}

function mapState(state) {
  return {
    User: state.User,
    Calendar: state.Calendar
  };
}

function mapDispatch(dispatch) {
  return {
    projectEpicRequestData: _id => {
      dispatch(projectEpicRequestData(_id));
    },
    projectEpicCancleData: () => {
      dispatch(projectEpicCancleData());
    },
    calendarMainChangeMonth: (year, month, week, monthDays) => {
      dispatch(calendarMainChangeMonth(year, month, week, monthDays));
    }
  };
}
