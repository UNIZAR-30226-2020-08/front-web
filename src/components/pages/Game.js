/*Proyecto:     Las10últimas
//Fecha:        marzo-2021
//Autor:        WBDevelopment
//Módulo:       Front-end del sistema Las10últimas
//Fichero:      Home.js
//Descripción:  Pagina de inicio del sistema Las10últimas*/

import React, {useRef} from 'react';
import { fade,makeStyles } from '@material-ui/core/styles';
import Application from '../application.module.scss'
import SelectGame from "../SelectGame"
import SelectRoom from "../SelectRoom"
import Tapete1 from "../Board1v1"
import Tapete2 from "../Board2v2"
import TapeteIA from "../BoardIA"
import Customize from "../Customize"
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Friends from '../Amigos'
import Tournaments from '../Torneos';
import AuthenticationDataService from "../../services/auth.service";
import { useHistory } from "react-router-dom";
import Chat from '../Chat/Chat';
import http from "../../http-common";
import io from "socket.io-client";

const socket = io(http.URL_REALTIME);

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  }
}));

export default function Game() {
  //const [background,setBackground] = React.useState("/images/tapete1.jpg");
  const classes = useStyles();
  const history = useHistory();
  const gamemodeRef = useRef(0);
  const [gamemode,setGamemode] = React.useState(0);
  const [room,setRoom] = React.useState("none");
  const roomName = React.useRef("none")
  const [matched,setMatched] = React.useState(false);
  //const [loaded,setLoaded] = React.useState(false);
  const user = AuthenticationDataService.getCurrentUser();
  const username = user ? user.data.username : "anonimus"
  const tapet = user ? "https://las10ultimas.herokuapp.com/images/"+user.data.f_tapete+".jpg" : "https://las10ultimas.herokuapp.com/images/tapete2.jpg";
  const selectGame = SelectGame(setGamemode,socket,username,setMatched,roomName,gamemodeRef);
  const selectRoom = SelectRoom(setRoom,setMatched,gamemode,socket,username,roomName);
  const chat=Chat(username,socket);
  const tapete2=Tapete2(socket,roomName,gamemodeRef);
  const tapete1=Tapete1(socket,roomName,gamemodeRef);
  const tapeteIA=TapeteIA(socket,roomName,gamemodeRef);

  /*if(!loaded){
    //scroll.scrollToTop();
    setLoaded(true);
  }*/

  return (
    <div className={Application.container}>
        { ! user ?
          history.push("/")
        : gamemode === 0 ?
          <div className={Application.board}>
            <img src="images/LOGO2.png" alt="logo las10ultimas" className={Application.icon}/>
            <h1 className={Application.header}>
              Selecciona un modo de juego
            </h1>
            {selectGame}
          </div>
          : gamemode === 1 ?
            matched ? 
            <div className={Application.board} style={{backgroundImage: `url(${tapet})`}}>  
              <h1 className={Application.header}>
                Partida individual online
              </h1>
              {tapete1}
            </div>
            : 
            <div className={Application.board}>  
              <h1 className={Application.header}>
                Partida individual online
              </h1>
              {selectRoom}
            </div>
          : gamemode === 2 ?
            matched ? 
            <div className={Application.board} style={{backgroundImage: `url(${tapet})`}}>  
              <h1 className={Application.header}>
                Partida por parejas online
              </h1>
              {tapete2}
            </div>
            :
            <div className={Application.board}>  
              <h1 className={Application.header}>
                Partida por parejas online
              </h1>
              {selectRoom}
            </div>
          : gamemode === 3 ?
          <div className={Application.board} style={{backgroundImage: `url(${tapet})`}}>  
            <h1 className={Application.header}>
              Partida contra la IA
            </h1>
            {tapeteIA}
          </div>
          :
          <div className={Application.board}>  
            <h1 className={Application.header}>
              Customizar
            </h1>
            <Customize />
          </div>
        }
      {! matched ?
      <div className={Application.chat}>
        <div className={Application.amigos}>
          <h1 className={Application.header}>
            Amigos
          </h1>
          {<Friends socket={socket} setMatched={setMatched} setGamemode={setGamemode} gamemode={gamemodeRef} username={username} roomName={roomName}/>}
        </div>
        <div className={Application.torneos}>
          <h1 className={Application.header}>
            Torneos
          </h1>
          <Tournaments socket={socket} setMatched={setMatched} setGamemode={setGamemode} gamemode={gamemodeRef} username={username} roomName={roomName}/>
        </div>
      </div>
      :
      <div className={Application.chat2}>
        {chat}
      </div>
      }
    </div>
  );
}
