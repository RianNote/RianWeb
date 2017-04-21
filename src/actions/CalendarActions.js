import { renderTime } from "../lib/calendarUtils";
import { 
	CALENDAR_CHANGE_MONTH, CALENDAR_CHANGE_WEEK, CALENDAR_SELECT_DATE, CALENDAR_TOGGLE
} from "../constants";
import axios from "axios";
import database from "firebase/database";

/*========================================
=            CALENDAR ACTIONS            =
========================================*/
/*----------  CALENDAR CHANGE DATE  ----------*/
export function calendarChangeMonth(date){
	console.log(date," : CALENDAR ACTION");
	const monthDays = renderTime(date.year, date.month);
	let currentWeek;
	for(let { year, month, day, week } of monthDays){
	  if ( date.day === day && date.month === month ){
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

export function calendarChangeWeek(week){
	return {
		type: CALENDAR_CHANGE_WEEK,
		week
	};
}


export function calendarToggle(kind){
	return {
		type: CALENDAR_TOGGLE,
		kind: kind
	};
}
