import React, { useState, useEffect } from 'react';
import Application from "./application.module.scss"
import Card from "./Card"
import Usuario from "./Usuario"
import Button from '@material-ui/core/Button';
import AuthenticationDataService from "../services/auth.service";
import Radio from '@material-ui/core/Radio';

export default function Board(socket,roomName) {
  const user = AuthenticationDataService.getCurrentUser();
  const [users,setUsers] = useState([]);
  const [user1, setUser1] = useState({});
  const [jugada1,setJugada1] = useState("NO");
  const [quedanCartas, setQuedanCartas] = useState(false);
  const [triunfo,setTriunfo] = useState('NO');
  const [round,setRound] = useState(0);
  const [turno,setTurno] = useState(false);
  const [orde,setOrden] = useState(1);
  const [jugado,setJugado] = useState(false);
  const [jugado1,setJugado1] = useState(false);
  const [queJugada, setQueJugada] = useState("");
  const [cartas,setCartas] = useState({jugador: "none", partida: "none", c1: "NO", c2: "NO", c3: "NO", c4: "NO", c5: "NO", c6: "NO"});
  const [cartalanzada,setCartalanzada] = useState('NO');
  const baraja = user ? user.data.f_carta : 'baraja1';
  const username = user ? user.data.username : 'anonimo';
  const tipo = 1;
  const room = roomName;

  useEffect(() => { 
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    socket.on("orden", ( orden ) => {
      setTurno(orden === 1);
      setOrden(orden);
    });

    socket.on("RepartirCartas", ({ repartidas }) => {
      if (repartidas.jugador===username){
        setCartas(repartidas);
      }else{
        setUser1(repartidas);
      }
    });

    socket.on("RepartirTriunfo", ({ triunfoRepartido }) => {
      setTriunfo(triunfoRepartido);
      setQuedanCartas(true);
    });

    socket.on("roba", ({ carta, jugador }) => {
      if(jugador === username){
        var cartasAux = cartas;
        if(queJugada === "c1"){
          cartasAux.c1 = carta;
        }else if(queJugada === "c2"){
          cartasAux.c2 = carta;
        }else if(queJugada === "c3"){
          cartasAux.c3 = carta;
        }else if(queJugada === "c4"){
          cartasAux.c4 = carta;
        }else if(queJugada === "c5"){
          cartasAux.c5 = carta;
        }else if(queJugada === "c6"){
          cartasAux.c6 = carta;
        }
        setCartas(cartasAux);
      }
      setJugado(false);
      setJugado1(false);
    });

    socket.on("winner", ({ winner }) => {
      if(winner === username){
        setTurno(true);
      }else{
        setTurno(true);
      }
    });

    socket.on("cartaJugada", ({ cartaJugada, jugador }) => {
      console.log(cartaJugada);
      console.log(jugador);
      console.log(user1);
      console.log(jugador === user1.jugador);
      if (jugador === user1.jugador){
        console.log(cartaJugada);
        console.log(jugador);
        setJugada1(cartaJugada);
        setJugado1(true);
        if(!jugado){
          setTurno(true);
        }
      }
      if (jugado && jugado1){
        var data = {
          partida: room,
          nronda: round
        }
        
        socket.emit('robarCarta',data, (error) => {
          if(error) {
            alert(error);
          }
        });
        
        socket.emit('contarPuntos',data, (error) => {
          if(error) {
            alert(error);
          }
        });

        setRound(round+1);
      }
    });
}, [user1,jugada1,quedanCartas,triunfo,round,turno,orde,jugado,jugado1,queJugada,cartas,cartalanzada,]);

  function handleLancarCarta(carta,que){
    if(turno){
      setCartalanzada(carta);
      setQueJugada(que);
      setTurno(false);
      setJugado(true);
      var cartasAux = cartas;
      if(que === "c1"){
        cartasAux.c1 = "NO";
      }else if(que === "c2"){
        cartasAux.c2 = "NO";
      }else if(que === "c3"){
        cartasAux.c3 = "NO";
      }else if(que === "c4"){
        cartasAux.c4 = "NO";
      }else if(que === "c5"){
        cartasAux.c5 = "NO";
      }else if(que === "c6"){
        cartasAux.c6 = "NO";
      }
      setCartas(cartasAux);
      var data = {
        jugador: username,
        partida: room,
        nronda: round,
        carta: carta
      }
      console.log(data);
      socket.emit('lanzarCarta',data, (error) => {
        if(error) {
          alert(error);
        }
      })
    }
  };

  return (
    <div className={Application.tapete}>
     <div className={Application.controles1}>
      <h1 className={Application.header}>
        <Button variant="contained" className={Application.actionButton}>SALIR</Button>
        <Button variant="contained" className={Application.actionButton}>PAUSAR</Button>
      </h1>
     </div>
     <div className={Application.usuario1}>
    { user1.jugador ? 
      <Usuario
        nombre={user1.jugador}
        copas={user1.copas + " 🏆"}
        image={"images/"+user1.f_perfil+".png"}
      />
      :
      <></>
    }
     </div>
     <div className={Application.carta1}>
      <Card
        src={'images/'+baraja+'/'+jugada1+'.png'}
        text='Carta jugador 1'
      />
     </div>
     <div className={Application.bazas1}>
      <Card
        src={'images/'+baraja+'/reverso.png'}
        text='Tus Bazas'
      />
     </div>
     <div className={Application.mazo1}>
     <Card
        src={'images/'+baraja+'/'+triunfo+'.png'}
        text='Palo'
        alternative='1'
      />
     </div>
     <div className={Application.mazo2}>
      <Card
        src={'images/'+baraja+'/'+(quedanCartas ? "reverso" : "NO") +'.png'}
        text='Tus Bazas'
      />
     </div>
     <div className={Application.controles2}>
      <h1 className={Application.header}>
        <Button variant="contained" className={Application.actionButton}>CANTAR</Button>
        <Button variant="contained" className={Application.actionButton}>CAMBIAR</Button>
        <Radio checked={turno}/>
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
        onClick={() => handleLancarCarta(cartas.c1,"c1")}
        src={'images/'+baraja+'/'+cartas.c1+'.png'}
        text={cartas.c1}
      />
     </div>
     <div className={Application.carta02}>
      <Card
        onClick={() => handleLancarCarta(cartas.c2,"c2")}
        src={'images/'+baraja+'/'+cartas.c2+'.png'}
        text={cartas.c2}
      />
     </div>
     <div className={Application.carta03}>
      <Card
        onClick={() => handleLancarCarta(cartas.c3,"c3")}
        src={'images/'+baraja+'/'+cartas.c3+'.png'}
        text={cartas.c3}
      />
     </div>
     <div className={Application.carta04}>
      <Card
        onClick={() => handleLancarCarta(cartas.c4,"c4")}
        src={'images/'+baraja+'/'+cartas.c4+'.png'}
        text={cartas.c4}
      />
     </div>
     <div className={Application.carta05}>
      <Card
        onClick={() => handleLancarCarta(cartas.c5,"c5")}
        src={'images/'+baraja+'/'+cartas.c5+'.png'}
        text={cartas.c5}
      />
     </div>
     <div className={Application.carta06}>
      <Card
        onClick={() => handleLancarCarta(cartas.c6,"c6")}
        src={'images/'+baraja+'/'+cartas.c6+'.png'}
        text={cartas.c6}
      />
     </div>
     <div className={Application.bazas2}>
      Tus Bazas
      <Card
        src={'images/'+baraja+'/reverso.png'}
        text='Tus Bazas'
      />
     </div>
    </div>
  );
}