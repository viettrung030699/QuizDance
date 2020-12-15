import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/style.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { Homepage } from "./pages/Homepage";
import { LecturerView } from "./components/Lecturer/LecturerSite";
import { Student } from "./components/Student/Student";
import Management from "./pages/Management/Management";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Management} />
          <Route path="/LecturerView" component={LecturerView} />
          <Route path="/Student" component={Student} />
          <Route path="/admin" component={Management} />
          {/* <Redirect to="/admin"/> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
