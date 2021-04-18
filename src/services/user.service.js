import axios from "axios";
import http from '../http-common';

class UserService {

  updateEmail(username,email) {
    return axios.put(http.URL_USER_UPDATEMAIL + username, {email:email}); 
  }

  updatePasswd(username,passwd) {
    return axios.put(http.URL_USER_UPDATEPASSWORD + username, {password:passwd}); 
  }
}

export default new UserService();