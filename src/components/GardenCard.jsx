import React from 'react';
import { handleDeletePlant } from '../actions/plantActions';
import { connect } from 'react-redux';

const GardenCard = ({ data, plantId, handleDeletePlant }) => {
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
                <p className="title is-4 no-padding">{data.plantName}</p>

                <p className="subtitle is-6">{data.plantType}</p>
              </div>
            </div>
            <div className="content">
              <li>Watering Period: {data.waterPeriod}</li>
              <li>Fertilizing Period: {data.fertPeriod}</li>
              <li>Last Fertilizing: {data.lastFert}</li>
              <li>Last Watering: {data.lastWater}</li>
            </div>
            <div className="field is-grouped is-grouped-right">
              <button
                onClick={() => handleDeletePlant(plantId)}
                className="button is-danger is-outlined"
              >
                <span>Delete</span>
                <span className="icon is-small">
                  <i className="fas fa-times"></i>
                </span>
              </button>
              <button className="button  is-outlined is-link">
                <span>Modify</span>
                <span className="icon is-small">
                  <i className="fas fa-edit"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
const mapDispatchToProps = {
  handleDeletePlant: handleDeletePlant,
};
export default connect(null, mapDispatchToProps)(GardenCard);
