import axios from "axios";
import http from '../http-common';

class UserService {

  update(data) {
    console.log(data.username);
    console.log(data.email);
    console.log(data.password);
    return axios.put(http.URL_USER_UPDATE + data.username, data); 
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new UserService();