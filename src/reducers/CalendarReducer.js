import { renderTime, getCurrentWeek } from "../lib/calendarUtils";
import {
  CALENDAR_EPIC_REQUEST_DATA,
  CALENDAR_EPIC_SUCCESS_DATA,
  CALENDAR_EPIC_FAIL_DATA,
  CALENDAR_UPDATE_CHILD_ADDED,
  CALENDAR_UPDATE_CHILD_REMOVED,
  CALENDAR_UPDATE_CHILD_CHANGED,
  CALENDAR_UPDATE_COMPLETE,
  CALENDAR_MAIN_CHANGE_WEEK,
  CALENDAR_MAIN_CHANGE_MONTH,
  CALENDAR_SIDE_CHANGE
} from "../constants";

const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
const firstMonthDays = renderTime(currentYear, currentMonth);
let firstDayOfMonth = firstMonthDays[0][0];
let firstDay = new Date(firstDayOfMonth.year, firstDayOfMonth.month, firstDayOfMonth.day-1);
let currentWeek = getCurrentWeek(firstDay, currentDate);
var CalendarState = {
  kind: "month",
  loading: false,
  mainWeek: currentWeek,
  mainMonth: currentMonth, // current displaying Calendar Month
  mainYear: currentYear,
  mainMonthDays: firstMonthDays,
  sideMonth: currentMonth,
  sideYear: currentYear,
  sideMonthDays: firstMonthDays,
  currentDay, // for display Today and go to Today
  currentWeek,
  currentMonth,
  currentYear
};

export function Calendar(state = CalendarState, action) {
  switch (action.type) {
    case CALENDAR_MAIN_CHANGE_WEEK:
      return Object.assign({}, state, {
        mainWeek: action.mainWeek,
        sideMonth: action.sideMonth,
        sideYear: action.sideYear,
        sideMonthDays: action.sideMonthDays
      })
    case CALENDAR_MAIN_CHANGE_MONTH:
      return Object.assign({}, state, {
        mainWeek: action.mainWeek,
        mainMonth: action.mainMonth,
        mainYear: action.mainYear,
        mainMonthDays: action.mainMonthDays,
        sideMonth: action.sideMonth,
        sideYear: action.sideYear,
        sideMonthDays: action.sideMonthDays
      })
    case CALENDAR_SIDE_CHANGE:
      return Object.assign({}, state, {
        sideMonth: action.sideMonth,
        sideYear: action.sideYear,
        sideMonthDays: action.sideMonthDays
      })
    // // case "CALENDAR_REQUEST_DATA":
    // //   return Object.assign({}, state, {
    // //     loading: true
    // //   });
    // // case "CALENDAR_GET_DATA":
    // //   return Object.assign({}, state, {
    // //     loading: action.loading,
    // //     plans: action.plans
    // //   });
    // // case "CALENDAR_FAIL_DATA":
    // //   return Object.assign({}, state, {
    // //     loading: action.loading,
    // //     plans: action.plans
    // //   });
    // // case "CALENDAR_POST_SEND":
    // //   return Object.assign({}, state, {
    // //     loading: action.loading
    // //   });
    // // case "CALENDAR_POST_SUCCESS":
    // //   return Object.assign({}, state, {
    // //     loading: action.loading,
    // //     plans: [...state.plans, action.plans]
    // //   });
    // // case "CALENDAR_POST_FAIL":
    // //   return Object.assign({}, state, {
    // //     loading: action.loading
    // //   });
    // case "CALENDAR_CHANGE_MONTH":
    //   return Object.assign({}, state, {
    //     month: action.month,
    //     year: action.year,
    //     week: action.week,
    //     day: action.day,
    //     monthDays: action.monthDays
    //   });
    // case "CALENDAR_CHANGE_WEEK":
    //   return Object.assign({}, state, {
    //     week: action.week
    //   });
    // case "CALENDAR_TOGGLE":
    //   return Object.assign({}, state, {
    //     kind: action.kind
    //   });

    default:
      return state;
  }
}


