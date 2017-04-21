import React, { Component } from "react";
import classNames from "classnames";
import { Glyphicon } from "react-bootstrap";


export default class CalendarMainHeader extends Component {
	constructor(props){
		super(props);
		console.log(props, "header");
	}

	changeWeek(direction){
		const { calendarChangeWeek } = this.props; 
		const { week } = this.props.Calendar;
		let weekMarker, nextWeek, index;
		if(direction === "left"){
			// calendarChangeWeek(week - 1);
			weekMarker = ((week-1)*7)
    	nextWeek = monthDays.slice(weekMarker, weekMarker+7);

		} else {
			calendarChangeWeek(week + 1);
		}
	}

	render() {
		const { Calendar, showingWeek } = this.props;
		const { day, month, year, currentDay, currentMonth, currentYear } = Calendar;

		return (
			<div className="CalendarMainHeader">
				<div className="CalendarMainRemote">
					<div className="YearMonthView">
						{`${year}년 ${month+1}월`}
					</div>
					<div className="WeekControl">
						<Glyphicon glyph="menu-left" onClick={() => this.changeWeek("left")} />
						<div className="GoToday"> 오늘 </div>
						<Glyphicon glyph="menu-right" onClick={() => this.changeWeek("right")} />
					</div>
				</div>
				<div className="CalendarMainDays">
          {showingWeek.map((day, k) => {
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
