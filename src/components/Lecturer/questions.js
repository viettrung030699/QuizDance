import axios from "axios";

export const getList = () => {
  alert("get")
  return axios(
    "https://quizdance.herokuapp.com/api/list-question/".concat(
      localStorage.getItem("sessionId")
    )
  );
};
