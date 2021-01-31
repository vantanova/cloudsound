import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import ProfilePage from "./components/ProfilePage";
import HomePage from "./components/HomePage";
import * as sessionActions from "./store/session";
import * as sessionProfileActions from "./store/profile";
import Navigation from "./components/Navigation";
import UploadPage from "./components/UploadPage";
import SongPage from "./components/SongPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route screen exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route screen path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/upload">
            <UploadPage />
          </Route>
          <Route path="/songs">
            <SongPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
