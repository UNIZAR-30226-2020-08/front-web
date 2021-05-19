import axios from "axios";
import http from '../http-common';

class FotoPerfilService {

    findAll(data) {
        return axios.get(http.URL_FOTOPERFIL_FINDALL, data);
    }
  

}

export default new FotoPerfilService();