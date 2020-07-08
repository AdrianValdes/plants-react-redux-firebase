import React, { useState } from 'react';
import { showLoading, hideLoading } from 'react-redux-loading';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { handleAddPlant } from '../actions/plantActions';

import { uploadPhoto } from '../utils/helpers';

function AddPlant({
  authedUser,
  handleAddPlant,
  history,
  hideLoading,
  showLoading,
}) {
  const [values, setValues] = useState({});
  const [fileName, setFileName] = useState('');
  const [disableFile, setDisableFile] = useState(true);
  const [disableCheckBox, setDisableCheckBox] = useState(false);

  const [notAllowed, setNotAllowed] = useState(false);

  const handleUploadPhoto = (e) => {
    if (e.target.files[0] === undefined) return;

    setFileName(e.target.files[0].name);
    showLoading();
    setDisableFile(true);

    uploadPhoto(e.target.files[0]).then((downloadURL) => {
      setValues({ ...values, photoURL: downloadURL });
      hideLoading();
      setDisableFile(false);
      setDisableCheckBox(true);
    });
  };

  function createMarkup() {
    return { __html: `${fileName}` };
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleAddPlant(values);

    history.push('/garden');
  };

  const handleOnBlur = (e) => {
    if (e.target.value === '') {
      e.target.className = 'input is-danger';
    } else {
      e.target.className = 'input';
    }
  };
  const isDisabled = () => {
    const {
      plantName,
      plantType,
      fertPeriod,
      waterPeriod,
      lastFert,
      lastWater,
    } = values;

    if (
      !plantName ||
      !plantType ||
      !fertPeriod ||
      !waterPeriod ||
      !lastFert ||
      !lastWater ||
      disableFile
    ) {
      return true;
    }
    return false;
  };
  const handleFileIsDisable = () => {
    setDisableFile((prevState) => !prevState);
    setNotAllowed((prevState) => !prevState);
  };

  if (authedUser) {
    return (
      <div className="container">
        <h1 className="title">AddPlant</h1>
        <form id="add-plant-form" onSubmit={handleSubmit}>
          <div className="field">
            <div className="field">
              <label className="label">Plant Name</label>
              <p className="control is-expanded has-icons-left">
                <input
                  onBlur={(e) => handleOnBlur(e)}
                  onChange={handleChange}
                  name="plantName"
                  value={values.plantName || ''}
                  className="input"
                  type="text"
                  placeholder="Plant Name"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-seedling"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <label className="label">Plant Type</label>
              <p className="control is-expanded has-icons-left has-icons-right">
                <input
                  onBlur={(e) => handleOnBlur(e)}
                  onChange={handleChange}
                  name="plantType"
                  value={values.plantType || ''}
                  className="input"
                  type="text"
                  placeholder="Plant Type"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-tree"></i>
                </span>
              </p>
            </div>
          </div>
          <div className="field">
            <label className="label">Watering Period</label>
            <p className="control is-expanded has-icons-left has-icons-right">
              <input
                onBlur={(e) => handleOnBlur(e)}
                onChange={handleChange}
                name="waterPeriod"
                value={values.waterPeriod || ''}
                className="input"
                type="number"
                placeholder="
Watering Period in days"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-hand-holding-water"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <div className="field">
              <label className="label">Fertilizing Period</label>
              <p className="control is-expanded has-icons-left">
                <input
                  onBlur={(e) => handleOnBlur(e)}
                  onChange={handleChange}
                  name="fertPeriod"
                  value={values.fertPeriod || ''}
                  className="input"
                  type="number"
                  placeholder="Fertilizing Period in days"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-globe-americas"></i>
                </span>
              </p>
            </div>
          </div>
          <div className="field">
            <div className="field">
              <label className="label">Last date of watering</label>
              <p className="control is-expanded has-icons-left">
                <input
                  onBlur={(e) => handleOnBlur(e)}
                  onChange={handleChange}
                  name="lastWater"
                  value={values.lastWater || ''}
                  className="input"
                  type="date"
                  placeholder="Last Watering"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-seedling"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <label className="label">Last date of fertilizing</label>
              <p className="control is-expanded has-icons-left ">
                <input
                  onBlur={(e) => handleOnBlur(e)}
                  onChange={handleChange}
                  name="lastFert"
                  value={values.lastFert || ''}
                  className="input"
                  type="date"
                  placeholder="Last Fertilizing"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-tree"></i>
                </span>
              </p>
            </div>
          </div>
          <div className="file has-name file-button">
            <label
              className={notAllowed ? 'file-label not-allowed' : 'file-label'}
            >
              <input
                disabled={notAllowed}
                onChange={handleUploadPhoto}
                className="file-input"
                type="file"
                name="photoURL"
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span
                  className={
                    notAllowed ? 'file-label not-allowed' : 'file-label'
                  }
                >
                  Choose a picture…
                </span>
              </span>

              <span
                dangerouslySetInnerHTML={createMarkup()}
                className="file-name"
              ></span>
            </label>
          </div>
          <div className="field">
            <div className="control">
              <label disabled={disableCheckBox} className="checkbox">
                <input
                  onClick={handleFileIsDisable}
                  type="checkbox"
                  disabled={disableCheckBox}
                />{' '}
                No picture
              </label>
            </div>
          </div>
          <div className="field is-grouped is-grouped-right">
            <p className="control">
              <button className="button is-success" disabled={isDisabled()}>
                Submit
              </button>
            </p>
            <p className="control">
              <button
                onClick={() => {
                  history.push('/garden');
                }}
                type="button"
                className="button is-danger"
              >
                Cancel
              </button>
            </p>
          </div>
        </form>
      </div>
    );
  }
  return <Redirect to="home" />;
}

const mapStateToProps = (state) => {
  return {
    authedUser: state.authedUser,
  };
};
const mapDispatchToProps = {
  handleAddPlant: handleAddPlant,
  hideLoading: hideLoading,
  showLoading: showLoading,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddPlant);
