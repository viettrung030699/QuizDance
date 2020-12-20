import React, { Fragment } from "react";
import QRCode from "qrcode.react";
//import axios from "axios";
import { useParams } from "react-router-dom";

import "../../Homepage.scss";

export const Quiz = () => {
  const { quizId } = useParams()
  return (
    <div className="Homepage" style={{ width: "1277px" }}>
      <div className="context" style={{ top: "10vh", width: "1277px" }}>
        <div className="enterForm">
          <Fragment>
            <h2>Scan this</h2>
            <QRCode
              value={`https://spm-project-30b55.web.app/`}
              includeMargin
              size={300}
            />
            <h2>
              Or join
              <a href="https://spm-project-30b55.web.app/">
                https://spm-project-30b55.web.app/
              </a>
            </h2>
            <h2>and enter the game ID</h2>
            <h2>
              <u>{quizId}</u>
            </h2>
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
