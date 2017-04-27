import React, { Component } from "react";
import { connect } from "react-redux";
import { calendarSideChange } from "../../../actions/CalendarActions";
import CalendarHeader from "./CalendarHeader";
import CalendarMonth from "./CalendarMonth";
import "./CalendarSub.css";

@connect(mapState, mapDispatch)
export default class CalendarSub extends Component {
	constructor(props){
		super(props);
	}

	render() {
		const { User, Calendar, calendarSideChange } = this.props;
		return (
			<div className="left" id="CalendarSide">
				<div className="CalendarSideMonth">
					<CalendarHeader
						User={User}
						Calendar={Calendar}
						calendarSideChange={calendarSideChange}
					/>
					<CalendarMonth />
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
		}
	};
}