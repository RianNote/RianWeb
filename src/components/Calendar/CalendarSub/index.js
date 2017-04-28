import React, { Component } from "react";
import { connect } from "react-redux";
import { calendarSideChange, calendarMainChangeWeek, calendarMainChangeMonth } from "../../../actions/CalendarActions";
import CalendarHeader from "./CalendarHeader";
import CalendarMonth from "./CalendarMonth";
import "./CalendarSub.css";

@connect(mapState, mapDispatch)
export default class CalendarSub extends Component {
	constructor(props){
		super(props);
	}

	render() {
		const { User, Calendar, calendarSideChange, calendarMainChangeWeek, calendarMainChangeMonth } = this.props;
		return (
			<div className="left" id="CalendarSide">
				<div className="CalendarSideMonth">
					<CalendarHeader
						User={User}
						Calendar={Calendar}
						calendarSideChange={calendarSideChange}
					/>
					<CalendarMonth 
						Calendar={Calendar}
						calendarMainChangeWeek={calendarMainChangeWeek}
						calendarMainChangeMonth={calendarMainChangeMonth}
					/>
				</div>
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
		calendarSideChange: (year, month)=> {
			dispatch(calendarSideChange(year, month));
		},
    calendarMainChangeWeek: (week, monthDays, month, year)=>{
      dispatch(calendarMainChangeWeek(week, monthDays, month, year));
    },
    calendarMainChangeMonth: (year, month, week, monthDays)=>{
      dispatch(calendarMainChangeMonth(year, month, week, monthDays));
    }
	};
}