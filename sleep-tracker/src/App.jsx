import React from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { ThemeProvider } from "styled-components";
import DashContainer from "./components/dashboard/dashContainer";
import { DashStyles } from "./styled-component/dashboardContainer";
import { lightTheme, darkTheme } from "./styled-component/theme";
import { Grommet } from "grommet";
import SleepDisplay from "./components/dashboard/dashContent/SleepDisplay";
import AddEditSleepForm from "./components/dashboard/dashContent/AddEditSleepForm";
import Links from "./components/dashboard/dashSidebar/Links";
import PrivateRoute from "./components/PrivateRoute";
import LoginForm from "./components/Forms/LoginForm";
import RegistrationForm from "./components/Forms/RegistrationForm";

function App({ loggedIn }) {
  const { push } = useHistory();
  return (
    <div className="App">
      <Grommet plain>
        <ThemeProvider theme={lightTheme}>
          <DashStyles />
          <ul>
            <li>
              <PrivateRoute to={"/user-dashboard"}>User Dashboard</PrivateRoute>
            </li>

            <li>
              <PrivateRoute to={"/sleep-routine"}>Sleep Routine</PrivateRoute>
            </li>
            <li>
              <PrivateRoute to={"/add-sleep-routine"}>
                Add Sleep Routine
              </PrivateRoute>
            </li>
          </ul>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegistrationForm} />
          <Switch>
            <PrivateRoute exact path="/user-dashboard" component={DashContainer} />
            <PrivateRoute exact path="/sleep-routine" component={SleepDisplay} />
            <PrivateRoute
              exact
              path="/add-sleep-routine"
              component={AddEditSleepForm}
            />
          </Switch>
        </ThemeProvider>
      </Grommet>
    </div>
  );
}
const mapState = (state) => ({
  loggedIn: state.auth.loggedIn,
});
export default connect(mapState, null)(App);
