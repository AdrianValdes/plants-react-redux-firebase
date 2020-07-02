import authReducer from './authReducer';
import { combineReducers } from 'redux';
import plantReducer from './plantReducer';
import authedUser from './authedUser';
import { loadingBarReducer } from 'react-redux-loading';
const rootReducer = combineReducers({
  auth: authReducer,
  plants: plantReducer,
  authedUser,
  loadingBar: loadingBarReducer,
});

export default rootReducer;
