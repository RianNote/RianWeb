import { renderTime } from "../lib/calendarUtils";
import {
  CALENDAR_EPIC_REQUEST_DATA,
  CALENDAR_EPIC_SUCCESS_DATA,
  CALENDAR_EPIC_FAIL_DATA,
  CALENDAR_UPDATE_CHILD_ADDED,
  CALENDAR_UPDATE_CHILD_REMOVED,
  CALENDAR_UPDATE_CHILD_CHANGED,
  CALENDAR_UPDATE_COMPLETE
} from "../constants";

const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
const firstMonthDays = renderTime(currentYear, currentMonth);
let currentWeek;
for(let { year, month, day, week } of firstMonthDays){
  if ( currentDay === day && currentMonth === month ){
    currentWeek = week;
    break;
  }
}

var CalendarState = {
  kind: "month",
  loading: false,
  day: currentDay,
  week: currentWeek,
  month: currentMonth, // current displaying Calendar Month
  year: currentYear,
  monthDays: firstMonthDays,
  currentDay, // for display Today and go to Today
  currentMonth,
  currentYear
};

export function Calendar(state = CalendarState, action) {
  switch (action.type) {
    case "CALENDAR_REQUEST_DATA":
      return Object.assign({}, state, {
        loading: true
      });
    case "CALENDAR_GET_DATA":
      return Object.assign({}, state, {
        loading: action.loading,
        plans: action.plans
      });
    case "CALENDAR_FAIL_DATA":
      return Object.assign({}, state, {
        loading: action.loading,
        plans: action.plans
      });
    case "CALENDAR_POST_SEND":
      return Object.assign({}, state, {
        loading: action.loading
      });
    case "CALENDAR_POST_SUCCESS":
      return Object.assign({}, state, {
        loading: action.loading,
        plans: [...state.plans, action.plans]
      });
    case "CALENDAR_POST_FAIL":
      return Object.assign({}, state, {
        loading: action.loading
      });
    case "CALENDAR_CHANGE_MONTH":
      return Object.assign({}, state, {
        month: action.month,
        year: action.year,
        week: action.week,
        day: action.day,
        monthDays: action.monthDays
      });
    case "CALENDAR_CHANGE_WEEK":
      return Object.assign({}, state, {
        week: action.week
      });
    case "CALENDAR_TOGGLE":
      return Object.assign({}, state, {
        kind: action.kind
      });

    default:
      return state;
  }
}


