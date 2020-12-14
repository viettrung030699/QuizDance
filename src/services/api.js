import axios from "axios";

const API = axios.create({
  baseURL: 'https://quizdance.herokuapp.com/api'
});

export { API };
