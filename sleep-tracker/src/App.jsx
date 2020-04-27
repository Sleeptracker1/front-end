import React from "react";
import { Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import DashContainer from "./components/dashboard/dashContainer";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <Route path="/user-dashboard" component={DashContainer} />
      </ThemeProvider>
    </div>
  );
}

export default App;
