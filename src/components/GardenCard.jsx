import React, { useState, useEffect } from 'react';
import { handleDeletePlant, handleModifyPlant } from '../actions/plantActions';
import { connect } from 'react-redux';
import moment from 'moment';
import GardenCardNotification from './GardenCardNotification';

const GardenCard = ({
  data,
  plantId,
  handleDeletePlant,
  handleModifyPlant,
}) => {
  const [needsWater, setNeedsWater] = useState(false);
  const [needsFert, setNeedsFert] = useState(false);

  const {
    lastFert,
    lastWater,
    waterPeriod,
    fertPeriod,
    plantName,
    plantType,
  } = data;

  let nextWaterDate =
    moment(lastWater).valueOf() + 1000 * 60 * 60 * 26.9 * waterPeriod;

  let timeToNextWater = moment(nextWaterDate).fromNow();
  let needsWatering = moment().diff(nextWaterDate);

  let nextFertilizingDate =
    moment(lastFert).valueOf() + 1000 * 60 * 60 * 24 * fertPeriod;
  let timeToNextFertilizing = moment(nextFertilizingDate).fromNow();
  let needsFertilizing = moment().diff(nextFertilizingDate);

  useEffect(() => {
    if (needsWatering > 0) {
      setNeedsWater(true);
    } else {
      setNeedsWater(false);
    }

    if (needsFertilizing > 0) {
      setNeedsFert(true);
    } else {
      setNeedsFert(false);
    }
  }, [needsWatering, needsFertilizing]);

  const handleWatering = (lastWaterOrFert) => {
    const now = moment();
    const lastWater = now.format('YYYY-MM-DD');

    const modifyWaterOrFert = { [lastWaterOrFert]: lastWater };

    console.log(modifyWaterOrFert);

    handleModifyPlant(modifyWaterOrFert, plantId);
  };
  return (
    <React.Fragment key={plantId}>
      <div className="column is-4">
        <div className="card ">
          <div className="card-image ">
            <figure className="image is-1by1">
              <img
                src={data.photoURL ? data.photoURL : '/img/placeholder_img.png'}
                alt="Placholder"
                style={{
                  objectFit: 'cover',
                }}
              />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img src={'/img/placeholder_img.png'} alt="Placeholder" />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4 no-padding">{plantName}</p>

                <p className="subtitle is-6">{plantType}</p>
              </div>
            </div>
            <div className="content">
              {/*      <p>Watering Period: {waterPeriod}</p>
              <p>Fertilizing Period: {fertPeriod}</p> */}
              <p>
                Next Watering: {timeToNextWater}
                <span
                  className="icon is-small has-text-success tooltip"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleWatering('lastWater')}
                >
                  <i className="fas fa-tint"></i>
                  <span className="tooltiptext">Watered now!</span>
                </span>
              </p>
              <p>
                Next Fertilizing: {timeToNextFertilizing}{' '}
                <span
                  className="icon is-small has-text-success tooltip "
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleWatering('lastFert')}
                >
                  <i className="fas fa-globe-americas "></i>
                  <span className="tooltiptext">Fertilized now!</span>
                </span>
              </p>
            </div>
            <div className="field is-grouped is-grouped-right">
              <p className="control">
                <button
                  onClick={() => handleDeletePlant(plantId)}
                  className="button is-danger is-outlined"
                >
                  <span>Delete</span>
                  <span className="icon is-small">
                    <i className="fas fa-times"></i>
                  </span>
                </button>
              </p>
              <p className="control">
                <button className="button  is-outlined is-link">
                  <span>Modify</span>
                  <span className="icon is-small">
                    <i className="fas fa-edit"></i>
                  </span>
                </button>
              </p>
            </div>
            {needsWater || needsFert ? (
              <GardenCardNotification
                needsFert={needsFert}
                needsWater={needsWater}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = {
  handleDeletePlant: handleDeletePlant,
  handleModifyPlant: handleModifyPlant,
};
export default connect(null, mapDispatchToProps)(GardenCard);
