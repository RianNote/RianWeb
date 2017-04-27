import { renderTime } from "../lib/calendarUtils";
import {
	CALENDAR_CHANGE_MONTH,
	CALENDAR_CHANGE_WEEK,
	CALENDAR_SELECT_DATE,
	CALENDAR_TOGGLE,
	CALENDAR_MAIN_CHANGE_WEEK,
	CALENDAR_MAIN_CHANGE_MONTH,
	CALENDAR_SIDE_CHANGE
} from "../constants";
import axios from "axios";
import database from "firebase/database";

/*========================================
=            CALENDAR ACTIONS            =
========================================*/
/*----------  CALENDAR CHANGE DATE  ----------*/
export function calendarMainChangeWeek(week, monthDays, month, year) {
	console.log("CHANGE WEEK", week)
	return {
		type: CALENDAR_MAIN_CHANGE_WEEK,
		mainWeek: week,
		sideMonth: month,
		sideYear: year,
		sideMonthDays: monthDays
	};
}

export function calendarMainChangeMonth(year, month, week, monthDays) {
	return {
		type: CALENDAR_MAIN_CHANGE_MONTH,
		mainMonthDays: monthDays,
		mainWeek: week,
		mainMonth: month,
		mainYear: year,
		sideMonth: month,
		sideYear: year,
		sideMonthDays: monthDays
	};
}

export function calendarSideChange(year, month) {
	const sideMonthDays = renderTime(year, month);
	return {
		type: CALENDAR_SIDE_CHANGE,
		sideYear: year,
		sideMonth: month,
		sideMonthDays
	};
}

export function calendarChangeMonth(date) {
	console.log(date, " : CALENDAR ACTION");
	const monthDays = renderTime(date.year, date.month);
	let currentWeek;
	for (let { year, month, day, week } of monthDays) {
		if (date.day === day && date.month === month) {
			currentWeek = week;
			break;
		}
	}

	return {
		type: CALENDAR_CHANGE_MONTH,
		month: date.month,
		year: date.year,
		week: currentWeek,
		day: date.day,
		monthDays
	};
}

export function calendarChangeWeek(week) {
	return {
		type: CALENDAR_CHANGE_WEEK,
		week
	};
}

export function calendarToggle(kind) {
	return {
		type: CALENDAR_TOGGLE,
		kind: kind
	};
}
