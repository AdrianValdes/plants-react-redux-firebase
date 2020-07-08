import {
  IDENTIFY_PLANT,
  IDENTIFY_PLANT_ERROR,
} from '../actions/identifyAction';

export default function identifyReducer(state = {}, action) {
  switch (action.type) {
    case IDENTIFY_PLANT:
      return action.plantData;
    case IDENTIFY_PLANT_ERROR:
      return { IdentificationError: action.err };
    default:
      return state;
  }
}
