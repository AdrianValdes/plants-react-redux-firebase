import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleSignOut } from '../actions/authActions';

const NavbarLinks = ({ authedUser, handleSignOut, setIsActive, isActive }) => {
  if (authedUser) {
    return (
      <div className="navbar-end">
        <div className="navbar-item">
          <Link
            onClick={() => {
              setIsActive(!isActive);
            }}
            to="/identifyPlant"
          >
            Identify Plant
          </Link>
        </div>
        <div className="navbar-item">
          <Link
            onClick={() => {
              setIsActive(!isActive);
            }}
            to="/garden"
          >
            Garden
          </Link>
        </div>
        <div className="navbar-item">
          <Link
            onClick={() => {
              setIsActive(!isActive);
            }}
            to="/addPlant"
          >
            Add Plant
          </Link>
        </div>
        <div className="navbar-item">
          <div className="buttons">
            <Link to="/">
              <button
                onClick={() => handleSignOut()}
                className="button is-primary"
              >
                <strong>Sign out</strong>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <Link to="/signup">
            <button className="button is-primary">
              <strong>Sign up</strong>
            </button>
          </Link>
          <Link to="/signin">
            <button className="button is-light">Log in</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authedUser: state.authedUser,
  };
};

const mapDispatchToProps = {
  handleSignOut: handleSignOut,
};
export default connect(mapStateToProps, mapDispatchToProps)(NavbarLinks);
