export const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const halfHours = [
  '12:00 AM',
  '12:30 AM',
  '1:00 AM',
  '1:30 AM',
  '2:00 AM',
  '2:30 AM',
  '3:00 AM',
  '3:30 AM',
  '4:00 AM',
  '4:30 AM',
  '5:00 AM',
  '5:30 AM',
  '6:00 AM',
  '6:30 AM',
  '7:00 AM',
  '7:30 AM',
  '8:00 AM',
  '8:30 AM',
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',

  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
  '9:30 PM',
  '10:00 PM',
  '10:30 PM',
  '11:00 PM',
  '11:30 PM',
  '12:00 AM',
];

export const toTimeNumber = (string) => {
  let afterNoon = string.split(' ')[1] === 'PM';
  let time = string.split(' ')[0];
  let hour = time.split(':')[0];
  let halfHour = time.split(':')[1];
  if (afterNoon) hour = Number(hour) + 12;
  if (hour < 10) hour = `0${hour}`;
  return `${hour}:${halfHour}`;
};

export const getOneHalfHourAhead = (hour) => {
  let index = halfHours.indexOf(hour);
  return halfHours[index + 1];
};

export const setUpWeek = (weeksForward) => {
  let current = new Date();
  let dayOfWeek = current.getDay();

  let weekObj = {};
  let mSecondsInADay = 86400000;
  let now = Date.now();

  // fill in forwards to saturday
  for (let i = dayOfWeek; i < 7; i++) {
    const daysFromCurrent = i - dayOfWeek;
    const mSecondsPassed = daysFromCurrent * mSecondsInADay;
    const date = new Date(now + mSecondsPassed);
    weekObj[i] = date;
  }
  // fill in backwards to monday, if day is not sunday
  if (dayOfWeek > 0) {
    for (let j = dayOfWeek; j > 0; j--) {
      let daysBefore = j * mSecondsInADay;
      let date = new Date(current - daysBefore);
      weekObj[j - 1] = date;
      // let timeBefore = (6 - j) * mSecondsInADay;
      // let date = new Date(current - timeBefore);
      // weekObj[j - 1] = date;
    }
  }
  return weekObj;
};

export const entries = [
  {
    start: '12:00 AM',
    end: '1:30 AM',
    day: 'Sunday',
    title: 'bjj',
    id: 1,
  },
  {
    start: '1:30 AM',
    end: '2:30 AM',
    day: 'Monday',
    title: 'lunch',
    id: 2,
  },
  {
    start: '2:30 AM',
    end: '3:30 AM',
    day: 'Tuesday',
    title: 'bjj',
    id: 3,
  },
  {
    start: '3:30 AM',
    end: '4:30 AM',
    day: 'Wednesday',
    title: 'bjj',
    id: 4,
  },
  {
    start: '4:30 AM',
    end: '5:30 AM',
    day: 'Thursday',
    title: 'lunch',
    id: 5,
  },
  {
    start: '5:30 AM',
    end: '6:30 AM',
    day: 'Friday',
    title: 'bjj',
    id: 6,
  },
  {
    start: '1:30 AM',
    end: '2:30 AM',
    day: 'Saturday',
    title: 'bjj',
    id: 7,
  },
  {
    start: '3:30 AM',
    end: '5:30 AM',
    day: 'Saturday',
    title: 'bjj',
    id: 8,
  },
  {
    start: '6:30 AM',
    end: '7:30 AM',
    day: 'Saturday',
    title: 'bjj',
    id: 9,
  },
];
