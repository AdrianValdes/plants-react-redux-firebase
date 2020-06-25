import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <nav className="navbar " role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img alt="logo" src="/img/logo_Plant.png" width="30" height="50" />
          </a>

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
            <Link to="/" className="navbar-item">
              Home
            </Link>

            <Link to="/documentation" className="navbar-item">
              Documentation
            </Link>

            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-link">More</div>

              <div className="navbar-dropdown">
                <Link to="/about" className="navbar-item">
                  About
                </Link>

                <Link to="/contact" className="navbar-item">
                  Contact
                </Link>
                <hr className="navbar-divider" />
                <Link to="/report" className="navbar-item">
                  Report an issue
                </Link>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button className="button is-primary">
                  <strong>Sign up</strong>
                </button>
                <button className="button is-light">Log in</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
