import {
  SIGN_UP_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT,
  SIGN_OUT_ERROR,
} from '../actions/authActions';
import { auth } from '../config/firebaseConfig';

export default function authReducer(state = {}, action) {
  let uid;
  if (auth.currentUser) uid = auth.currentUser.uid;
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      return { ...state, uid };
    case SIGN_UP_ERROR:
      return { ...state, err: action.err };
    case SIGN_IN_SUCCESS:
      return { ...state, uid, err: null };
    case SIGN_IN_ERROR:
      return { ...state, err: action.err };
    case SIGN_OUT:
      return { ...state, uid: null };
    case SIGN_OUT_ERROR:
      return { ...state, err: action.err };
    default:
      return state;
  }
}
