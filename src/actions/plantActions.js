import { db } from '../config/firebaseConfig';
import { showLoading, hideLoading } from 'react-redux-loading';
export const ADD_PLANT = 'ADD_PLANT';
export const ADD_PLANT_ERROR = 'ADD_PLANT_ERROR';
export const DELETE_PLANT = 'DELETE_PLANT';
export const DELETE_PLANT_ERROR = 'DELETE_PLANT_ERROR';
export const MODIFY_PLANT = 'MODIFY_PLANT';
export const MODIFY_PLANT_ERROR = 'MODIFY_PLANT_ERROR';
export const SET_PLANTS = 'SET_PLANTS';

function addPlant(plantObject) {
  return {
    type: ADD_PLANT,
    payload: plantObject,
  };
}

function addPlantError(err) {
  return {
    type: ADD_PLANT_ERROR,
    err,
  };
}

export function handleAddPlant(plant) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());
    db.collection('users')
      .doc(authedUser)
      .collection('plants')
      .add({
        ...plant,
      })
      .then((docRef) => {
        let plantObject = {
          data: { ...plant },
          plantId: docRef.id,
        };
        dispatch(addPlant(plantObject));
        dispatch(hideLoading());
      })
      .catch((err) => {
        dispatch(addPlantError(err.message));
      });
  };
}

function deletePlant(plantId) {
  return {
    type: DELETE_PLANT,
    plantId,
  };
}

function deletePlantError(err) {
  return {
    type: DELETE_PLANT_ERROR,
    err,
  };
}

export function handleDeletePlant(plantId) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    db.collection('users')
      .doc(authedUser)
      .collection('plants')
      .doc(plantId)
      .delete()
      .then(() => dispatch(deletePlant(plantId)))
      .catch((err) => {
        dispatch(deletePlantError(err));
      });
  };
}

function modifyPlant(lastWaterOrFert, plantId) {
  return {
    type: MODIFY_PLANT,
    lastWaterOrFert,
    plantId,
  };
}

export function handleModifyPlant(lastWaterOrFert, plantId) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    db.collection('users')
      .doc(authedUser)
      .collection('plants')
      .doc(plantId)
      .update(lastWaterOrFert)
      .then(() => {
        dispatch(modifyPlant(lastWaterOrFert, plantId));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
}

export function setPlants(plantsArray) {
  return {
    type: SET_PLANTS,
    payload: plantsArray,
  };
}
