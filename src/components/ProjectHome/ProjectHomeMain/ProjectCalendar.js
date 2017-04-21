import React, { Component } from "react";
import classNames from "classnames";

export default class ProjectCalendar extends Component {
  constructor(props) {
    super(props);
    console.log(props, ": ProjectCalendar");
  }

  render() {
    const { currentDay, currentMonth, currentYear, month, week, monthDays } = this.props.Calendar;
    return (
    <div id="ProjectCalendar">
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

