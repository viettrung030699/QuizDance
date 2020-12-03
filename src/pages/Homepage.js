import React, { Fragment, useState, useEffect } from "react";

//import axios from "axios";
import { Redirect } from "react-router-dom";

import "./Homepage.scss";
import { Footer } from "../components/footer/FooterPage";
import axios from "axios";

export const Homepage = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://quizdance.herokuapp.com/api/all-session"
      );
      setData(result.data);
    };
    fetchData();
  }, []);
  if (localStorage.getItem("user") === "true") {
    return <Redirect to="/Student" />;
  }
  const onLogin = () => {
    const id = document.getElementById("gameID").value;

    data.forEach((element) => {
      if (element.id === id) {
        localStorage.setItem("user", true);
        localStorage.setItem("classId", element.classId);
        localStorage.setItem("sessionId", id);
      } else {
        console.log("abs");
      }
    });
  };
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
