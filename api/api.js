import axios from "axios";

export const url = "https://evening-taiga-77378-89620bc6562b.herokuapp.com";


export const apiRequest = (method, path, data) => {
  return axios
    [method](`${url}${path} `, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};
