import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import GardenCard from './GardenCard';

function Garden({ authedUser, plants }) {
  if (authedUser) {
    return (
      <React.Fragment>
        <div className="container is-fluid">
          <div className="section">
            <div className="columns">
              <div className="column has-text-centered">
                <h1 className="title">This is your garden</h1>
                <br />
              </div>
            </div>
          </div>
          <div id="app" className="row columns is-multiline">
            {plants.map(({ data, plantId }) => (
              <React.Fragment key={plantId}>
                <GardenCard plantId={plantId} data={data} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
  return <Redirect to="home" />;
}

const mapStateToProps = (state) => {
  return {
    authedUser: state.authedUser,
    plants: state.plants,
  };
};

export default connect(mapStateToProps)(Garden);
