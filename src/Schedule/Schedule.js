import React, { useState } from 'react';
import Dnd from './Dnd';
import {
  days,
  halfHours,
  toTimeNumber,
  getOneHalfHourAhead,
  setUpWeek,
  entries,
  checkBlock,
} from './util';
import './Schedule.scss';

// todo: when resize, change the endDate using week info, not just start and end

// when recurring is toggled off, set startDate and endDate to the matching date for the current week
// using the same time

// use uuid to make ids for each new timeblock

// make submit button, check if blockEntries is getting edited properly
// or d a useEffect to send every change to db?

// integrate with fullstack, add save button to send blockedTimes to server

let current = new Date();
let dayOfWeek = current.getDay();

const Schedule = () => {
  const [week, setWeek] = useState(setUpWeek());
  const [blockedTimes, setBlockedTimes] = useState(entries);
  const [blockEntries, setBlockEntries] = useState(entries);

  const destroy = (id) => {
    setBlockedTimes((blocks) => {
      let block = blocks.filter((b) => b.id === id)[0];
      let index = blocks.indexOf(block);
      let copy = [...blocks];
      copy[index].invisible = true;
      return blocks;
    });
    setBlockEntries((blocks) => blocks.filter((block) => block.id !== id));
  };

  const handleGridClick = (e) => {
    let { day, hour } = JSON.parse(e.target.id);
    let dayIndex = days.indexOf(day);
    let clicked = week[dayIndex];
    let clickedDate = clicked.getDate();
    let clickedMonth = Number(clicked.getMonth());
    clickedMonth++;
    if (clickedMonth < 10) clickedMonth = `0${clickedMonth}`;
    let clickedYear = clicked.getFullYear();
    let hourMin = toTimeNumber(hour);
    // todo: change the following to not use the datestring parsing method, pass in as separate args instead
    // remember: when the method is changed, remove clickedMonth++ line above
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
      id: Math.random() * 20 * Math.random() * 1000,
    };
    setBlockedTimes([...blockedTimes, newBlock]);
  };

  const changeRecurring = (e) => {
    console.log('changeRecurring e: ', e);
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
                          id={JSON.stringify({ day, hour })}
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
            {blockedTimes.map((data) => {
              const inCurrentWeek = checkBlock(data, week);
              if (inCurrentWeek) {
                return (
                  <Dnd
                    invisible={data.invisible}
                    data={data}
                    destroy={destroy}
                    key={data.id}
                    week={week}
                    currentDay={dayOfWeek}
                    days={days}
                    times={halfHours}
                    setBlockedTimes={setBlockEntries}
                    changeRecurring={changeRecurring}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
