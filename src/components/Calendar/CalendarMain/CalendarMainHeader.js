import React, { Component } from "react";
import { renderTime } from "../../../lib/calendarUtils";
import classNames from "classnames";
import { Glyphicon } from "react-bootstrap";

export default class CalendarMainHeader extends Component {
	constructor(props) {
		super(props);
		console.log(props, "header");
	}

	changeWeek(direction) {
		const {
			Calendar,
			calendarMainChangeWeek,
			calendarMainChangeMonth
		} = this.props;
		const { mainWeek, mainMonth, mainYear, mainMonthDays } = Calendar;
		let dateObj = {};
		let nextWeek = mainWeek;
		let nextMonth = mainMonth;
		let nextYear = mainYear;
		const currentWed = mainMonthDays[mainWeek][3];
		const currentWedDate = new Date(currentWed.year, currentWed.month, currentWed.day);
		console.log(currentWed, currentWedDate, "CURRENT WED");
		if (direction === "left") {
			const nextWed = new Date(currentWed.year, currentWed.month, currentWed.day-7);
			const nextWedMonth = nextWed.getMonth();
			if(nextWedMonth === currentWed.month){
				nextWeek--;
				calendarMainChangeWeek(nextWeek, mainMonthDays, mainMonth, mainYear);
			} else {
				nextYear = nextWed.getFullYear();
				nextMonth = nextWed.getMonth();
				let nextWedDay = nextWed.getDate();
				let nextMonthDays = renderTime(nextYear, nextMonth);
				for(let i = 5; i>0; i--){
					if(nextWedDay === nextMonthDays[i][3].day && nextMonth === nextMonthDays[i][3].month){
						nextWeek = i;
						break;
					}
				}
				calendarMainChangeMonth(nextYear, nextMonth, nextWeek, nextMonthDays);
			}
		} else if (direction === "right") {
			const nextWed = new Date(currentWed.year, currentWed.month, currentWed.day+7);
			const nextWedMonth = nextWed.getMonth();
			if(nextWedMonth === currentWed.month){
				nextWeek++;
				calendarMainChangeWeek(nextWeek, mainMonthDays, mainMonth, mainYear);
			} else {
				nextYear = nextWed.getFullYear();
				nextMonth = nextWed.getMonth();
				let nextWedDay = nextWed.getDate();
				let nextMonthDays = renderTime(nextYear, nextMonth);
				for(let i = 0; i<6; i++){
					if(nextWedDay === nextMonthDays[i][3].day && nextMonth === nextMonthDays[i][3].month){
						nextWeek = i;
						break;
					}
				}
				calendarMainChangeMonth(nextYear, nextMonth, nextWeek, nextMonthDays);
			}
		}
	}

	render() {
		const { Calendar } = this.props;
		const {
			mainMonthDays,
			mainWeek,
			mainMonth,
			mainYear,
			currentDay,
			currentMonth,
			currentYear
		} = Calendar;

		return (
			<div className="CalendarMainHeader">
				<div className="CalendarMainRemote">
					<div className="YearMonthView">
						{`${mainYear}년 ${mainMonth + 1}월`}
					</div>
					<div className="WeekControl">
						<Glyphicon
							glyph="menu-left"
							onClick={() => this.changeWeek("left")}
						/>
						<div className="GoToday"> 오늘 </div>
						<Glyphicon
							glyph="menu-right"
							onClick={() => this.changeWeek("right")}
						/>
					</div>
				</div>
				<div className="CalendarMainDays">
					{mainMonthDays[mainWeek].map((day, k) => {
						let dayClass = classNames({
							holiday: k === 0,
							today: day.month === currentMonth &&
								day.day === currentDay &&
								day.year === currentYear
						});
						return (
							<div key={day.day} className={dayClass}>
								{`${day.day}일`}
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
