import React from 'react';
import { connect } from 'react-redux';
import { showLoading, hideLoading } from 'react-redux-loading';
import { handleAddPlant } from '../actions/plantActions';
import { generateId, uploadPhoto } from '../utils/helpers';

const IdentifyPlantResults = ({
  identifiedPlant: {
    scientificNameWithoutAuthor: plantName,
    err,
    commonNames,
    family: { scientificNameWithoutAuthor: plantType },
    genus,
  },
  plantFile,
  handleAddPlant,
  history,
}) => {
  const handleModifiedPlant = (plantName, plantType) => {
    let values = { plantName, plantType };
    uploadPhoto(plantFile).then((downloadURL) => {
      handleAddPlant({ ...values, photoURL: downloadURL });
      hideLoading();
    });

    history.push('/garden');
  };

  let theImage = URL.createObjectURL(plantFile);
  return err ? (
    <div>There has been an error: {err} </div>
  ) : (
    <React.Fragment>
      <div className="column is-4">
        <div className="card ">
          <div className="card-image ">
            <figure className="image is-1by1">
              <img
                src={theImage}
                alt="Identified Plant"
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
              <p className="title is-5">Common Names</p>
              {commonNames.map((name) => (
                <div key={generateId()}>{name} </div>
              ))}
            </div>
            <div className="field is-grouped is-grouped-right">
              <p className="control">
                <button className="button is-danger is-outlined">
                  <span>Delete</span>
                  <span className="icon is-small">
                    <i className="fas fa-times"></i>
                  </span>
                </button>
              </p>
              <p className="control">
                <button
                  onClick={() => handleModifiedPlant(plantName, plantType)}
                  className="button  is-outlined is-link"
                >
                  <span>Add to garden</span>
                  <span className="icon is-small">
                    <i className="fas fa-edit"></i>
                  </span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ identifiedPlant }) => {
  return { identifiedPlant };
};
const mapDispatchToProps = {
  handleAddPlant: handleAddPlant,
  hideLoading: hideLoading,
  showLoading: showLoading,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IdentifyPlantResults);
