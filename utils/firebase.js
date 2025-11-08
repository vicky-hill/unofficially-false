import { initializeApp } from "firebase/app"
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBIbq4UfJM9zzTy6rP5CxoQQjUsPFwi8fs",
  authDomain: "bubbles-676e0.firebaseapp.com",
  projectId: "bubbles-676e0",
  storageBucket: "bubbles-676e0.firebasestorage.app",
  messagingSenderId: "226369701903",
  appId: "1:226369701903:web:797bf1f2bcdc3e01cc7b7a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
// Add authorization to firebase project to use auth features

export const authorization = {
  resetPassword: (options, email) => async () => {
    const [success, failure] = options.types;
    const promise = (resolve, reject) => {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          resolve({
            type: success
          });
        })
        .catch(err => {
          console.log(err)
          reject({
            type: failure,
            payload: err.message
          });
        });
    }

    return new Promise(promise);
  }
}