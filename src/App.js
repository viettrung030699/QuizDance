import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/style.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateCV from "./pages/create-cv";
import { Homepage } from "./pages/Homepage";
import { LanguageProvider } from "./contexts/Languages";
import { FontProvider } from "./contexts/FontFamily";
import ColorProvider from "./contexts/colorProvider";
import FontSizeProvider from "./contexts/fontSizeProvider";

function App() {
  return (
    <LanguageProvider>
      <FontProvider>
        <ColorProvider>
          <FontSizeProvider>
            <div className="App">
              <Router>
                <Switch>
                  <Route path="/" exact component={Homepage} />
                </Switch>
              </Router>
            </div>
          </FontSizeProvider>
        </ColorProvider>
      </FontProvider>
    </LanguageProvider>
  );
}

export default App;
