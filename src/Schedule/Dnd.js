import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

const Dnd = ({
  data,
  destroy,
  week,
  days,
  times,
  setBlockedTimes,
  invisible,
}) => {
  const [day, setDay] = useState(data.day);
  const [startTime, setStartTime] = useState(data.start);
  const [endTime, setEndTime] = useState(data.end);
  const [title, setTitle] = useState(data.title);

  const [startDate, setStartDate] = useState(data.startDate);
  const [endDate, setendDate] = useState(data.endDate);
  const [recurring, setRecurring] = useState(data.recurring);

  let t = times.indexOf(data.start);
  let e = times.indexOf(data.end);
  e = e - t;
  e *= 50;
  t *= 50;
  let xDefault = days.indexOf(data.day) * 120;

  const handleDestroy = () => {
    destroy(data.id);
  };

  const updateBlocks = () => {
    //todo: check sorting
    setBlockedTimes((times) => {
      let filteredTimes = times.filter((time) => time.id !== data.id);
      let newTimes = [
        ...filteredTimes,
        {
          end: endTime,
          start: startTime,
          startDate,
          endDate,
          id: data.id,
          recurring,
        },
      ];
      return newTimes;
    });
  };

  const handleDrag = (e, el) => {
    let { node } = el;
    let { transform, height, width } = node.style;

    // NEW DAY
    let elX = el.x;
    elX -= 60;
    let x = Math.ceil(elX / 120);

    // NEW START TIME
    let y = transform.split(', ')[1];
    y = y.substring(0, y.length - 3);
    y = Number(y);
    if (y < 50 && y > -50) y = 0;
    if (y < 0) y += 2400;
    let startIndex = Math.ceil(y / 50);

    let mSecondsInADay = 86400000;

    let index = x - days.indexOf(day);
    // console.log({ index });
    const timeDifference = mSecondsInADay * index;
    // console.log('%%%%%: ', days.indexOf(day));
    const prevDate = week[days.indexOf(day)];
    let newDate = new Date(prevDate.getTime() + timeDifference);
    // console.log({ newDate });

    // NEW DATE CALCULATIONS, year month day
    let newYear = newDate.getFullYear();
    let newMonth = Number(newDate.getMonth());
    if (newMonth < 10) newMonth = `0${newMonth}`;
    let newDay = newDate.getDate();

    // NEW START DATE
    let startSplit = times[startIndex].split(':');
    let newStartHour = startSplit[0];
    let newStartMin = startSplit[1].split(' ')[0];
    let newStartDate = new Date(
      newYear,
      newMonth,
      newDay,
      newStartHour,
      newStartMin
    );

    // todo: setEndDate

    // NEW END TIME
    if (Number(height) < 0) height = 0;
    let h = height.substring(0, height.length - 2);
    h /= 50;
    let endTime = times[startIndex + h];

    let endSplit = times[startIndex + h].split(':');
    let newEndHour = endSplit[0];
    let newEndMin = endSplit[1].split(' ')[0];
    let newEndDate = new Date(newYear, newMonth, newDay, newEndHour, newEndMin);

    // let newEndDate = new Date(newYear, NewMonth, newDay, '00', '00', '00');

    // UPDATE STATE
    setStartTime(times[startIndex]);
    setEndTime(endTime);
    setStartDate(newStartDate);
    setendDate(newEndDate);
    setDay(days[x]);
    updateBlocks();
  };

  const handleResize = (e, dir, refToElement, d) => {
    let { transform, height } = refToElement.style;
    let x = transform.split('(')[1];
    x = x.split('px')[0];
    let y = transform.split(', ')[1];
    y = y.substring(0, y.length - 3);
    let start = times[y / 50];
    let h = height.substring(0, height.length - 2);
    h /= 50;
    let startIndex = times.indexOf(start);
    let newEndTime = times[startIndex + h];
    if (newEndTime && newEndTime !== startTime) {
      setEndTime(newEndTime);
    }

    // todo: setStartDate
    // todo: setEndDate
    updateBlocks();
  };

  const toggleRecurring = () => {
    setRecurring((recurring) => !recurring);
    updateBlocks();
  };
  return (
    <Rnd
      style={{
        // background: 'white',
        border: '1px solid black',
        position: 'relative',
        zIndex: invisible ? '-1' : '1',
      }}
      className={`rnd-item recurring-${recurring}`}
      bounds='parent'
      resizeGrid={[0, 50]}
      dragGrid={[120, 50]}
      enableResizing={{ bottom: true }}
      resizeHandleClasses={{ bottom: 'drag-bottom' }}
      default={{
        x: xDefault,
        y: t,
        width: 120,
        height: `${e}px`,
      }}
      onDragStop={handleDrag}
      onResizeStop={handleResize}
    >
      <div>
        <p>
          {day}-{title}
        </p>

        <button className='delete-btn' onClick={handleDestroy}>
          X
        </button>
        <p>
          {startTime} - {endTime}
        </p>
        <button onClick={toggleRecurring}>R</button>
      </div>
    </Rnd>
  );
};

export default Dnd;
