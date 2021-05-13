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

const addMinutes = (date, minutes) => {
  let newDate = new Date(date);
  newDate.setMinutes(newDate.getMinutes() + minutes);
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

  for (let i = 0; i < days.length; i++) {
    // let date = today.addDays(days[i]);
    const hoursAmount = Math.ceil(Math.random() * 10);

    const date = addDays(today, days[i]);
    for (let i = 0; i < hoursAmount; i++) {
      let hourDate = addHours(date, Math.ceil(Math.random() * 23));
      hourDate = addMinutes(hourDate, Math.ceil(Math.random() * 60));
      dates.push(hourDate);
    }
  }

  dates.sort((a, b) => (a > b ? 1 : -1));

  for (let i = 0; i < dates.length; i++) {
    dates[i] = dates[i].toString();
  }

  return dates;
};
