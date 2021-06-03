import "./App.css";
import "./styles/themes.css";
import React, { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import SigninScreen from "./screens/SigninScreen";
import SignupScreen from "./screens/SignupScreen";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header/Header";
import ContentScreen from "./screens/ContentScreen";
import {  signin, validateToken } from "./slices/userSlice";

function App(props) {
  const [theme, setTheme] = useState("dark");
  const { userInfo } = useSelector((state) => state.user);


  const dispatch = useDispatch();
  const toggleTheme = () => {
    setTheme(theme == "dark" ? "light" : "dark");
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(validateToken());
    }
    else{
      dispatch(signin({username:"guest1",password:"1234guest"}));
    }
  }, []);

  return (
    <Router>
      <div className={`App ${theme}`}>
        
        <Header userInfo={userInfo} toggleTheme={toggleTheme} />
        <main className="app-main">
          <Switch>
            <Route exact path="/signin" name="Signin Page">
              <SigninScreen />
            </Route>
            <Route exact path="/signup" name="Signup Page">
              <SignupScreen />
            </Route>
            <PrivateRoute name="Home" path="/">
              <ContentScreen />
            </PrivateRoute>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
