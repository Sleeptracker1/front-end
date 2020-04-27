import React from "react";
import { Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import DashContainer from "./components/dashboard/dashContainer";
import SleepLogForm from "./components/sleepLog/sleepLogForm/sleepLogForm";
import { DashStyles } from "./styled-component/dashboardContainer";
import { lightTheme, darkTheme } from "./styled-component/theme";
function App() {
  return (
    <div className="App">
      <SleepLogForm />

      {/* <ThemeProvider theme={lightTheme}>
        <DashStyles />
        <Route path="/user-dashboard" component={DashContainer} />
      </ThemeProvider> */}
    </div>
  );
}

export default App;
