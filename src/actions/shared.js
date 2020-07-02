import { auth, db } from '../config/firebaseConfig';
import { setAuthedUser } from './authActions';
import { setPlants } from './plantActions';
import { showLoading, hideLoading } from 'react-redux-loading';

export function handleInitialData() {
  return (dispatch) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setAuthedUser(user.uid));
        dispatch(showLoading());

        db.collection('users')
          .doc(user.uid)
          .collection('plants')
          .get()
          .then((querySnapshot) => {
            let plantsArray = [];
            querySnapshot.docs.map((doc) =>
              plantsArray.push({ data: doc.data(), plantId: doc.id })
            );
            dispatch(setPlants(plantsArray));
          })
          .then(() => dispatch(hideLoading()));
      }
    });
  };
}
