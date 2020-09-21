import React, { useState } from 'react';
import './Dnd.scss';
import { Rnd } from 'react-rnd';

const Dnd = ({ data, destroy, week, days, times }) => {
  const [day, setDay] = useState(data.day);
  const [startTime, setStartTime] = useState(data.start);
  const [endTime, setEndTime] = useState(data.end);
  const [title, setTitle] = useState(data.title);

  let t = times.indexOf(data.start);
  let e = times.indexOf(data.end);
  e = e - t;
  e *= 50;
  t *= 50;

  let xDefault = days.indexOf(data.day) * 120;

  const handleDestroy = () => {
    destroy(data.id);
  };

  const handleDrag = (e, el) => {
    let { node } = el;
    let { transform, height, width } = node.style;
    let elX = el.x;
    elX -= 60;
    let x = Math.ceil(elX / 120);
    let y = transform.split(', ')[1];
    y = y.substring(0, y.length - 3);
    y = Number(y);
    if (y < 0) y += 2400;
    if (y < 50 && y > -50) y = 0;
    let startIndex = Math.ceil(y / 50);
    setStartTime(times[startIndex]);
    if (Number(height) < 0) height = 0;
    let h = height.substring(0, height.length - 2);
    h /= 50;
    let endTime = times[startIndex + h];
    setEndTime(endTime);
    setDay(days[x]);
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
    let endTime = times[startIndex + h];
    setEndTime(endTime);
  };
  return (
    <Rnd
      style={{
        // background: 'white',
        border: '1px solid black',
        position: 'relative',
      }}
      className='rnd-item'
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
      <div style={{ color: 'black' }}>
        <p>
          {day}-{title}
        </p>

        <button className='delete-btn' onClick={handleDestroy}>
          X
        </button>
        <p>
          {startTime} - {endTime}
        </p>
      </div>
    </Rnd>
  );
};

export default Dnd;
