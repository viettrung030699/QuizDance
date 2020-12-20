import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

import { Link } from "react-router-dom";
import "./LecturerSite.scss";
import io from "socket.io-client";
const socket = io("http://quizdance.herokuapp.com");
const axios = require("axios").default;

export const LecturerView = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [currentTime, setSeconds] = useState(30);
  const [list, setList] = useState();
  const [checklist, setChecklist] = useState(false);
  const [show, setShow] = useState(false);
  const [leaderboard, setLeaderboard] = useState({});

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://quizdance.herokuapp.com/api/list-question/".concat(
          localStorage.getItem("sessionId")
        )
      );
      setList(result.data);
      setChecklist(true);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentTime > 0) {
        setSeconds((seconds) => {
          if (seconds > 0) {
            return seconds - 1;
          }
        });
        if (currentTime === 1) {
          handleAnswerOptionClick(false);
          if (currentQuestion + 1 < list.length) {
            setCurrentQuestion(currentQuestion + 1);
          } else {
            setShowScore(true);
          }
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTime]);
  const handleAnswerOptionClick = (isCorrect) => {
    const nextQuestion = currentQuestion + 1;

    let time = list[currentQuestion].countdown;
    setSeconds(time);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (nextQuestion < list.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  const onCancel = () => {
    localStorage.setItem("user", false);
    let dataResult = {
      attendance: true,
      quizPts: score * 10,
      studentId: localStorage.getItem("id"),
      sessionId: localStorage.getItem("sessionId"),
    };
    axios({
      method: "post",
      url: "https://quizdance.herokuapp.com/api/new-record/",
      data: {
        attendance: true,
        quizPts: score * 10,
        studentId: localStorage.getItem("id"),
        sessionId: localStorage.getItem("sessionId"),
      },
    })
      .then(function (response) {
        alert("Finish");
        socket.emit("Done quiz", dataResult);
        socket.emit("Show leaderboard", localStorage.getItem("sessionId"));

        socket.on("Return leaderboard", (data) => {
          setLeaderboard(data);
          setShow(true);
        });
        localStorage.clear();
      })
      .catch(console.error());
  };
  return (
    <div className="Lecturer-View">
      <div className="Lecturer-Screen">
        {/* HINT: replace "false" with logic to display the 
      score when the user has answered all the questions */}
        {showScore ? (
          <div className="score-section">
            <div className="score">
              You scored {score} out of {list.length}
            </div>
            <div className="cancel-btn">
              <Button
                variant="primary"
                onClick={onCancel}
                className="cancel-btn"
              >
                Leaderboard
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>LEADERBOARD</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ul style={{ display: "flex", flexDirection: "column" }}>
                    {Object.values(leaderboard).map((item, i) => (
                      <li key={item.id}>
                        <h3>
                          {++i} - {item.studentId} - {item.quizPts}
                        </h3>
                      </li>
                    ))}
                  </ul>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={handleClose}>
                    <Link to="/" style={{color: "#ffffff"}}>Return Homepage</Link>
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        ) : checklist ? (
          <>
            <div className="question-section">
              <div className="question-count">
                <span>
                  Question {currentQuestion + 1}/{list.length}
                </span>
                <p>
                  {currentTime > 0
                    ? currentTime
                    : list[currentQuestion].countdown}
                </p>
              </div>
              <div className="question-text">
                {list[currentQuestion].question}
              </div>
            </div>
            <div className="answer-section">
              {list[currentQuestion].answers.map((answers) => (
                <button
                  key={answers.answerText}
                  onClick={() => handleAnswerOptionClick(answers.isCorrect)}
                >
                  {answers.answerText}
                </button>
              ))}
            </div>
          </>
        ) : (
          console.log("false")
        )}
      </div>
    </div>
  );
};
