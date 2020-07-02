import React, { useState } from 'react';
import { showLoading, hideLoading } from 'react-redux-loading';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { handleAddPlant } from '../actions/plantActions';
import { storage } from '../config/firebaseConfig';

function AddPlant({
  authedUser,
  handleAddPlant,
  history,
  hideLoading,
  showLoading,
}) {
  const [values, setValues] = useState({});
  const [fileName, setFileName] = useState('');

  const handleFile = (e) => {
    setFileName(e.target.files[0].name);
    showLoading();
    //UPLOAD PICTURE
    // Get the file
    let file = e.target.files[0];
    //Create a storage ref
    let storageRef = storage.ref('plants_pictures/' + file.name);
    //Upload file
    let uploadTask = storageRef.put(file);
    uploadTask.on(
      'state_changed',
      function progress(snapshot) {
        /*  var percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploader.value = percentage; */
      },
      function error(err) {
        console.log('There has been an error: ', err);
      },
      function complete() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          setValues({ ...values, photoURL: downloadURL });
          hideLoading();
        });
      }
    );
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

  if (authedUser) {
    return (
      <div className="container">
        <h1 className="title">AddPlant</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <div className="field-body">
              <div className="field">
                <p className="control is-expanded has-icons-left">
                  <input
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
                <p className="control is-expanded has-icons-left has-icons-right">
                  <input
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
          </div>

          <div className="field">
            <div className="field-body">
              <div className="field">
                <p className="control is-expanded has-icons-left">
                  <input
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
              <div className="field">
                <p className="control is-expanded has-icons-left has-icons-right">
                  <input
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
            </div>
          </div>

          <div className="field">
            <div className="field-body">
              <div className="field">
                <p className="control is-expanded has-icons-left">
                  <input
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
                <p className="control is-expanded has-icons-left ">
                  <input
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
          </div>

          <div className="file has-name">
            <label className="file-label">
              <input
                onChange={handleFile}
                className="file-input"
                type="file"
                name="photoURL"
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Choose a picture…</span>
              </span>
              <span
                dangerouslySetInnerHTML={createMarkup()}
                className="file-name"
              ></span>
            </label>
            {/* <progress className="progress is-primary" value="0" max="100">
              15%
            </progress> */}
          </div>
          <div className="field is-grouped is-grouped-right">
            <p className="control">
              <button className="button is-primary">Submit</button>
            </p>
            <p className="control">
              <button className="button is-light">Cancel</button>
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
