const BACK_IP = "localhost";
const BACK_PORT = "8080";
const BACK_PROTOCOL = "http";
const BASE_URL = BACK_PROTOCOL+"://"+BACK_IP+":"+BACK_PORT+"/api/";
module.exports = {
  AUTH_TOKEN: "auTh-Token-sTr726445",
  AUTH_SECRET: "C0ntra5enya-s3creta-t0ken",
  URL_AUTH_SIGNIN: BASE_URL + "auth/signin/",
  URL_AUTH_SIGNUP: BASE_URL + "auth/signup/",
  URL_AUTH_UPDATEUSER: BASE_URL + "auth/editprofile/",
  URL_PARTIDA_GETALL: BASE_URL + "partida/findAllGames/",
};