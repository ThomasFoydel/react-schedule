import React from 'react';
import Schedule from './Schedule/Schedule';
import './App.css';

export const exampleEntries = [
  {
    start: '12:00 AM',
    end: '1:30 AM',
    day: 'Sunday',
    title: 'bjj',
    id: 1,
    recurring: false,
    startDate: new Date('2020', '08', '20', '00', '00'),
    endDate: new Date('2020', '08', '20', '01', '30'),
  },
  {
    start: '12:00 AM',
    end: '1:30 AM',
    day: 'Monday',
    title: 'bjj',
    id: 2,
    recurring: false,
    startDate: new Date('2020', '08', '14', '00', '00'),
    endDate: new Date('2020', '08', '14', '01', '30'),
  },
];

const App = () => {
  const exampleHandleChange = (e) => {
    console.log(e);
  };

  return (
    <div>
      <h1 className='calendar-title'>REACT RnD CALENDAR</h1>
      <div className='spacer'></div>
      <Schedule change={exampleHandleChange} entries={exampleEntries} />
    </div>
  );
};

export default App;
