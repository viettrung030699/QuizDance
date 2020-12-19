import React, { Fragment } from "react";
import QRCode from "qrcode.react";
//import axios from "axios";
import { useParams } from "react-router-dom";

import "../../Homepage.scss";

export const Quiz = () => {
  const { quizId } = useParams()
  return (
    <div className="Homepage">
      <div className="context" style={{top:'10vh'}}>
        <div className="enterForm">
          <Fragment>
            <h2>Scan this</h2>
            <QRCode value={`quizdance.web.app/${quizId}`} includeMargin size={300} />
            <h2>Or join <a href='quizdance.web.app'>quizdance.web.app</a></h2>
            <h2>and enter the game ID</h2>
            <h2><u>{quizId}</u></h2>
          </Fragment>
        </div>
      </div>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};
