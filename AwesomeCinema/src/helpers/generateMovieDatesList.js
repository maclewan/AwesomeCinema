// Date.prototype.addHours = h => {
//   this.setHours(this.getHours() + h);
//   return this;
// };

const addDays = (date, days) => {
  let newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

const addHours = (date, h) => {
  let newDate = new Date(date);
  newDate.setHours(newDate.getHours() + h);
  return newDate;
};

export const generateMovieDatesList = () => {
  const datesAmount = Math.ceil(Math.random() * 10);
  const days = [];
  const dates = [];

  const today = new Date();

  for (let i = 0; i < datesAmount; i++) {
    let day = Math.ceil(Math.random() * 20);

    while (days.includes(day)) {
      day = Math.ceil(Math.random() * 20);
    }

    days.push(day);
  }

  days.sort((a, b) => (a > b ? 1 : -1));

  for (let i = 0; i < days.length; i++) {
    // let date = today.addDays(days[i]);
    let date = addDays(today, days[i]);
    date = addHours(date, Math.ceil(Math.random() + 23));
    dates.push(date.toString());
  }
  return dates;
};
