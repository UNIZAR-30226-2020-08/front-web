const BACK_IP = "148.3.47.50"; // 148.3.47.50
const BACK_PORT = "8000"; // 8000
const BACK_PROTOCOL = "http";
const BASE_URL = BACK_PROTOCOL+"://"+BACK_IP+":"+BACK_PORT+"/api/";
module.exports = {
  AUTH_TOKEN: "auTh-Token-sTr726445",
  AUTH_SECRET: "C0ntra5enya-s3creta-t0ken",
  URL_AUTH_SIGNIN: BASE_URL + "auth/signin/",
  URL_AUTH_SIGNUP: BASE_URL + "auth/signup/",
  URL_USER_UPDATE: BASE_URL + "usuario/updateUser/",
  URL_USER_FIND: BASE_URL + "usuario/findUser/",
  URL_PARTIDA_GETALL: BASE_URL + "partida/findAllGames/",
  URL_PARTIDA_CREATE: BASE_URL + "partida/"
};

