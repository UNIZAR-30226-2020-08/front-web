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
}

export default new PartidaService();