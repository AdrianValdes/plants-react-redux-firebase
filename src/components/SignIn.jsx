import React, { useState } from 'react';
import { connect } from 'react-redux';
import { handleSignIn } from '../actions/authActions';
import { Redirect } from 'react-router';

const SingIn = ({ authedUser, err, handleSignIn }) => {
  const [values, setValues] = useState({});

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignIn(values);
  };
  if (authedUser) return <Redirect to="/garden" />;
  return (
    <React.Fragment>
      <div className="section is-fullheight">
        <div className="container">
          <div className="column is-4 is-offset-4">
            <div className="box">
              <form className="container is fluid" onSubmit={handleSubmit}>
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
  handleSignIn: handleSignIn,
};

const mapStateToProps = (state) => {
  return { authedUser: state.authedUser, err: state.auth.err };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingIn);
