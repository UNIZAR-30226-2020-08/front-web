import axios from "axios";
import http from '../http-common';

class UserService {

  update(data) {
    return axios.put(http.URL_USER_UPDATE + data.username, data); 
  }

  find(data) {
    return axios.get(http.URL_USER_FIND + data.username, data);
  }

  delete(data) {
    return axios.delete(http.URL_USER_DELETE + data.username, data); 
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new UserService();