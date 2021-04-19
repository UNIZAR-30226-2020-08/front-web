import axios from "axios";
import http from '../http-common';

class UserService {

  update(data) {
    return axios.put(http.URL_USER_UPDATE + data.username, data); 
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new UserService();