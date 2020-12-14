import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./LecturerSite.scss";

const axios = require("axios").default;

const onCancel = () => {
  localStorage.setItem("user", false);
  console.log("finish post");
  axios({
    method: "post",
    url: "https://quizdance.herokuapp.com/api/new-record/",
    data: {
      attendance: true,
      quizPts: localStorage.getItem("result"),
      studentId: localStorage.getItem("id"),
      sessionId: localStorage.getItem("sessionId"),
    },
  })
    .then(function (response) {
      alert("Finish");
      //console.log(response);
      localStorage.clear();
    })
    .catch(console.error());
};
export const LecturerView = () => {
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [currentTime, setSeconds] = useState(15);
  const [list, setList] = useState();
  const [checklist, setChecklist] = useState(false);
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
          return seconds > 0 ? seconds - 1 : (seconds = 15);
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTime]);
  const handleAnswerOptionClick = (isCorrect) => {
    let time = 15;
    setSeconds(time);
    const nextQuestion = currentQuestion + 1;

    if (isCorrect) {
      setScore(score + 1);
    }

    if (nextQuestion < list.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      localStorage.setItem("result", score * 10);
    }
  };
  return (
    <div className="Lecturer-View">
      <div className="Lecturer-Screen">
        {/* HINT: replace "false" with logic to display the 
      score when the user has answered all the questions */}
        {showScore ? (
          <div className="score-section">
            You scored {score} out of {list.length}
            <div className="cancel-btn">
              <Link to="/" onClick={onCancel}>
                Cancel
              </Link>
            </div>
          </div>
        ) : checklist ? (
          <>
            <div className="question-section">
              <div className="question-count">
                {currentTime}
                <span>Question {currentQuestion + 1}</span>/{list.length}
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
