import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/style.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { LecturerView } from "./components/Lecturer/LecturerSite";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/LecturerView" component={LecturerView} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
