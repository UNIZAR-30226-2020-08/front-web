/*Proyecto:     Las10últimas
//Fecha:        marzo-2021
//Autor:        WBDevelopment
//Módulo:       Front-end del sistema Las10últimas
//Fichero:      Home.js
//Descripción:  Pagina de inicio del sistema Las10últimas*/

import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import Application from '../application.module.scss'
import Chat from "../Chat"

/*const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2rem",
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));*/

export default function Game() {
  //const classes = useStyles();
  const [background,setBackground] = React.useState("/images/tapete1.jpg");

  return (
    <div className={Application.container}>
      <div className={Application.board}>
        <img src={background} className={Application.img}/>
      </div>
      <Chat className={Application.chat}/>
    </div>
  );
}
