import React, { useState } from 'react';
import { handleIdentifyPlant } from '../actions/identifyAction';
import { connect } from 'react-redux';
import { hideLoading, showLoading } from 'react-redux-loading';
import IdentifyPlantResults from './IdentifyPlantResults';

const IdentifyPlant = ({ handleIdentifyAction, history, identifiedPlant }) => {
  const [plantOrgan, setPlantOrgan] = useState('leaf');
  const [plantFile, setplantFile] = useState({});

  const handleIdentifyPlant = () => {
    handleIdentifyAction(plantFile, plantOrgan);
    //history.push('/identifiedPlant');
  };

  const handleRadioChange = (e) => {
    setPlantOrgan(e.target.value);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    showLoading();
    setplantFile(file);
    hideLoading();
  };
  if (identifiedPlant.scientificNameWithoutAuthor) {
    return (
      <IdentifyPlantResults
        identifiedPlant={identifiedPlant}
        plantFile={plantFile}
      />
    );
  } else {
    return (
      <div className="main-search">
        <div className="field">
          <div className="control" onChange={handleRadioChange}>
            <label className="radio">
              <input
                type="radio"
                name="plant"
                value="leaf"
                defaultChecked={true}
              />
              Leaves
            </label>
            <label className="radio">
              <input type="radio" name="plant" value="flower" />
              Flowers
            </label>
          </div>
          <div className="field">
            <div className="file is-centered is-boxed  is-success has-name">
              <label className="file-label">
                <input
                  onChange={handleFile}
                  className="file-input"
                  type="file"
                  name="photoURL"
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-camera-retro"></i>
                  </span>
                  <span className="file-label">Take a picture</span>
                </span>
                {/*   <span className="file-name">
                Screen Shot 2017-07-29 at 15.54.25.png
              </span> */}
              </label>
            </div>
          </div>
          <button
            onClick={handleIdentifyPlant}
            className="button is-success is-active"
          >
            Identify
          </button>
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = {
  handleIdentifyAction: handleIdentifyPlant,
  hideLoading: hideLoading,
  showLoading: showLoading,
};

const mapStateToProps = ({ identifiedPlant }) => {
  return { identifiedPlant: identifiedPlant };
};
export default connect(mapStateToProps, mapDispatchToProps)(IdentifyPlant);
