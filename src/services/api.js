import axios from "axios";

const API = {};

async function asyncFunc(classID) {
  // fetch data from a url endpoint
  const response = await axios.get(
    "https://quizdance.herokuapp.com/api/search-student-class/".concat(classID)
  );
  const data = await response.json();

  return data;
}
export { API, asyncFunc };
