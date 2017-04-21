import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { planUpdateComplete } from "../../../actions/PlanActions";

@connect(mapState, mapDispatch)
export default class CalendarMonth extends Component {
	constructor(props){
		super(props);
	}

	render() {
		const { currentDay, currentMonth, currentYear, month, week, monthDays } = this.props.Calendar;
		return (
		<div id="SideMonth">
      { monthDays.map( day => {
      	let dayClass = classNames({
      		uncurrent: day.month !== month,
					today: day.month === currentMonth && day.day === currentDay && day.year === currentYear,
					week: day.week === week
				})
      	return ( 
      		<div className={dayClass} key={`${day.year}${day.month}${day.day}`}>
      			{day.day}
      		</div>
      		)
      })
			}
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
		planUpdateComplete: ()=>{
			dispatch(planUpdateComplete());
		}
	};
}