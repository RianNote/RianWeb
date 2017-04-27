import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { planUpdateComplete } from "../../../actions/PlanActions";

@connect(mapState, mapDispatch)
export default class CalendarMonth extends Component {
	constructor(props){
		super(props);
	}
	render() {
		const { currentDay, currentWeek, currentMonth, currentYear, sideMonth, mainWeek, sideMonthDays } = this.props.Calendar;
		return (
		<div className="sideMonth">
      { sideMonthDays.map((week,i)=> {
      	let weekClass = classNames({
      		sideWeek: true,
      		sideCurrentWeek: sideMonth === currentMonth && i === currentWeek
      	});
      	return (
      		<div className={weekClass} key={`${i}`}>
      			{
      				week.map((day,i)=>{
      					let dayClass = classNames({
				      		sideDays: true,
				      		uncurrent: day.month !== sideMonth,
				      		sideSunday: i === 0,
									today: day.month === currentMonth && day.day === currentDay && day.year === currentYear,
								});
      					return (
      						<div className={dayClass} key={`${i}`}>
      							{day.day}
      						</div>
      					)
      				})
      			}
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

// let dayClass = classNames({
//       		sideDays: day.month === month,
//       		uncurrent: day.month !== month,
//       		sideSunday: i%7 === 0,
// 					today: day.month === currentMonth && day.day === currentDay && day.year === currentYear,
// 					week: day.week === week
// 				})
//       	return ( 
//       		<div className={dayClass} key={`${day.month}-${day.day}`}>
//       			{day.day}
//       		</div>
//       		)