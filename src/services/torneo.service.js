import axios from "axios";
import http from '../http-common';

class TorneoService {

    create(data) {
        return axios.post(http.URL_TORNEO_CREATE,data).then(response => {return response.data;});
     }
    findAll(data) {
        return axios.get(http.URL_TORNEO_FINDALL + data.tipo + "/" + data.npart, data);
    }
    find(data) {
        return axios.get(http.URL_TORNEO_FIND + data.torneo, data);
    }
    matchRound(data) {
        return axios.put(http.URL_TORNEO_MATCHROUND + data.torneo + "/" + data.ronda, data);
      }
}

export default new TorneoService();