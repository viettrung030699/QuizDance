import React from "react";
import { Link } from "react-router-dom";
import "./FooterPage.scss";
import "../Lecturer/LecturerSite";

export const Footer = () => {
  return (
    <div className="main-footer">
      <div className="container">
        <h3>
          <Link to="/admin">Create Quiz</Link>
        </h3>
      </div>
    </div>
  );
};
