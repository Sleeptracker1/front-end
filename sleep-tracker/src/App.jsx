import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import DashContainer from "./components/dashboard/dashContainer";
import SleepLogForm from "./components/sleepLog/sleepLogForm/sleepLogForm";
import { DashStyles } from "./styled-component/dashboardContainer";
import { lightTheme, darkTheme } from "./styled-component/theme";
import { Grommet } from "grommet";
import SleepDisplay from "./components/dashboard/dashContent/SleepDisplay";
import AddEditSleepForm from "./components/dashboard/dashContent/AddEditSleepForm";
import Links from "./components/dashboard/dashSidebar/Links";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <div className="App">
      <Grommet plain>
        <ThemeProvider theme={lightTheme}>
          <DashStyles />
          <ul>
            <li>
              <Link to={"/user-dashboard"}>User Dashboard</Link>
            </li>

            <li>
              <Link to={"/sleep-routine"}>Sleep Routine</Link>
            </li>
            <li>
              <Link to={"/add-sleep-routine"}>Add Sleep Routine</Link>
            </li>
          </ul>

          <Switch>
            <PrivateRoute
              exact
              path="/user-dashboard"
              component={DashContainer}
            />
            <PrivateRoute
              exact
              path="/sleep-routine"
              component={SleepDisplay}
            />
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

export default App;

{/* < Route exact path="/" component={LoginForm} />
< Route exact path="/registration" component={RegistrationForm} />  */}