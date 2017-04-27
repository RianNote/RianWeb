import moment from "moment";

export function renderTime(year, month){
  // day === undefined or day

  const firstDay = new Date(year, month, 1);
  const firstDayDay = firstDay.getDay(); // 0 = sun, 1 = mon, 2 = tues, 
  // 5나 6이면 앞에만 더하고, 아니면 앞에 더하고 앞에 한주 더 추가
  // 5면 3개 더하고, 6이면 4개더함 , 0 이면 5개더함, 1이면 6개더함, 2면 7개, 3면 8개, 4면 2개
  const frontDay =  firstDayDay < 2 
  ? -(firstDayDay + 5)
  : -(firstDayDay - 2);
  const backDay = 42 + frontDay;
  let timeArray = [];
  for(let week = 0; week < 6; week++){
    let weekArray = [];
    for(let day = week*7+frontDay; day < (week*7+7+frontDay); day++){
      let targetDate = new Date(year, month, day-1);
      let obj = {
        day: targetDate.getDate(),
        month: targetDate.getMonth(),
        year: targetDate.getFullYear(),
        week
      }
      weekArray.push(obj);
    }
    timeArray.push(weekArray);
  }
  console.log("RENDERTIME: ", timeArray);
  return timeArray;
}

export function getCurrentWeek(first, current){
  let startingDay = moment(first);
  let currentDay = moment(current);
  let differenceDays = currentDay.diff(startingDay, "days");
  let differenceWeek = Math.floor(differenceDays/7);
  return differenceWeek;
}