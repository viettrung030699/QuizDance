import React from "react";
import { Redirect } from "react-router-dom";

import "./Homepage.scss";
import { Footer } from "../components/footer/FooterPage";

const onLogin = () => {
  const id = document.getElementById("gameID").value;
  if (id === "123") {
    return localStorage.setItem("user", true);
  } else {
    console.log("abcs");
  }
};

export const Homepage = () => {
  if (localStorage.getItem("user") === "true") {
    return <Redirect to="/LecturerView" />;
  }
  return (
    <div className="Homepage">
      <div className="context">
        <h1 className="height10">Quiz Dance</h1>
        <div className="enterForm">
          <form onSubmit={onLogin}>
            <input type="text" placeholder="Quiz ID" id="gameID"></input>
            <button type="submit" className="enter-btn">
              ENTER
            </button>
          </form>
        </div>
        <Footer />
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
