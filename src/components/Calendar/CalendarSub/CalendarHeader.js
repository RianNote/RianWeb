import React, { Component, PropTypes } from "react";
import { Glyphicon } from "react-bootstrap";
import { Calendar as calen } from "calendar";

export default class CalendarHeader extends Component {
  constructor(props) {
    super(props);
  }

  changeMonth(direction) {
    const {
      day,
      month,
      year,
      week
    } = this.props.Calendar;
    let nextDay = day,
      nextMonth = month,
      nextYear = year

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
      newDate = newDate < day
      ? newDate
      : day;

    } else if (direction === "right") {
      if (month === 11) {
        nextYear++;
        nextMonth = 0;
      } else {
        nextMonth++;
      }
      newDate = new Date(nextYear, nextMonth+1, 0).getDate();
      newDate = newDate < day
      ? newDate
      : day ;
    }

    let dateObj = {
      day: newDate,
      month: nextMonth,
      year: nextYear,
    };
    console.log(dateObj,"CHANGEMONTH")
    this.props.calendarChangeMonth(dateObj);
   
  }

  render() {
    const { year, month } = this.props.Calendar;
    return (
      <div id="CalendarHeader">
        <Glyphicon glyph="menu-left" onClick={() => this.changeMonth("left")} />
        <div className="DateMonitor">
          <p className="DateText">
            <span>{year}</span>
            <br/>
            { month+1 }
          </p>
        </div>
        <Glyphicon glyph="menu-right" onClick={() => this.changeMonth("right")} />
      </div>
    );
  }
}
