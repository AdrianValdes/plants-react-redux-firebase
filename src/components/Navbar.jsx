import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarLinks from './NavbarLinks';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <nav className="navbar " role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img alt="logo" src="/img/logo_Plant.png" width="30" height="50" />
          </Link>

          <div
            onClick={() => {
              setIsActive(!isActive);
            }}
            role="button"
            className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>

        <div
          id="navbarBasicExample"
          className={`navbar-menu ${isActive ? 'is-active' : ''}`}
        >
          <div className="navbar-start">
            <Link
              onClick={() => {
                setIsActive(!isActive);
              }}
              to="/documentation"
              className="navbar-item"
            >
              Documentation
            </Link>

            <div className="navbar-item has-dropdown is-hoverable">
              <div
                className="navbar-link"
                onClick={() => {
                  setIsActive(!isActive);
                }}
              >
                More
              </div>

              <div className="navbar-dropdown">
                <Link
                  onClick={() => {
                    setIsActive(!isActive);
                  }}
                  to="/about"
                  className="navbar-item"
                >
                  About
                </Link>

                <Link
                  onClick={() => {
                    setIsActive(!isActive);
                  }}
                  to="/contact"
                  className="navbar-item"
                >
                  Contact
                </Link>
                <hr className="navbar-divider" />
                <Link
                  onClick={() => {
                    setIsActive(!isActive);
                  }}
                  to="/report"
                  className="navbar-item"
                >
                  Report an issue
                </Link>
              </div>
            </div>
          </div>

          <NavbarLinks setIsActive={setIsActive} isActive={isActive} />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
