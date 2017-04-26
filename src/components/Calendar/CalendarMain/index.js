import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import CalendarMainHeader from "./CalendarMainHeader";
import FlexWeekDay from "./FlexWeekDay";
import { calendarChangeWeek } from "../../../actions/CalendarActions";
import { planEpicRequestPost } from "../../../epics/PlanEpic";
import moment from "moment";
import "./CalendarMain.css";

@connect(mapState, mapDispatch)
export default class CalendarMain extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { Calendar, calendarChangeWeek } = this.props; 
    const { currentDay, currentMonth, currentYear, monthDays, week, month, year } = Calendar;
    console.log(week, monthDays, " :RIAN WEEK ");
    // const filteredPlan = this.state.filteredPlan; // not updated
    const weekMarker = (week*7)
    const showingWeek = monthDays.slice(weekMarker, weekMarker+7);
    return (
      <div className="middle" id="CalendarMain">
        <CalendarMainHeader 
          Calendar={Calendar}
          showingWeek={showingWeek}
          calendarChangeWeek={calendarChangeWeek}
        />        
        <div className="WeekCalendar">
          {
            showingWeek.map((day,k)=>{
              return <FlexWeekDay
                key={k}
                date={day}
                userId={this.props.User._id}
              />

            })
          }
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    User: state.User,
    Calendar: state.Calendar,
    Plan: state.Plan
  };
}

function mapDispatch(dispatch) {
  return {
    calendarChangeWeek: (date)=>{
      dispatch(calendarChangeWeek(date));
    }
  }
}

 // return <FlexWeekDay
 //                key={k}
 //                date={day}
 //                place={k}
 //                userId={this.props.User._id}
 //                handleOnDrop={form => this.handleOnDrop.bind(this)(form)}
 //                handleCanDrop={(timeIndex, dayIndex) =>{this.handleCanDrop.bind(this)(timeIndex, dayIndex)}}
 //                handleOnResize={(direction, delta, plan) => this.handleOnResize.bind(this)(direction, delta, plan)}
 //              />