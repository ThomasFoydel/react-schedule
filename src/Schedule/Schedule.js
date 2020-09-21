import React, { useState } from 'react';
import Dnd from './Dnd';
import {
  days,
  halfHours,
  toTimeNumber,
  getOneHalfHourAhead,
  setUpWeek,
  entries,
} from './util';
let current = new Date();
let dayOfWeek = current.getDay();

const App = () => {
  const [week, setWeek] = useState(setUpWeek());
  const [blockedTimes, setBlockedTimes] = useState(entries);

  const [newBlockForm, setNewBlockForm] = useState({});

  const destroy = (d) => {
    console.log('destroy: ', d);
  };

  const handleGridClick = (e) => {
    let { day, i, hour } = JSON.parse(e.target.id);
    let dayIndex = days.indexOf(day);
    let clicked = week[dayIndex];
    let clickedDate = clicked.getDate();
    let clickedMonth = Number(clicked.getMonth());
    clickedMonth++;
    if (clickedMonth < 10) clickedMonth = `0${clickedMonth}`;
    let clickedYear = clicked.getFullYear();
    let hourMin = toTimeNumber(hour);
    let startString = `${clickedYear}-${clickedMonth}-${clickedDate}T${hourMin}`;
    let startDate = new Date(startString);
    let endTime = startDate.getTime() + 1800000;
    let endDate = new Date(endTime);
    let endHour = getOneHalfHourAhead(hour);
    const newBlock = {
      startDate,
      endDate,
      start: hour,
      end: endHour,
      day,
      title: '',
      recurring: false,
      id: Math.random() * Math.random() * 1000,
    };
    setBlockedTimes([...blockedTimes, newBlock]);
  };

  return (
    <div>
      <div className='dnd'>
        <div className='labels'>
          {Object.keys(week).map((key, i) => {
            let day = week[key];
            let string = day
              .toDateString()
              .substring(0, day.toDateString().length - 4);
            return (
              <div className='day-label' key={key}>
                {string}
              </div>
            );
          })}
        </div>

        <div className='absolute'>
          <div className='drag-n-drop'>
            {
              //////////////////////////
              //   background grid
              //////////////////////////
            }
            <div className='time-grid'>
              {days.map((day) => (
                <div className='grid-day' key={day}>
                  {halfHours.map((hour, i) => {
                    if (i < 48)
                      return (
                        <div
                          className='grid-time'
                          key={hour}
                          id={JSON.stringify({ i, day, hour })}
                          onClick={handleGridClick}
                        >
                          {hour}
                        </div>
                      );
                  })}
                </div>
              ))}
            </div>

            {
              //////////////////////////////
              // drag and drop time blocks
              //////////////////////////////
            }
            {blockedTimes.map((data) => (
              <Dnd
                data={data}
                destroy={destroy}
                key={data.id}
                week={week}
                currentDay={dayOfWeek}
                days={days}
                times={halfHours}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
