import axios from "axios";
import http from '../http-common';

class UserService {

  updatel(username,email,password) {
    return axios.put(http.URL_USER_UPDATE + username, {email:email, password:password}); 
  }
}

export default new UserService();