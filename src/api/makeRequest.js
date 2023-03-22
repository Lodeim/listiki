import axios from "axios";
import { getError } from "../utils";

const API_ENDPOINT = "https://api.react-learning.ru";

export const makeRequest = (config) => {
  config.url = `${API_ENDPOINT}${config.url}`;
  config.headers = {
    'content-type': 'application/json',
    Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE1MTI4YWFhMzk3MTIxODM5MWI3YjIiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc5MTc1NDY2LCJleHAiOjE3MTA3MTE0NjZ9.cT5LPJ6RfR4TpCADQ477n7emNWWxvghJO74mB9mVM7g"
}
  return axios(config).catch((err) => getError(err));
};
