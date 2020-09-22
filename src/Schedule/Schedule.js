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

// todo: sort timeblocks so that they go in order by starttime every time one is moved
// to make overlap behavior consistent

// todo: when drag or resize, change the startDate and endDate using week info, not just start and end
//

// in .map that churns out DNDs, check if reccuring, if not, check if date is between current week's start and end
// if it is render it, if not, don't

// change blockTimes every time drag or resize

// use uuid to make ids for each new timeblock

// integrate with fullstack, add save button to send blockedTimes to server

let current = new Date();
let dayOfWeek = current.getDay();

const App = () => {
  const [week, setWeek] = useState(setUpWeek());
  const [blockedTimes, setBlockedTimes] = useState(entries);
  const [blockEntries, setBlockEntries] = useState(entries);

  const destroy = (id) => {
    console.log('destroy: ', id);
    setBlockedTimes((blocks) => {
      let block = blocks.filter((b) => b.id === id)[0];
      console.log({ block });
      let index = blocks.indexOf(block);
      console.log({ index });
      let copy = [...blocks];
      copy[index].invisible = true;
      return blocks;
    });
    setBlockEntries((blocks) => blocks.filter((block) => block.id !== id));
  };

  // change display to none or hidden inside blockedtimes, delete from blockentries

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
    console.log('$$$$$BINGOP: ', newBlock);
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

export default App;
