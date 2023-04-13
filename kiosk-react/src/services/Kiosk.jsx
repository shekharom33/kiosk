import axios from "axios";
const baseUrl = "http://localhost:5000/kiosk";

const getCustomerSurvey = () => {
  return axios.get(`${baseUrl}/customer-survey`);
};

export default {
  getCustomerSurvey,
};
