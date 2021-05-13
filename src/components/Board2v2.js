import React, { useState, useEffect } from 'react';
import Application from "./application.module.scss"
import Card from "./Card"
import Usuario from "./Usuario"
import Button from '@material-ui/core/Button';
import AuthenticationDataService from "../services/auth.service";

export default function Board1(socket) {
  const user = AuthenticationDataService.getCurrentUser();
  const [myOrden,setMyOrden] = useState();
  const [users,setUsers] = useState([]);
  const [user1, setUser1] = useState({});
  const [user2, setUser2] = useState({});
  const [user3, setUser3] = useState({});
  const [quedanCartas, setQuedanCartas] = useState(false);
  const [triunfo,setTriunfo] = useState('NO');
  const [cartas,setCartas] = useState({jugador: "none", partida: "none", c1: "NO", c2: "NO", c3: "NO", c4: "NO", c5: "NO", c6: "NO"});
  const [cartalanzada,setCartalanzada] = useState('NO');
  const [jugada,setJugada] = useState(['NO','NO','NO']);
  const baraja = user ? user.data.f_carta : 'baraja1';
  const username = user ? user.data.username : 'anonimo';
  const tipo=1;

  useEffect(() => { 
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    /*socket.on("orden", ( orden ) => {
      setMyOrden(orden);
    });*/

    socket.on("RepartirCartas", ({ repartidas }) => {
      if (repartidas.jugador===username){
        setCartas(repartidas);
      }else{
        var index = (repartidas.orden-myOrden+4) % 4;
        if(index == 1){
          setUser1(repartidas);
        }else if (index == 2){
          setUser2(repartidas);
        }else if (index == 3){
          setUser3(repartidas);
        }
      }
    });

    socket.on("RepartirTriunfo", ({ triunfoRepartido }) => {
      setTriunfo(triunfoRepartido);
      setQuedanCartas(true);
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
    { user2.jugador ?
      <Usuario
        nombre={user2.jugador}
        copas={user2.copas + " 🏆"}
        image={"images/"+user2.f_perfil+".png"}
      />
      :
      <></>
    }
     </div>
     <div className={Application.carta1}>
     { user2.jugador ?
      <Card
        src='images/baraja1/NO.png'
        text='Carta jugador 3'
      />
      :
      <></>
      }
     </div>
     <div className={Application.bazas1}>
      <Card
        src='images/baraja1/reverso.png'
        text='Tus Bazas'
      />
     </div>
     <div className={Application.usuario2}>
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
     <div className={Application.carta2}>
      { user1.jugador ? 
      <Card
      src='images/baraja1/NO.png'
      text='Carta jugador 2'
      />
      :
      <></>
      }
     </div>
     <div className={Application.usuario3}>
     { user3.jugador ? 
      <Usuario
        nombre={user3.jugador}
        copas={user3.copas + " 🏆"}
        image={"images/"+user3.f_perfil+".png"}
      />
      :
      <></>
      }
     </div>
     <div className={Application.carta3}>
     { user3.jugador ? 
      <Card
      src='images/baraja1/NO.png'
      text='Carta jugador 3'
      />
      :
      <></>
      }
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
        src={'images/'+baraja+'/'+cartas.c1+'.png'}
        text={cartas.c1}
      />
     </div>
     <div className={Application.carta02}>
      <Card
        src={'images/'+baraja+'/'+cartas.c2+'.png'}
        text={cartas.c2}
      />
     </div>
     <div className={Application.carta03}>
      <Card
        src={'images/'+baraja+'/'+cartas.c3+'.png'}
        text={cartas.c3}
      />
     </div>
     <div className={Application.carta04}>
      <Card
        src={'images/'+baraja+'/'+cartas.c4+'.png'}
        text={cartas.c4}
      />
     </div>
     <div className={Application.carta05}>
      <Card
        src={'images/'+baraja+'/'+cartas.c5+'.png'}
        text={cartas.c5}
      />
     </div>
     <div className={Application.carta06}>
      <Card
        src={'images/'+baraja+'/'+cartas.c6+'.png'}
        text={cartas.c6}
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