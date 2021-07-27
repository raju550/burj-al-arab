import React, { useContext } from "react";
import firebase from "firebase/app";
import firebaseConfig from "./firebase.Config";
import "firebase/auth";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

const Login = () => {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [loginInUser, setLoginInUser] = useContext(UserContext);
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  const handleClick = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { displayName, email } = result.user;
        const signInUser = { name: displayName, email };
        setLoginInUser(signInUser);
        history.replace(from);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
      });
  };
  return (
    <div>
      <h1>This is Login</h1>
      <button onClick={handleClick}>sign in google</button>
    </div>
  );
};

export default Login;
