import axios from "axios";
import http from '../http-common';

class PartidaService {
  getAll(tipo) {
    return axios
      .get(http.URL_PARTIDA_GETALL + tipo)
      .then(response => {
        return response.data;
      });
  }

  create(data) {
    // tipo, nombre y password
    return axios
      .post(http.URL_PARTIDA_CREATE,data)
      .then(response => {
        return response.data;
      });
  }
}

export default new PartidaService();