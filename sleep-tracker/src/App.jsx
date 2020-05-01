import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { ThemeProvider } from "styled-components";
import { DashStyles } from "./styled-component/dashboardContainer";
import { lightTheme, darkTheme } from "./styled-component/theme";
import DashContainer from "./components/dashboard/dashContainer";
import SleepDisplay from "./components/dashboard/dashContent/SleepDisplay";
import SleepEntryForm from "./components/dashboard/dashContent/SleepEntryForm";
import PrivateRoute from "./utils/PrivateRoute";
import LoginForm from "./components/Forms/LoginForm";
import RegistrationForm from "./components/Forms/RegistrationForm";
import StaticContainer from "./components/dashboard/staticContainer";
function App({ loggedIn }) {
  return (
    <div className="App">
      <ThemeProvider theme={lightTheme}>
        <DashStyles />
        <Route exact path="/" component={LoginForm} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/register" component={RegistrationForm} />
        <Switch>
          <PrivateRoute
            exact
            path="/user-dashboard"
            component={DashContainer}
          />
          <PrivateRoute
            exact
            path="/add-sleep-routine"
            component={StaticContainer}
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
