import authReducer from './authReducer';
import { combineReducers } from 'redux';
import plantReducer from './plantReducer';
import authedUser from './authedUser';
import { loadingBarReducer } from 'react-redux-loading';
import identifyReducer from './identifyReducer';
const rootReducer = combineReducers({
  auth: authReducer,
  plants: plantReducer,
  authedUser,
  loadingBar: loadingBarReducer,
  identifiedPlant: identifyReducer,
});

export default rootReducer;
