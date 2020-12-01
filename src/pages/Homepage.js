import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import "./Homepage.scss";
import { Footer } from "../components/footer/FooterPage";
import { asyncFunc } from "../services/api";

const onLogin = () => {
  const id = document.getElementById("gameID").value;
  console.log(asyncFunc(id));
  if (id === "123") {
    return localStorage.setItem("user", true);
  } else {
    alert("Wrong ID");
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
