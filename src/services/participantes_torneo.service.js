import axios from "axios";
import http from '../http-common';

class ParticipantesTorneoService {
    create(data) {
        return axios.post(http.URL_PARTICIPANTESTORNEO_CREATE, data); 
    }
}

export default new ParticipantesTorneoService();