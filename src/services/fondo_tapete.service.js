import axios from "axios";
import http from '../http-common';

class FondoTapeteService {

    findAll(data) {
        return axios.get(http.URL_FONDOTAPETE_FIND, data);
    }
  

}

export default new FondoTapeteService();