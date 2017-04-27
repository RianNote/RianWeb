import React, { Component } from "react";
import { Glyphicon } from "react-bootstrap";
import { Calendar as calen } from "calendar";

export default class CalendarHeader extends Component {
  constructor(props) {
    super(props);
  }

  changeMonth(direction) {
    const {
      sideMonth,
      sideYear
    } = this.props.Calendar;
    let nextMonth = sideMonth,
      nextYear = sideYear

    if (direction === "left") {
      if (sideMonth === 0) {
        nextYear--;
        nextMonth = 11;
      } else {
        nextMonth--;
      }
    } else if (direction === "right") {
      if (sideMonth === 11) {
        nextYear++;
        nextMonth = 0;
      } else {
        nextMonth++;
      }
    }
    this.props.calendarSideChange(nextYear, nextMonth);
  }

  render() {
    const { sideMonth } = this.props.Calendar;
    return (
      <div className="calendarHeader">
        <Glyphicon className="calendarArrow" glyph="menu-left" onClick={() => this.changeMonth("left")} />
        <div className="DateMonitor">
          <p className="DateText">
            { sideMonth+1 }
          </p>
        </div>
        <Glyphicon className="calendarArrow" glyph="menu-right" onClick={() => this.changeMonth("right")} />
      </div>
    );
  }
}
