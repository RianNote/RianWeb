export function renderTime(year, month){
  const firstDay = new Date(year, month, 1);
  const firstDayDay = firstDay.getDay(); // 0 = sun, 1 = mon, 2 = tues, 
  // 5나 6이면 앞에만 더하고, 아니면 앞에 더하고 앞에 한주 더 추가
  // 5면 3개 더하고, 6이면 4개더함 , 0 이면 5개더함, 1이면 6개더함, 2면 7개, 3면 8개, 4면 2개
  const frontDay =  firstDayDay < 4 
  ? -(firstDayDay + 5)
  : -(firstDayDay - 2);
  const backDay = 42 + frontDay;
  let timeArray = [];
  for(let i = frontDay, n = 0; i < backDay; i++, n++){
    let targetDate = new Date(year, month, i - 1);
    let obj = {
      day: targetDate.getDate(),
      month: targetDate.getMonth(),
      year: targetDate.getFullYear(),
      week: Math.floor(n/7)
    }
    timeArray.push(obj);
  }
  return timeArray;
}