import React, { useState, useEffect } from 'react';
import Application from "./application.module.scss"
import Card from "./Card"
import Usuario from "./Usuario"
import Button from '@material-ui/core/Button';
import AuthenticationDataService from "../services/auth.service";

export default function Board(socket) {
  const user = AuthenticationDataService.getCurrentUser();
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [cartas,setCartas] = useState(['NO','NO','NO','NO','NO','NO']);
  const [cartalanzada,setCartalanzada] = useState('NO');
  const [jugada,setJugada] = useState(['NO','NO','NO'])
  console.log(user);
  const baraja = user ? user.data.f_carta : 'baraja1';

  useEffect(() => { 
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    socket.on("RepartirCartas", ({ cartas }) => {
      console.log(cartas);
      cartas.jugador = undefined;
      cartas.partida = undefined;
      setCartas(cartas);
    });
}, []);

  return (
    <div className={Application.tapete}>
     <div className={Application.controles1}>
      <h1 className={Application.header}>
        <Button variant="contained" className={Application.actionButton}>SALIR</Button>
        <Button variant="contained" className={Application.actionButton}>PAUSAR</Button>
      </h1>
     </div>
     <div className={Application.usuario1}>
      <Usuario
        nombre="AARXN17"
        copas={"300 🏆"}
        image="images/userlogo1.png"
      />
     </div>
     <div className={Application.carta1}>
      <Card
        src='images/baraja1/NO.png'
        text='As de Oros'
      />
     </div>
     <div className={Application.bazas1}>
      <Card
        src='images/baraja1/reverso.png'
        text='Tus Bazas'
      />
     </div>
     <div className={Application.usuario2}>
      <Usuario
        nombre="ANGELIK"
        copas={"216 🏆"}
        image="images/userlogo1.png"
      />
     </div>
     <div className={Application.carta2}>
      <Card
        src='images/baraja1/NO.png'
        text='Seis de Oros'
      />
     </div>
     <div className={Application.usuario3}>
      <Usuario
        nombre="DIEGGG"
        copas={"251 🏆"}
        image="images/userlogo1.png"
      />
     </div>
     <div className={Application.carta3}>
      <Card
        src='images/baraja1/NO.png'
        text='Cuatro de Oros'
      />
     </div>
     <div className={Application.mazo1}>
     <Card
        src='images/baraja1/dosbastos.png'
        text='Palo'
        alternative='1'
      />
     </div>
     <div className={Application.mazo2}>
      <Card
        src='images/baraja1/reverso.png'
        text='Tus Bazas'
      />
     </div>
     <div className={Application.controles2}>
      <h1 className={Application.header}>
        <Button variant="contained" className={Application.actionButton}>CANTAR</Button>
        <Button variant="contained" className={Application.actionButton}>CAMBIAR</Button>
        <Button variant="contained" className={Application.actionButton}>ROBAR</Button>
      </h1>
     </div>
     <div className={Application.carta00}>
      <Card
        src={'images/'+baraja+'/'+cartalanzada+'.png'}
        text={cartalanzada}
      />
     </div>
     <div className={Application.carta01}>
      <Card
        src={'images/'+baraja+'/'+cartas[0]+'.png'}
        text={cartas[0]}
      />
     </div>
     <div className={Application.carta02}>
      <Card
        src={'images/'+baraja+'/'+cartas[1]+'.png'}
        text={cartas[1]}
      />
     </div>
     <div className={Application.carta03}>
      <Card
        src={'images/'+baraja+'/'+cartas[2]+'.png'}
        text={cartas[2]}
      />
     </div>
     <div className={Application.carta04}>
      <Card
        src={'images/'+baraja+'/'+cartas[3]+'.png'}
        text={cartas[3]}
      />
     </div>
     <div className={Application.carta05}>
      <Card
        src={'images/'+baraja+'/'+cartas[4]+'.png'}
        text={cartas[4]}
      />
     </div>
     <div className={Application.carta06}>
      <Card
        src={'images/'+baraja+'/'+cartas[5]+'.png'}
        text={cartas[5]}
      />
     </div>
     <div className={Application.bazas2}>
      Tus Bazas
      <Card
        src='images/baraja1/reverso.png'
        text='Tus Bazas'
      />
     </div>
    </div>
  );
}
