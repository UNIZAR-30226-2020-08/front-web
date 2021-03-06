import axios from "axios";
import http from '../http-common';

class AmigoService {

  findAll(data) {
      return axios.get(http.URL_AMIGO_FINDALL + data.username, data);
  }

  listarSolicitudes(data) {
    return axios.get(http.URL_AMIGO_LISTSOLICITUDES + data.username, data);
  } 

  aceptar(data) {
    return axios.put(http.URL_AMIGO_ACCEPT + data.username + "/" + data.amigoname, data);
  }

  create(data) {
    return axios.post(http.URL_AMIGO_CREATE, data); 
  }
  
  delete(data) {
    return axios.delete(http.URL_AMIGO_DELETE + data.username + "/" + data.amigoname, data);
  }

  

}

export default new AmigoService();