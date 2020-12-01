import axios from "axios";
import React, { useState, useEffect } from "react";

export const Student = () => {
  const [data, setData] = useState({ studentList: {} });
  const [query, setQuery] = useState("SPM101");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://quizdance.herokuapp.com/api/search-student-class/SPM101"
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  const listStudent = Object.values(data);
  return (
    <ul>
      {listStudent.map((item) => (
        <li key={item.id+1}>
          <a href={item.studentId}>{item.studentId}</a>
        </li>
      ))}
    </ul>
  );
};
