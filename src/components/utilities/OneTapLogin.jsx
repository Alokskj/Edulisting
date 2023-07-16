import React, { useContext, useEffect } from 'react';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { UserContext } from '../Contexts/UserContext';
import { saveUserInFirebase } from './saveUserInFirebase';

const useOneTapLogin = (isLoading, currentUser, setCurrentUser) => {
  useEffect(() => {
    const handleSuccess = async (credentialResponse) => {
      const token = credentialResponse.credential;

      const result = await signInWithCredential(
        auth,
        GoogleAuthProvider.credential(token)
      );

      saveUserInFirebase(setCurrentUser, setLoading);
    };

    const handleError = () => {
      console.log("Login Failed");
    };

    if (!isLoading && !currentUser) {
      const options = {
        onSuccess: handleSuccess,
        onError: handleError,
      };

      // Perform the necessary logic to initiate Google One-Tap login
      // For example, you can add the Google One-Tap library to your HTML file
      // and use it to trigger the login flow when appropriate.

      // Example:
      // window.google.accounts.id.initialize(options);
      // window.google.accounts.id.prompt();

      // Make sure to cleanup any resources if needed

      return () => {
        // Clean up any resources if needed
      };
    }
  }, [isLoading, currentUser, setCurrentUser]);
};

const OneTapLogin = () => {
  const { currentUser, isLoading, setCurrentUser } = useContext(UserContext);

  useOneTapLogin(isLoading, currentUser, setCurrentUser);

  return null; // Or return any JSX you need for the component
};

export default OneTapLogin;
