import React, { Component } from "react";
import { connect } from "react-redux";
import {
	renderTime,
	sideSameMonth,
	sideDifferentMonth
} from "../../../lib/calendarUtils";
import classNames from "classnames";
import { planUpdateComplete } from "../../../actions/PlanActions";

export default class CalendarMonth extends Component {
	constructor(props) {
		super(props);
		this.clickWeek = this.clickWeek.bind(this);
	}

	clickWeek(clickedWeekWed, weekIndex) {
		const {
			Calendar,
			calendarMainChangeMonth,
			calendarMainChangeWeek
		} = this.props;
		const sameMonth = Calendar.sideMonth === Calendar.mainMonth && Calendar.sideYear === Calendar.mainYear;
		if (sameMonth) {
			return sideSameMonth(
				Calendar,
				calendarMainChangeMonth,
				calendarMainChangeWeek,
				clickedWeekWed,
				weekIndex
			);
		} else {
			return sideDifferentMonth(
				Calendar,
				calendarMainChangeMonth,
				calendarMainChangeWeek,
				clickedWeekWed,
				weekIndex
			);
		}
	}

	render() {
		const {
			currentDay,
			currentMonth,
			currentYear,
			sideMonth,
			sideYear,
			mainWeek,
			mainMonth,
			mainYear,
			sideMonthDays
		} = this.props.Calendar;
		return (
			<div className="sideMonth">
				{sideMonthDays.map((week, i) => {
					let weekClass = classNames({
						sideWeek: true,
						sideShowingWeek: sideMonth === mainMonth &&
							sideYear === mainYear &&
							i === mainWeek
					});
					return (
						<div
							className={weekClass}
							onClick={() => this.clickWeek(sideMonthDays[i][3], i)}
							key={`${i}`}
						>
							{week.map((day, i) => {
								let dayClass = classNames({
									sideDays: true,
									uncurrent: day.month !== sideMonth,
									sideSunday: i === 0,
									today: day.month === currentMonth &&
										day.day === currentDay &&
										day.year === currentYear
								});
								return (
									<div className={dayClass} key={`${i}`}>
										{day.day}
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		);
	}
}
