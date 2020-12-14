import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//import "../../pages/Homepage.scss";
import "./Student.scss";

export const Student = () => {
  const classId = localStorage.getItem("classId");
  const [data, setData] = useState({ studentList: {} });
  const [keyword, setKeyword] = useState("");
  
  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };
  //Unable CORSE in Browser
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://quizdance.herokuapp.com/api/search-student-class/".concat(
          classId
        )
      );
      setData(result.data);
    };
    fetchData();
  }, [classId]);
  //searchITems
  const listStudent = Object.values(data);
  
  return (
    <div className="Homepage">
      <div className="context">
        <div className="searchID">
          <input
            type="text"
            value={keyword}
            placeholder="Search by studentID"
            onChange={handleInputChange}
          />
        </div>
        
        <ul>
          {listStudent.map((item) => (
            <li key={item.id + 1}>
              <Link
                to="/LecturerView"
                onClick={() => localStorage.setItem("id", item.studentId)}
              >
                {item.studentId}
              </Link>
            </li>
          ))}
        </ul>
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
