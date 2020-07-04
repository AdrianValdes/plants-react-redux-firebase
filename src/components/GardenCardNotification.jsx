import React from 'react';

const GardenCardNotification = ({ needsFert, needsWater }) => {
  return (
    <div
      className="notification is-danger is-light "
      style={{ position: 'absolute', right: '-5px', top: '0' }}
    >
      <p>
        <strong>{needsWater ? 'Needs Watering!' : ' '}</strong>
      </p>
      <p>
        <strong>{needsFert ? 'Needs Fertilizing!' : ''}</strong>
      </p>
    </div>
  );
};

export default GardenCardNotification;
