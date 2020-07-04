import { showLoading, hideLoading } from 'react-redux-loading';

export const IDENTIFY_PLANT = 'IDENTIFY_PLANT';
export const IDENTIFY_PLANT_ERROR = 'IDENTIFY_PLANT_ERROR';

function identifyPlant(plantData) {
  return {
    type: IDENTIFY_PLANT,
    plantData,
  };
}

function identifyPlantError(err) {
  return {
    type: IDENTIFY_PLANT_ERROR,
    err,
  };
}

export function handleIdentifyPlant(selectedPicture, organValue) {
  return async (dispatch) => {
    let apiKey = '2a10fPPhvbHD2cAR0tYSOb16O';
    let corsProxy = 'https://cors-anywhere.herokuapp.com/';
    let form = new FormData();
    form.append('organs', organValue);
    form.append('images', selectedPicture);

    dispatch(showLoading());

    try {
      let reply = await fetch(
        corsProxy +
          'https://my-api.plantnet.org/v2/identify/all?api-key=' +
          apiKey,
        {
          body: form,
          method: 'POST',
        }
      );
      let response = await reply.json();

      //let gbif = response.results[0].gbif.id;

      dispatch(identifyPlant(response.results[0].species));
      
      dispatch(hideLoading());
    } catch (err) {
      console.log(err);
      dispatch(identifyPlantError(err.message));
    }
  };
}
