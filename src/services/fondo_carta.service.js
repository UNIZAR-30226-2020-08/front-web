import axios from "axios";
import http from '../http-common';

class FondoCartaService {

    findAll(data) {
        return axios.get(http.URL_FONDOCARTA_FIND, data);
    }
  

}

export default new FondoCartaService();