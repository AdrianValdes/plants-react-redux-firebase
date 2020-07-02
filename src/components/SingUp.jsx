import React, { useState } from 'react';
import { connect } from 'react-redux';
import { handleSignUp } from '../actions/authActions';

const SingUp = ({ handleSignUp, history }) => {
  const [values, setValues] = useState({});

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp(values);
    document.getElementById('authForm').reset();
    history.push('/garden');
  };
  return (
    <React.Fragment>
      <div className="section is-fullheight">
        <div className="container">
          <div className="column is-4 is-offset-4">
            <div className="box">
              <form
                className="container is fluid"
                onSubmit={handleSubmit}
                id={'authForm'}
              >
                <div className="field">
                  <label className="label">Username</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      onChange={handleChange}
                      className="input is-success"
                      type="text"
                      name="name"
                      placeholder="Text input"
                      value={values.name || ''}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user"></i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"></i>
                    </span>
                  </div>
                </div>
                <div className="field ">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      onChange={handleChange}
                      className="input"
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={values.email || ''}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      onChange={handleChange}
                      className="input"
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={values.password || ''}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <button className=" button is-block is-info is-fullwidth">
                      Login
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = {
  handleSignUp: handleSignUp,
};
export default connect(null, mapDispatchToProps)(SingUp);
