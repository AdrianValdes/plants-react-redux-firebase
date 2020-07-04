import React from 'react';
import { connect } from 'react-redux';

const IdentifyPlantResults = ({
  identifiedPlant: {
    scientificNameWithoutAuthor,
    err,
    commonNames,
    family,
    genus,
  },
}) => {
  console.log(scientificNameWithoutAuthor);
  console.log(err);
  console.log(commonNames);
  console.log(family.scientificNameWithoutAuthor);
  console.log(genus.scientificNameWithoutAuthor);

  return err ? (
    <div>There has been an error: {err} </div>
  ) : (
    <div className="container">
      <div>{scientificNameWithoutAuthor}</div>

      <div>
        {commonNames.map((name) => (
          <div>{name} </div>
        ))}
      </div>

      <div>{family.scientificNameWithoutAuthor}</div>
      <div>{genus.scientificNameWithoutAuthor}</div>
    </div>
  );
};

const mapStateToProps = ({ identifiedPlant }) => {
  return { identifiedPlant };
};
export default connect(mapStateToProps)(IdentifyPlantResults);
