import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import CalendarMainHeader from "./CalendarMainHeader";
import FlexWeekDay from "./FlexWeekDay";
import { calendarMainChangeWeek, calendarMainChangeMonth } from "../../../actions/CalendarActions";
import { planEpicRequestPost } from "../../../epics/PlanEpic";
import "./CalendarMain.css";

@connect(mapState, mapDispatch)
export default class CalendarMain extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { Calendar, calendarMainChangeWeek, calendarMainChangeMonth } = this.props; 
    const { currentDay, currentMonth, currentYear, mainMonthDays, mainWeek, mainMonth, mainYear } = Calendar;
    // console.log(week, monthDays, " :RIAN WEEK ");

    return (
      <div className="middle" id="CalendarMain">
        <CalendarMainHeader 
          Calendar={Calendar}
          calendarMainChangeWeek={calendarMainChangeWeek}
          calendarMainChangeMonth={calendarMainChangeMonth}
        />        
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
    calendarMainChangeWeek: (week, monthDays, month, year)=>{
      dispatch(calendarMainChangeWeek(week, monthDays, month, year));
    },
    calendarMainChangeMonth: (year, month, week, monthDays)=>{
      dispatch(calendarMainChangeMonth(year, month, week, monthDays));
    }
  }
}

        // <CalendarMainHeader 
        //   Calendar={Calendar}
        //   showingWeek={showingWeek}
        //   calendarChangeWeek={calendarChangeWeek}
        // />        
        // <div className="WeekCalendar">
        //   {
        //     showingWeek.map((day,k)=>{
        //       return <FlexWeekDay
        //         key={k}
        //         date={day}
        //         userId={this.props.User._id}
        //       />

        //     })
        //   }
        // </div>
 // return <FlexWeekDay
 //                key={k}
 //                date={day}
 //                place={k}
 //                userId={this.props.User._id}
 //                handleOnDrop={form => this.handleOnDrop.bind(this)(form)}
 //                handleCanDrop={(timeIndex, dayIndex) =>{this.handleCanDrop.bind(this)(timeIndex, dayIndex)}}
 //                handleOnResize={(direction, delta, plan) => this.handleOnResize.bind(this)(direction, delta, plan)}
 //              />