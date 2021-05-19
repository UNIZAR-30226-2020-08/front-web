import axios from "axios";
import http from '../http-common';

class TorneoService {

    findAll(data) {
        return axios.get(http.URL_TORNEO_FINDALL + data.tipo + "/" + data.npart, data);
    }

}

export default new TorneoService();