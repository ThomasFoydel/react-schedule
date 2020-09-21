import React, { useState } from 'react';

const AddBlock = ({ submit }) => {
  const [form, setForm] = useState({});
  const change = () => {};
  const handleSubmit = () => {
    submit(form);
  };
  return (
    <div>
      <input
        type='time'
        onChange={(e) => setStartTime(e.target.value)}
        id='startTime'
        value={startTime}
      />
      <input
        type='time'
        onChange={(e) => setEndTime(e.target.value)}
        id='endTime'
        value={endTime}
      />
      <input type='text' />
      <button onClick={handleSubmit}>add</button>
    </div>
  );
};

export default AddBlock;

/*      

      start: '3:00 AM',
      end: '9:30 AM',
      day: 'Thursday',
      title: 'bingo',
      id: 2,

*/
