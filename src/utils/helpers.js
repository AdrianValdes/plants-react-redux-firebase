import { storage } from '../config/firebaseConfig';
export function generateId() {
  return (
    Math.random().toString(36).substring(2) + new Date().getTime().toString(36)
  );
}

export const uploadPhoto = (file) => {
  //UPLOAD PICTURE
  // Get the file
  // let file = e.target.files[0];
  //Create a storage ref
  let randomPictureName = generateId();
  let storageRef = storage.ref('plants_pictures/' + randomPictureName);
  //Upload file
  let uploadTask = storageRef.put(file);
  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      function progress() {},
      function error(err) {
        console.log('There has been an error: ', err);
      },
      function complete() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          resolve(downloadURL);
        });
      }
    );
  });
};
