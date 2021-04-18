import axios from "axios";
import AuthHeaderService from './auth-header.service';
import http from '../http-common';

class AuthenticationDataService {
  login(username, password) {
    return axios
      .post(http.URL_AUTH_SIGNIN, {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  signup(username,email,password) {
    return axios.post(http.URL_AUTH_SIGNUP, {username, email, password},{ headers: AuthHeaderService.authHeader() }); 
  }

  

  logout() {
    localStorage.removeItem("user");
    window.location.reload()
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthenticationDataService();