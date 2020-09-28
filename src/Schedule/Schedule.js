import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Dnd from './Dnd';
import {
  days,
  halfHours,
  getOneHalfHourAhead,
  dateFromDateAndTime,
  setUpWeek,
  checkBlock,
} from './util';
import './Schedule.scss';

// todos:
// fix gridclick midnight height bug
// add week shift forward and backward

let current = new Date();
let dayOfWeek = current.getDay();

const Schedule = ({ change, entries }) => {
  const [week] = useState(setUpWeek());
  const [blockedTimes, setBlockedTimes] = useState(entries);
  const [blockEntries, setBlockEntries] = useState(entries);

  useEffect(() => {
    if (change && blockEntries) {
      change(blockEntries);
    }
  }, [blockEntries, change]);

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
    if (clickedMonth < 10) clickedMonth = `0${clickedMonth}`;
    let clickedYear = clicked.getFullYear();

    let cDate = new Date(clickedYear, clickedMonth, clickedDate);
    let startDate = dateFromDateAndTime(cDate, hour);

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
      id: uuidv4(),
    };
    console.log({ newBlock });
    setBlockedTimes([...blockedTimes, newBlock]);
    setBlockEntries([...blockEntries, newBlock]);
  };

  const newDate = new Date();
  const today = newDate.getDay();

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
              <div className={`day-label today-${today === i}`} key={key}>
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
                          style={{
                            background: `rgb(${0 + i * 2}, ${110 - i / 2}, ${
                              159 + i * 2
                            })`,
                          }}
                          key={hour}
                          id={JSON.stringify({ day, hour })}
                          onClick={handleGridClick}
                        >
                          {hour}
                        </div>
                      );
                    else return null;
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
              if (inCurrentWeek)
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
                  />
                );
              else return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
