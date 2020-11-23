import React from "react";
import "./Homepage.scss";
import { Footer } from "../components/footer/FooterPage";

export const Homepage = () => {
  return (
    <div className="Homepage">
      <div className="context">
        <h1 className="height10">Quiz Dance</h1>
        <div className="enterForm">
          <form action="#">
            <input type="text" placeholder="Quiz ID"></input>
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
