const {
  ADD_PLANT,
  ADD_PLANT_ERROR,
  SET_PLANTS,
  DELETE_PLANT,
} = require('../actions/plantActions');

export default function plantReducer(state = [], action) {
  switch (action.type) {
    case ADD_PLANT:
      return state.concat([action.payload]);
    case ADD_PLANT_ERROR:
      return { ...state, err: action.err };
    case DELETE_PLANT:
      return state.filter(({ plantId }) => plantId !== action.plantId);
    case SET_PLANTS:
      return action.payload;
    default:
      return state;
  }
}
