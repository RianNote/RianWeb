import React, { Component } from "react";
import { Glyphicon } from "react-bootstrap";
import classNames from "classnames";
import "./ProjectHomeMain.css";

export default class ProjectCalendar extends Component {
  constructor(props) {
    super(props);
    console.log(props, ": ProjectCalendar");
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.Calendar !== nextProps.Calendar) {
      return true;
    } else {
      return false;
    }
  }

  changeMonth(direction) {
    const { day, month, year, week } = this.props.Calendar;
    let nextDay = day, nextMonth = month, nextYear = year;

    // FIX HERE
    let newDate;
    if (direction === "left") {
      if (month === 0) {
        nextYear--;
        nextMonth = 11;
      } else {
        nextMonth--;
      }
      newDate = new Date(nextYear, nextMonth, 0).getDate();
      newDate = newDate < day ? newDate : day;
    } else if (direction === "right") {
      if (month === 11) {
        nextYear++;
        nextMonth = 0;
      } else {
        nextMonth++;
      }
      newDate = new Date(nextYear, nextMonth + 1, 0).getDate();
      newDate = newDate < day ? newDate : day;
    }

    let dateObj = {
      day: newDate,
      month: nextMonth,
      year: nextYear
    };
    console.log(dateObj, "CHANGEMONTH");
    this.props.calendarChangeMonth(dateObj);
  }

  render() {
    const {
      currentDay,
      currentMonth,
      currentYear,
      year,
      month,
      week,
      monthDays
    } = this.props.Calendar;
    let weekArray = [];
    for (let i = 0; i < 6; i++) {
      if (i === 0) {
        weekArray.push(monthDays.slice(2, 7));
      } else {
        weekArray.push(monthDays.slice(i * 7, i * 7 + 7));
      }
    }
    console.log(weekArray, " SEPRAET WEEK");
    return (
      <div className="projectCalendar">
        {weekArray.map((week, i) => {
          if (i === 0) {
            return (
              <div className="projectMonthWeek week0">
                <div className="projectCalendarMonth">
                  <Glyphicon
                    glyph="menu-left"
                    onClick={() => this.changeMonth("left")}
                  />
                  {`${year}년 ${month + 1}월`}
                  <Glyphicon
                    glyph="menu-right"
                    onClick={() => this.changeMonth("right")}
                  />
                </div>
                {weekArray[0].map(day => {
                  let dayClass = classNames({
                    projectMonthDate: true,
                    projectUncurrent: day.month !== month,
                    projectToday: day.month === currentMonth &&
                      day.day === currentDay &&
                      day.year === currentYear
                  });
                  return (
                    <div
                      className="projectDays"
                      key={`${day.year}${day.month}${day.day}`}
                    >
                      <div className={dayClass}> {day.day} </div>
                    </div>
                  );
                })}
              </div>
            );
          } else {
            return (
              <div className={`projectMonthWeek week${i}`}>
                {week.map((day, i) => {
                  let dayClass = classNames({
                    projectMonthDate: true,
                    projectUncurrent: day.month !== month,
                    projectToday: day.month === currentMonth &&
                      day.day === currentDay &&
                      day.year === currentYear
                  });
                  return (
                    <div
                      className="projectDays"
                      key={`${day.year}${day.month}${day.day}`}
                    >
                      <div className={dayClass}> {day.day} </div>
                    </div>
                  );
                })}
              </div>
            );
          }
        })}
      </div>
    );
  }
}
