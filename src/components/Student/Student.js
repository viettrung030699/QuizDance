import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//import "../../pages/Homepage.scss";
import "./Student.scss";

export const Student = () => {
  const classId = localStorage.getItem("classId");
  const [data, setData] = useState({});
  const [value, setValue] = useState();

  
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

  // const studentInfos = Object.values(data.studentInfo);
  // console.log(studentInfos);
  return (
    <div className="Homepage student">
      <div className="context">
        <h1 className="height10">Number of students: {data.length}</h1>

        <ol className="student-list">
          {listStudent.map((item, i) => (
            <li key={item.id + 1}>
              <h3>
                <Link
                  to={`/Doquiz:play=${true}`}
                  onClick={() => {
                    localStorage.setItem("id", item.studentId);
                    setValue({});
                  }}
                >
                  {item.studentId} - {data[i++].studentInfo.name}
                </Link>
              </h3>
            </li>
          ))}
        </ol>
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
