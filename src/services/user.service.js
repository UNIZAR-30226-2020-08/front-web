import axios from "axios";
import http from '../http-common';

class UserService {

  update(data) {
    return axios.put(http.URL_USER_UPDATE + data.username, data); 
  }

  find(data) {
    return axios.get(http.URL_USER_FIND + data.username, data);
  }
  findAll(data) {
    return axios.get(http.URL_USER_FINDALL, data);
  }

  delete(data) {
    return axios.delete(http.URL_USER_DELETE + data.username, data); 
  }
}

export default new UserService();