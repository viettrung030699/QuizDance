import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./LecturerSite.scss";

export const LecturerView = () => {
  const onCancel = () => {
    localStorage.setItem("user", false);
    console.log("demooo");
    const axios = require("axios").default;
    axios({
      method: "post",
      url: "https://quizdance.herokuapp.com/api/new-record/",
      data: {
        attendance: true,
        quizPts: localStorage.getItem("result"),
        studentId: localStorage.getItem("id"),
        sessionId: localStorage.getItem("sessionId"),
      },
    }).then(function (response) {
      console.log(response.data);
    });
  };

  const questions = [
    {
      questionText: "What is the capital of France?",
      answerOptions: [
        { answerText: "New York", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Dublin", isCorrect: false },
      ],
    },
    {
      questionText: "Who is CEO of Tesla?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Bill Gates", isCorrect: false },
        { answerText: "Tony Stark", isCorrect: false },
      ],
    },
    {
      questionText: "The iPhone was created by which company?",
      answerOptions: [
        { answerText: "Apple", isCorrect: true },
        { answerText: "Intel", isCorrect: false },
        { answerText: "Amazon", isCorrect: false },
        { answerText: "Microsoft", isCorrect: false },
      ],
    },
    {
      questionText: "How many Harry Potter books are there?",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true },
      ],
    },
    {
      questionText: "1 + 1 = ? ",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "2", isCorrect: true },
        { answerText: "3", isCorrect: false },
        { answerText: "4", isCorrect: false },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [currentTime, setSeconds] = useState(15);
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentTime > 0) {
        setSeconds((seconds) => {
          if (seconds > 0) {
            return seconds - 1;
          } else {
            return (seconds = 15);
          }
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

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      localStorage.setItem("result", score+1);
    }
  };
  return (
    <div className="Lecturer-View">
      <div className="Lecturer-Screen">
        {/* HINT: replace "false" with logic to display the 
      score when the user has answered all the questions */}
        {showScore ? (
          <div className="score-section">
            You scored {score} out of {questions.length}
            <div className="cancel-btn">
              <Link to="/" onClick={onCancel}>
                Cancel
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="question-section">
              <div className="question-count">
                {currentTime}
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text">
                {questions[currentQuestion].questionText}
              </div>
            </div>
            <div className="answer-section">
              {questions[currentQuestion].answerOptions.map((answerOption) => (
                <button
                  key={answerOption.answerText}
                  onClick={() =>
                    handleAnswerOptionClick(answerOption.isCorrect)
                  }
                >
                  {answerOption.answerText}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
