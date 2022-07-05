export default function generateDates(range) {
  const startDate = new Date();
  startDate.setMonth(new Date().getMonth() - range - 1);
  const finishDate = new Date();
  const dates = {
    start: restDate(startDate, true),
    finish: restDate(finishDate, false),
  };

  function restDate(date, start = true) {
    if (start) {
      date.setDate(2);
    } else {
      date.setDate(2);
    }
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    const newDate = date.toISOString();
    return newDate;
  }

  return dates;
}
