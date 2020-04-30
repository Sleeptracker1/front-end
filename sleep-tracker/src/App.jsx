import React from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { ThemeProvider } from "styled-components";
import DashContainer from "./components/dashboard/dashContainer";
import { DashStyles } from "./styled-component/dashboardContainer";
import { lightTheme, darkTheme } from "./styled-component/theme";
import SleepDisplay from "./components/dashboard/dashContent/SleepDisplay";
import AddEditSleepForm from "./components/dashboard/dashContent/AddEditSleepForm";
import PrivateRoute from "./components/PrivateRoute";
import LoginForm from "./components/Forms/LoginForm";
import RegistrationForm from "./components/Forms/RegistrationForm";

function App({ loggedIn }) {
  return (
    <div className="App">
      <ThemeProvider theme={lightTheme}>
        <DashStyles />
        <ul>
          <li>
            <PrivateRoute to={"/user-dashboard"}>User Dashboard</PrivateRoute>
          </li>

          <li>
            <Route to={"/sleep-routine"}>Sleep Routine</Route>
          </li>
          <li>
            <PrivateRoute to={"/add-sleep-routine"}>
              Add Sleep Routine
            </PrivateRoute>
          </li>
        </ul>
        <Route exact path="/" component={LoginForm} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/register" component={RegistrationForm} />
        <Switch>
          <Route
            exact
            path="/user-dashboard"
            component={DashContainer}
          />
          <Route exact path="/sleep-routine" component={SleepDisplay} />

          <Route
            exact
            path="/add-sleep-routine"
            component={AddEditSleepForm}
          />

        </Switch>
      </ThemeProvider>
    </div>
  );
}
const mapState = (state) => ({
  loggedIn: state.auth.loggedIn,
});
export default connect(mapState, null)(App);
