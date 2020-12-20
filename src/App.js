import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/style.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { LecturerView } from "./components/Lecturer/LecturerSite";
import { Student } from "./components/Student/Student";
const App = () => {
  const [reload, setReload] = useState("true");
  
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Homepage} />

          <Route path="/Student" component={Student} />
          <Route
            path= {`/Doquiz:play=${reload}`}
            component={LecturerView}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
