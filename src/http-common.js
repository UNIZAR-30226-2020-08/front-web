const BACK_IP = "las10ultimas-backend.herokuapp.com"; // 148.3.47.50
const BACK_PORT = "443"; // 8000
const BACK_PROTOCOL = "https";
const BASE_URL = BACK_PROTOCOL+"://"+BACK_IP+":"+BACK_PORT+"/api/";
module.exports = {
  AUTH_TOKEN: "auTh-Token-sTr726445",
  AUTH_SECRET: "C0ntra5enya-s3creta-t0ken",
  URL_REALTIME: "https://las10ultimas-backend-realtime.herokuapp.com/",
  URL_AUTH_SIGNIN: BASE_URL + "auth/signin/",
  URL_AUTH_SIGNUP: BASE_URL + "auth/signup/",
  URL_USER_UPDATE: BASE_URL + "usuario/updateUser/",
  URL_USER_FIND: BASE_URL + "usuario/findUser/",
  URL_USER_FINDALL: BASE_URL + "usuario/findAll/",
  URL_USER_DELETE: BASE_URL + "usuario/dropUser/",
  URL_AMIGO_FINDALL: BASE_URL + "amigo/findAll/",
  URL_AMIGO_CREATE: BASE_URL + "amigo/",
  URL_AMIGO_ACCEPT: BASE_URL + "amigo/acceptFriend/",
  URL_AMIGO_DELETE: BASE_URL + "amigo/dropFriend/",
  URL_AMIGO_LISTSOLICITUDES: BASE_URL + "amigo/listRequest/",
  URL_TORNEO_FINDALL: BASE_URL + "torneo/findAllTournament/",
  URL_TORNEO_FIND: BASE_URL + "torneo/findTournament/",
  URL_FONDOCARTA_FIND: BASE_URL + "fondo_carta/findAllCardsBack",
  URL_FONDOTAPETE_FIND: BASE_URL + "fondo_tapete/findAllRugsCard",
  URL_FOTOPERFIL_FINDALL: BASE_URL + "foto_perfil/findAllProfilePictures",
  URL_PARTIDA_GETALL: BASE_URL + "partida/findAllGames/",
  URL_PARTIDA_HISTORIAL: BASE_URL + "partida/listarHistorial/",
  URL_PARTIDA_CREATE: BASE_URL + "partida/"
};

