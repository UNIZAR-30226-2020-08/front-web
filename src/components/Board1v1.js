import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Application from "./application.module.scss"
import Card from "./Card"
import Usuario from "./Usuario"
import Button from "@material-ui/core/Button";
import AuthenticationDataService from "../services/auth.service";
import Radio from "@material-ui/core/Radio";

export default function Board(socket,roomName) {
  const user = AuthenticationDataService.getCurrentUser();
  
  const history = useHistory();

  const user1 = useRef({});
  const [user1M,setUser1M] = useState({});
  
  const cartas = useRef({jugador: "none", partida: "none", c1: "NO", c2: "NO", c3: "NO", c4: "NO", c5: "NO", c6: "NO"});
  const [cartasM,setCartasM] = useState({jugador: "none", partida: "none", c1: "NO", c2: "NO", c3: "NO", c4: "NO", c5: "NO", c6: "NO"});
  
  const myOrden = useRef(1);
  const [myOrdenM,setMyOrdenM] = useState(1);
  
  const jugada0 = useRef("NO");
  const [jugada0M,setJugada0M] = useState("NO");
  
  const jugada1 = useRef("NO");
  const [jugada1M,setJugada1M] = useState("NO");
  
  const quedanCartas = useRef(false);
  const [quedanCartasM,setQuedanCartasM] = useState(false);
  
  const triunfo = useRef("NO");
  const [triunfoM,setTriunfoM] = useState("NO");
  
  const turno = useRef(0);
  const [turnoM,setTurnoM] = useState(0);

  const round = useRef(0);
  const [roundM,setRoundM] = useState(0);

  const baza = useRef(1);
  const [bazaM,setBazaM] = useState(1);

  const [tienenBaza,setTienenBaza] = useState(false);
  const [tienesBaza,setTienesBaza] = useState(false);

  const baraja = user ? user.data.f_carta : "baraja1";
  const username = user ? user.data.username : "anonimo";

  useEffect(() => { 
    socket.on("orden", ( orden ) => {
      myOrden.current = orden;
      setMyOrdenM(myOrden.current);
    });

    socket.on("RepartirCartas", ({ repartidas }) => {
      if (repartidas.jugador===username){
        cartas.current = repartidas;
        setCartasM(cartas.current)
      }else{
        user1.current = repartidas;
        setUser1M(user1.current)
      }
    });

    socket.on("RepartirTriunfo", ({ triunfoRepartido }) => {
      triunfo.current = triunfoRepartido;
      setTriunfoM(triunfo.current);
      quedanCartas.current = true;
      setQuedanCartasM(quedanCartas.current);
    });

    socket.on("winner", ({ winner }) => {
      if(winner === username){
        turno.current = myOrden.current-1;
        setTurnoM(turno.current);
        baza.current = myOrden.current-1;
        setBazaM(baza.current);
        setTienesBaza(true);
      }else{
        turno.current = user1.current.orden-1;
        setTurnoM(turno.current);
        baza.current = user1.current.orden-1;
        setBazaM(baza.current);
        setTienenBaza(true);
      }
    });

    socket.on("roba", ({ carta, jugador }) => {
      console.log(jugador, " roba ", carta);
      if(jugador === username){
        round.current++;
        setRoundM(round.current);
        jugada1.current = "NO";
        setJugada1M(jugada1.current);
        jugada0.current = "NO";
        setJugada0M(jugada0.current);
        if(cartas.current.c1 === "NO"){
          cartas.current.c1 = carta;
        }else if(cartas.current.c2 === "NO"){
          cartas.current.c2 = carta;
        }else if(cartas.current.c3 === "NO"){
          cartas.current.c3 = carta;
        }else if(cartas.current.c4 === "NO"){
          cartas.current.c4 = carta;
        }else if(cartas.current.c5 === "NO"){
          cartas.current.c5 = carta;
        }else if(cartas.current.c6 === "NO"){
          cartas.current.c6 = carta;
        }
        setCartasM(cartas.current);
      }
    });
  
    socket.on("cartaJugada", ({ cartaJugada, jugador }) => {
      console.log("Carta ",cartaJugada," jugada por ",jugador, ", mi carta es ",jugada0.current);
      if (jugador === user1.current.jugador){
        jugada1.current = cartaJugada;
        setJugada1M(jugada1.current);
        if(jugada0.current === "NO"){
          console.log("NO PIDO ROBAR")
          turno.current = myOrden.current-1;
          setTurnoM(turno.current);
          //console.log("El turno era ",turno.current," y ahora es ",(turno.current + 1 ) % 2," y yo soy ", myOrden.current-1, " y el es ",user1.current.orden-1);
        }else{
          console.log("PIDO ROBAR")
          setTimeout(handleRonda,2000);
        }
      }
    });

    socket.on("cartaCambio", ({ tuya }) => {
      if(tuya.jugador !== username){
        triunfo.current = "6" + triunfo.current.charAt(1);
        setTriunfoM(triunfo.current);
        alert(tuya.jugador + " ha cambiado el 7");
      }
    });

    socket.on("Resultado", ({ tuya }) => {
      if(tuya.jugador !== username){
        triunfo.current = "6" + triunfo.current.charAt(1);
        setTriunfoM(triunfo.current);
        alert(tuya.jugador + " ha cambiado el 7");
      }
    });

    socket.on("Resultado", ({ puntos_e0, puntos_e1 }) => {
      var label_e0 = " malas";
      if(puntos_e0/50 >= 1){
        label_e0 = " buenas";
      }
      var label_e1 = " malas";
      if(puntos_e0/50 >= 1){
        label_e1 = " buenas";
      }
      if(myOrden.current === 1){
        alert( "Tienes " + puntos_e0%50 + label_e0 + " y " + user1.current.jugador + " ha conseguido " + puntos_e1 + label_e1);
      }else{
        alert( "Tienes " + puntos_e1%50 + label_e1 + " y " + user1.current.jugador + " ha conseguido " + puntos_e0 + label_e0);
      }
    });

    socket.on("Vueltas", ({ mensaje }) => {
      
    });
  }, []);

  function handleRonda(){
    jugada1.current = "NO";
    setJugada1M(jugada1.current);
    jugada0.current = "NO";
    setJugada0M(jugada0.current);
    
    var data = {
      partida: roomName.current,
      nronda: round.current
    }

    console.log(data)

    if(round.current < 14){
      socket.emit("robarCarta",data, (error) => {
        if(error) {
          alert(error);
        }
      });
    }else if(round.current === 19){
      socket.emit("finalizarPartida",data, (error) => {
        if(error) {
          alert(error);
        }
      });
    }

    socket.emit("contarPuntos",data, (error) => {
      if(error) {
        alert(error);
      }
    });
  }

  function handleCambiar7(){
    if(baza.current === myOrden.current-1){
      var has7 = false;
      var aux = "6" + triunfo.current.charAt(1);
      console.log(aux);
      if(cartas.current.c1 === aux){
        cartas.current.c1 = triunfo.current;
        has7=true;
      }else if(cartas.current.c2 === aux){
        cartas.current.c2 = triunfo.current;
        has7=true;
      }else if(cartas.current.c3 === aux){
        cartas.current.c3 = triunfo.current;
        has7=true;
      }else if(cartas.current.c4 === aux){
        cartas.current.c4 = triunfo.current;
        has7=true;
      }else if(cartas.current.c5 === aux){
        cartas.current.c5 = triunfo.current;
        has7=true;
      }else if(cartas.current.c6 === aux){
        cartas.current.c6 = triunfo.current;
        has7=true;
      }else{
        alert('Necesitas el 7 de triunfo para poder cambiar');
      }

      if(has7){
        triunfo.current = aux;
        setTriunfoM(triunfo.current);
        setCartasM(cartas.current);
        var data = {
          jugador: username,
          nombre: roomName.current,
        }
        socket.emit("cambiar7",data, (error) => {
          if(error) {
            alert(error);
          }
        });
      }
    }else{
      alert('Necesitas tener baza para poder cambiar');
    }
  };

  function handleCantar(){
    
  }

  function handleLancarCarta(carta){
    if(carta !== "NO"){
      if(turno.current === myOrden.current-1){
        jugada0.current = carta;
        setJugada0M(jugada0.current);
        turno.current = ( turno.current + 1 ) % 2;
        setTurnoM(turno.current);
        //console.log("El turno era ",turno," y ahora es ",(turno + 1 ) % 2," y yo soy ", orden-1, " y el es ",user1.orden-1);
        if(cartas.current.c1 === carta){
          cartas.current.c1 = "NO";
        }else if(cartas.current.c2 === carta){
          cartas.current.c2 = "NO";
        }else if(cartas.current.c3 === carta){
          cartas.current.c3 = "NO";
        }else if(cartas.current.c4 === carta){
          cartas.current.c4 = "NO";
        }else if(cartas.current.c5 === carta){
          cartas.current.c5 = "NO";
        }else if(cartas.current.c6 === carta){
          cartas.current.c6 = "NO";
        }
        setCartasM(cartas.current);

        var data = {
          jugador: username,
          partida: roomName.current,
          nronda: round.current,
          carta: carta
        }

        console.log(data);

        socket.emit("lanzarCarta",data, (error) => {
          if(error) {
            alert(error);
          }
        })

      }else{
        alert("No es tu turno");
      }
    }
  };

  return (
    <div className={Application.tapete}>
     <div className={Application.controles1}>
      <h1 className={Application.header}>
        <Button variant="contained" className={Application.actionButton} onClick={() => {history.push("/");}}>SALIR</Button>
        <Button variant="contained" className={Application.actionButton} onClick={() => {alert("Funcionalidad no implementada");}}>PAUSAR</Button>
      </h1>
     </div>
     <div className={Application.usuario1}>
    { user1M.jugador ? 
      <Usuario
        nombre={user1M.jugador}
        copas={user1M.copas + " 🏆"}
        image={"images/"+user1M.f_perfil+".png"}
        checked={turnoM===user1M.orden-1}
      />
      :
      <></>
    }
     </div>
     <div className={Application.carta1}>
      <Card
        src={"images/"+baraja+"/"+jugada1M+".png"}
        text="Carta jugador 1"
      />
     </div>
     <div className={Application.bazas1}>
      { tienenBaza ?
      <Card
        src={"images/"+baraja+"/reverso.png"}
        text="Sus Bazas"
      />
      :
      <></>
      }
     </div>
     <div className={Application.mazo1}>
     { roundM < 14 ?
      <Card
        src={"images/"+baraja+"/"+triunfoM+".png"}
        text="Palo"
        alternative="1"
        onClick={() => {handleCambiar7()}}
      />
      :
      <></>
     }
     </div>
     <div className={Application.mazo2}>
     { roundM < 14 ?
      <Card
        src={"images/"+baraja+"/"+(quedanCartasM ? "reverso" : "NO") +".png"}
        text="Baraja"
        onClick={() => {alert("Quedan "+ (28-round.current*2) + " cartas.");}}
      />
      :
      <></>
     }
     </div>
     <div className={Application.controles2}>
      <h1 className={Application.header}>
        <Button variant="contained" className={Application.actionButton}>CANTAR</Button>
        <Radio checked={turnoM===myOrdenM-1}/>
      </h1>
     </div>
     <div className={Application.carta00}>
      <Card
        src={"images/"+baraja+"/"+jugada0M+".png"}
        text={jugada0M}
      />
     </div>
     <div className={Application.carta01}>
      <Card
        onClick={() => handleLancarCarta(cartasM.c1,"c1")}
        src={"images/"+baraja+"/"+cartasM.c1+".png"}
        text={cartasM.c1}
      />
     </div>
     <div className={Application.carta02}>
      <Card
        onClick={() => handleLancarCarta(cartasM.c2,"c2")}
        src={"images/"+baraja+"/"+cartasM.c2+".png"}
        text={cartasM.c2}
      />
     </div>
     <div className={Application.carta03}>
      <Card
        onClick={() => handleLancarCarta(cartasM.c3,"c3")}
        src={"images/"+baraja+"/"+cartasM.c3+".png"}
        text={cartasM.c3}
      />
     </div>
     <div className={Application.carta04}>
      <Card
        onClick={() => handleLancarCarta(cartasM.c4,"c4")}
        src={"images/"+baraja+"/"+cartasM.c4+".png"}
        text={cartasM.c4}
      />
     </div>
     <div className={Application.carta05}>
      <Card
        onClick={() => handleLancarCarta(cartasM.c5,"c5")}
        src={"images/"+baraja+"/"+cartasM.c5+".png"}
        text={cartasM.c5}
      />
     </div>
     <div className={Application.carta06}>
      <Card
        onClick={() => handleLancarCarta(cartasM.c6,"c6")}
        src={"images/"+baraja+"/"+cartasM.c6+".png"}
        text={cartasM.c6}
      />
     </div>
     <div className={Application.bazas2}>
      { tienesBaza ?
      <Card
        onClick={() => {alert("Funcionalidad no implementada.");}}
        src={"images/"+baraja+"/reverso.png"}
        text="Tus Bazas"
      />
      :
      <></>
      }
     </div>
    </div>
  );
}