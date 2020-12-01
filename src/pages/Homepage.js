import React, { Fragment, useState, useEffect } from "react";

//import axios from "axios";
import { Redirect, Link } from "react-router-dom";

import "./Homepage.scss";
import { Footer } from "../components/footer/FooterPage";
import { Student } from "../components/Student/Student";
import axios from "axios";

const onLogin = () => {
  const id = document.getElementById("gameID").value;
  if (id === "SPM101") {
    localStorage.setItem("user", true);
  } else {
    alert("Wrong ID");
    console.log("abcs");
  }
};

export const Homepage = () => {
  if (localStorage.getItem("user") === "true") {
    return <Redirect to="/Student" />;
  }
  // const [data, setData] = useState({});
  // const [query, setQuery] = useState("SPM101");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios(
  //       "https://quizdance.herokuapp.com/api/search-student-class/SPM101"
  //     );
  //     setData(result.data);
  //     console.log(result.data);
  //   };
  //   fetchData();
  // }, []);
  return (
    <div className="Homepage">
      <div className="context">
        <h1 className="height10">Quiz Dance</h1>
        <div className="enterForm">
          <Fragment>
            <form onSubmit={onLogin}>
              <input type="text" placeholder="Quiz ID" id="gameID"></input>
              <button type="submit" className="enter-btn">
                ENTER
              </button>
            </form>
          </Fragment>
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
