import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Application from "./application.module.scss"
import Card from "./Card"
import Usuario from "./Usuario"
import Button from "@material-ui/core/Button";
import AuthenticationDataService from "../services/auth.service";
import Radio from "@material-ui/core/Radio";
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./Timer.css";

export default function Board(socket,roomName) {
  const user = AuthenticationDataService.getCurrentUser();

  const history = useHistory();

  const user1 = useRef({jugador: "IA"});
  const [user1M,setUser1M] = useState({jugador: "IA",orden: 2, copas: "",f_perfil:"userlogoIA"});
  
  const cartas = useRef({jugador: "none", partida: "none", c1: "NO", c2: "NO", c3: "NO", c4: "NO", c5: "NO", c6: "NO"});
  const [cartasMc1,setCartasMc1] = useState("NO");
  const [cartasMc2,setCartasMc2] = useState("NO");
  const [cartasMc3,setCartasMc3] = useState("NO");
  const [cartasMc4,setCartasMc4] = useState("NO");
  const [cartasMc5,setCartasMc5] = useState("NO");
  const [cartasMc6,setCartasMc6] = useState("NO");

  function setCartasM(cartas2set){
    setCartasMc1(cartas2set.c1);
    setCartasMc2(cartas2set.c2);
    setCartasMc3(cartas2set.c3);
    setCartasMc4(cartas2set.c4);
    setCartasMc5(cartas2set.c5);
    setCartasMc6(cartas2set.c6);
  }

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

  const puntose0 = useRef(0);
  const puntose1 = useRef(0);

  const [misPuntos,setMisPuntos] = useState("0 malas");
  const [susPuntos,setSusPuntos] = useState("0 malas");

  const selectedCard = useRef("");
  const [selectedCardM,setSelectedCardM] = useState("");

  const [finished,setFinished] = useState(false);

  const [resultado,setResultado] = useState("");

  const baraja = user ? user.data.f_carta : "baraja1";

  const username = user ? user.data.username : "anonimo";

  const renderTime = ({ remainingTime }) => {
    return (
      <div className="timer">
        <div className="value">{remainingTime}</div>
      </div>
    );
  };

  function throwRandomCard(){
    if(handleLancarCarta(cartas.current.c1,false)){
      console.log("Tira c1")
    }else if(handleLancarCarta(cartas.current.c2,false)){
      console.log("Tira c2")
    }else if(handleLancarCarta(cartas.current.c3,false)){
      console.log("Tira c3")
    }else if(handleLancarCarta(cartas.current.c4,false)){
      console.log("Tira c4")
    }else if(handleLancarCarta(cartas.current.c5,false)){
      console.log("Tira c5")
    }else if(handleLancarCarta(cartas.current.c6,false)){
      console.log("Tira c6")
    }else{
      console.log("No puedo tirar")
    }
  }

  function handleCountdownCompleted(){
    console.log("SE HA COMPLETADO EL TIEMPO")
    if(jugada0.current === "NO"){
      console.log("TIRANDO CARTA ALEATORIA...")
      throwRandomCard();
    }
  }

  function handleLanzarCartaIA(){
    var data = {
      partida: roomName.current,
      carta: jugada0.current,
      nronda: round.current,
    }
    socket.emit("lanzarCartaIA",data, (error) => {
      if(error) {
        alert(error);
      }
    });
  }

  const [timer,setTimer] = useState(<div></div>);

  useEffect(() => { 
    socket.on("orden", ( orden ) => {
      myOrden.current = orden;
      setMyOrdenM(myOrden.current);
    });

    socket.on("RepartirCartas", ({ repartidas }) => {
      if (repartidas.jugador===username){
        cartas.current = repartidas;
        setCartasM(cartas.current)
        if(myOrden.current-1 === turno.current){
          setTimer(
            <CountdownCircleTimer
              isPlaying
              duration={30}
              size={100}
              colors={[["#0abf00", 0.5], ["#F7B801", 0.5], ["#A30000"]]}
              onComplete={()=>handleCountdownCompleted()}
            >
              {renderTime}
            </CountdownCircleTimer>
          )
        }
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
      round.current++;
      setRoundM(round.current%20);
      jugada1.current = "NO";
      setJugada1M(jugada1.current);
      jugada0.current = "NO";
      setJugada0M(jugada0.current);
      if(winner === username){
        turno.current = myOrden.current-1;
        setTimer(
          <CountdownCircleTimer
            isPlaying
            duration={30}
            size={100}
            colors={[["#0abf00", 0.5], ["#F7B801", 0.5], ["#A30000"]]}
            onComplete={()=>{handleCountdownCompleted()}}
          >
            {renderTime}
          </CountdownCircleTimer>
        )
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
        setTimeout(handleLanzarCartaIA,1000);
      }
    });

    socket.on("roba", ({ carta, jugador }) => {
      console.log(jugador, " roba ", carta);
      if(jugador === username){
        if(cartas.current.c1 === "NO"){
          cartas.current.c1 = carta;
          setCartasMc1(carta);
        }else if(cartas.current.c2 === "NO"){
          cartas.current.c2 = carta;
          setCartasMc2(carta);
        }else if(cartas.current.c3 === "NO"){
          cartas.current.c3 = carta;
          setCartasMc3(carta);
        }else if(cartas.current.c4 === "NO"){
          cartas.current.c4 = carta;
          setCartasMc4(carta);
        }else if(cartas.current.c5 === "NO"){
          cartas.current.c5 = carta;
          setCartasMc5(carta);
        }else if(cartas.current.c6 === "NO"){
          cartas.current.c6 = carta;
          setCartasMc6(carta);
        }
      }
    });

    socket.on("cartaJugadaIA", ({ carta, jugador }) => {
      console.log("Carta ",carta," jugada por ",jugador, ", mi carta es ",jugada0.current);
      jugada1.current = carta;
      setJugada1M(jugada1.current);
      if(jugada0.current === "NO"){
        turno.current = myOrden.current-1;
        setTimer(
          <CountdownCircleTimer
            isPlaying
            duration={30}
            size={100}
            colors={[["#0abf00", 0.5], ["#F7B801", 0.5], ["#A30000"]]}
            onComplete={()=>handleCountdownCompleted()}
          >
            {renderTime}
          </CountdownCircleTimer>
        )
        setTurnoM(turno.current);
        //console.log("El turno era ",turno.current," y ahora es ",(turno.current + 1 ) % 2," y yo soy ", myOrden.current-1, " y el es ",user1.current.orden-1);
      }
      if(jugada0.current !=="NO"){
        setTimeout(handleRonda,2000);  
      }
    });    

    socket.on("cartaJugada", ({ cartaJugada, jugador }) => {
      console.log("Carta ",cartaJugada," jugada por ",jugador, ", mi carta es ",jugada0.current);
      if (jugador === user1.current.jugador){
        jugada1.current = cartaJugada;
        setJugada1M(jugada1.current);
        if(jugada0.current === "NO"){
          turno.current = myOrden.current-1;
          setTimer(
            <CountdownCircleTimer
              isPlaying
              duration={30}
              size={100}
              colors={[["#0abf00", 0.5], ["#F7B801", 0.5], ["#A30000"]]}
              onComplete={()=>handleCountdownCompleted()}
            >
              {renderTime}
            </CountdownCircleTimer>
          )
          setTurnoM(turno.current);
          //console.log("El turno era ",turno.current," y ahora es ",(turno.current + 1 ) % 2," y yo soy ", myOrden.current-1, " y el es ",user1.current.orden-1);
        }
      }
      else if(jugador === username){
        if(jugada1.current !== "NO"){
          console.log("PIDO ROBAR")
          setTimeout(handleRonda,2000);
        }else{
          var data = {
            partida: roomName.current,
            carta: cartaJugada,
            nronda: round.current,
          }
          setTimeout(handleLanzarCartaIA,1000);
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

    socket.on("puntos", ({ puntos_e0, puntos_e1 }) => {
      puntose0.current = puntos_e0;
      puntose1.current = puntos_e1;
      var label_e0 = " malas";
      var pts_e0 = puntos_e0;
      if(puntos_e0/50 >= 1){
        label_e0 = " buenas";
        pts_e0 = pts_e0 - 50;
      }
      var label_e1 = " malas";
      var pts_e1 = puntos_e1;
      if(puntos_e1/50 >= 1){
        label_e1 = " buenas";
        pts_e1 = pts_e1 - 50;
      }

      if(myOrden.current === 1){
        setMisPuntos(pts_e0 + label_e0);
        setSusPuntos(pts_e1 + label_e1);
      }else{
        setMisPuntos(pts_e1 + label_e1);
        setSusPuntos(pts_e0 + label_e0);
      }  
      if(round.current/20 > 1){
        if(puntos_e0 > 100 || puntos_e1 > 100){
          var data = {
            partida: roomName.current,
            nronda: round.current
          }
          socket.emit("finalizarPartida",data, (error) => {
            if(error) {
              alert(error);
            }
          });
        }
      }
    });

    socket.on("Resultado", ({ puntos_e0, puntos_e1 }) => {
      var label_e0 = " malas";
      var pts_e0 = puntos_e0;
      if(puntos_e0/50 >= 1){
        label_e0 = " buenas";
        pts_e0 = pts_e0 - 50;
      }
      var label_e1 = " malas";
      var pts_e1 = puntos_e1;
      if(puntos_e1/50 >= 1){
        label_e1 = " buenas";
        pts_e1 = pts_e1 - 50;
      }
      var mensaje = "HAS PERDIDO, -15🏆"
      if(myOrden.current === 1){
        if(puntos_e0 > puntos_e1){
          mensaje = "HAS GANADO, +30🏆"
        }
      }else{
        if(puntos_e0 < puntos_e1){
          mensaje = "HAS GANADO, +30🏆"
        }
      }      
      console.log(puntos_e0 + " a " +puntos_e1)
      if(myOrden.current === 1){
        setResultado( "Tienes " + pts_e0 + label_e0 + " y " + user1.current.jugador + " ha conseguido " + pts_e1 + label_e1 + "\n" + mensaje);
      }else{
        setResultado( "Tienes " + pts_e1 + label_e1 + " y " + user1.current.jugador + " ha conseguido " + pts_e0 + label_e0 + "\n" + mensaje);
      }
      setFinished(true);
    });

    socket.on("cante", (dataCante) => {
      var palo;
      var sujeto = "Has"
      var paloT = triunfo.current.charAt(1).toLowerCase();
      var i;
      for (i of dataCante){
        palo = i.palo.charAt(0).toLowerCase();
        console.log(i);
        if(i.usuario !== username){
          sujeto = i.usuario + " ha";
        }
        console.log("El palo es " + paloT + " y el del cante es " + palo);
        if(palo === paloT){
          alert(sujeto + " cantado las cuarenta");
        }else{
          if(palo === 'o'){
            alert(sujeto + " cantado las veinte en oros")
          }
          else if(palo === 'c'){
            alert(sujeto + " cantado las veinte en copas")
          }
          else if(palo === 'e'){
            alert(sujeto + " cantado las veinte en espadas")
          }
          else{
            alert(sujeto + " cantado las veinte en bastos")
          }
        }
      }
    });

    socket.on("Vueltas", ({ mensaje, puntos_e0, puntos_e1 }) => {
      var label_e0 = " malas";
      var pts_e0 = puntos_e0;
      if(puntos_e0/50 >= 1){
        label_e0 = " buenas";
        pts_e0 = pts_e0 - 50;
      }
      var label_e1 = " malas";
      var pts_e1 = puntos_e1;
      if(puntos_e1/50 >= 1){
        label_e1 = " buenas";
        pts_e1 = pts_e1 - 50;
      }
      console.log(puntos_e0 + " a " +puntos_e1)
      if(myOrden.current === 1){
        alert( "Tienes " + pts_e0 + label_e0 + " y " + user1.current.jugador + " ha conseguido " + pts_e1 + label_e1 + "\nPARTIDA DE VUELTAS!");
      }else{
        alert( "Tienes " + pts_e1 + label_e1 + " y " + user1.current.jugador + " ha conseguido " + pts_e0 + label_e0 + "\nPARTIDA DE VUELTAS!");
      }
    });

    socket.on("copasActualizadas", ( copas ) => {
      if(copas.jugador === username){
        let user = AuthenticationDataService.getCurrentUser();
        user.data.copas = copas.copas;
        AuthenticationDataService.updateCurrentUser(user);
      }
    });

  }, []);

  function tieneEnMano(palo){
    if(cartas.current.c1.charAt(1) === palo  && cartas.current.c1 !== "NO"){
      return true;
    }else if(cartas.current.c2.charAt(1) === palo && cartas.current.c2 !== "NO"){
      return true;
    }else if(cartas.current.c3.charAt(1) === palo && cartas.current.c3 !== "NO"){
      return true;
    }else if(cartas.current.c4.charAt(1) === palo && cartas.current.c4 !== "NO"){
      return true;
    }else if(cartas.current.c5.charAt(1) === palo && cartas.current.c5 !== "NO"){
      return true;
    }else if(cartas.current.c6.charAt(1) === palo && cartas.current.c6 !== "NO"){
      return true;
    }
  }

  function mata(carta1, carta2){
    var palo1 = carta1.charAt(1);
    var valor1 = carta1.charAt(0);
    var palo2 = carta2.charAt(1);
    var valor2 = carta2.charAt(0);
    var palotriunfo = triunfo.current.charAt(1);
    if(palo1 === palo2 && carta2 !== "NO"){
      if(valor2 == 0 || 
        (valor2 == 2 && valor1 != 0) || 
        (valor2 == 9 && valor1 != 0 && valor1 != 2) ||
        (valor2 == 7 && valor1 != 0 && valor1 != 2 && valor1 != 9) ||
        (valor2 == 8 && valor1 != 0 && valor1 != 2 && valor1 != 9 && valor2 != 7) ||
        (valor2 == 6 && (valor1 == 1 || valor1 == 3 || valor1 == 4 || valor1 == 5)) ||
        (valor2 == 5 && (valor1 == 1 || valor1 == 3 || valor1 == 4)) ||
        (valor2 == 4 && (valor1 == 1 || valor1 == 3 )) ||
        (valor2 == 3 && valor1 == 1)
      ){
        return true;
      }else{
        return false;
      }
    }else if(palo1 !== palo2 && palo1 === palotriunfo && carta2 !== "NO"){
      return false;
    }else if(palo1 !== palo2 && palo2 === palotriunfo && carta2 !== "NO"){
      return true;
    }else{
      return false;
    }
  }

  function puedeMatar(carta,palo){
    if(cartas.current.c1.charAt(1) === palo && cartas.current.c1 !== "NO"){
      if(mata(carta,cartas.current.c1)){
        return true;
      }
    }if(cartas.current.c2.charAt(1) === palo && cartas.current.c2 !== "NO"){
      if(mata(carta,cartas.current.c2)){
        return true;
      }
    }if(cartas.current.c3.charAt(1) === palo && cartas.current.c3 !== "NO"){
      if(mata(carta,cartas.current.c3)){
        return true;
      }
    }if(cartas.current.c4.charAt(1) === palo && cartas.current.c4 !== "NO"){
      if(mata(carta,cartas.current.c4)){
        return true;
      }
    }if(cartas.current.c5.charAt(1) === palo && cartas.current.c5 !== "NO"){
      if(mata(carta,cartas.current.c5)){
        return true;
      }
    }if(cartas.current.c6.charAt(1) === palo && cartas.current.c6 !== "NO"){
      if(mata(carta,cartas.current.c6)){
        return true;
      }
    }
    return false;
  }

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

    socket.emit("contarPuntos",data, (error) => {
      if(error) {
        alert(error);
      }
    });

    if(round.current%20 < 14){
      socket.emit("robarCarta",data, (error) => {
        if(error) {
          alert(error);
        }
      });
    }else if(round.current%20 === 19){
      socket.emit("finalizarPartida",data, (error) => {
        if(error) {
          alert(error);
        }
      });
    }
  }

  function handleCambiar7(){
    if(baza.current === myOrden.current-1){
      var has7 = false;
      var aux = "6" + triunfo.current.charAt(1);
      console.log(aux);
      if(cartas.current.c1 === aux){
        cartas.current.c1 = triunfo.current;
        setCartasMc1(triunfo.current);
        has7=true;
      }else if(cartas.current.c2 === aux){
        cartas.current.c2 = triunfo.current;
        setCartasMc2(triunfo.current);
        has7=true;
      }else if(cartas.current.c3 === aux){
        cartas.current.c3 = triunfo.current;
        setCartasMc3(triunfo.current);
        has7=true;
      }else if(cartas.current.c4 === aux){
        cartas.current.c4 = triunfo.current;
        setCartasMc4(triunfo.current);
        has7=true;
      }else if(cartas.current.c5 === aux){
        cartas.current.c5 = triunfo.current;
        setCartasMc5(triunfo.current);
        has7=true;
      }else if(cartas.current.c6 === aux){
        cartas.current.c6 = triunfo.current;
        setCartasMc6(triunfo.current);
        has7=true;
      }else{
        alert('Necesitas el 7 de triunfo para poder cambiar');
      }

      if(has7){
        triunfo.current = aux;
        setTriunfoM(triunfo.current);
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
    if(baza.current === myOrden.current-1){
      var data = {
        jugador: username,
        nombre: roomName.current,
      }
      socket.emit("cantar",data, (error) => {
        if(error) {
          alert(error);
        }
      });
    }else{
      alert('Necesitas tener baza para poder cambiar');
    }
  }

  function handleLancarCarta(carta,madeByUser){
    if(carta !== "NO"){
      if(turno.current === myOrden.current-1){
        var cartaValida = true;
        if(round.current%20 >= 14 && jugada1.current !== "NO"){
          var palo0 = carta.charAt(1);
          var palo1 = jugada1.current.charAt(1);
          var palotriunfo = triunfo.current.charAt(1);
          if(palo0 === palo1){
            if(!mata(jugada1.current,carta) && puedeMatar(jugada1.current,palo1)){
              cartaValida = false;
            }
          }else if(palo0 === palotriunfo){
            if(tieneEnMano(palo1)){
              cartaValida = false;
            }
          }else if(tieneEnMano(palo1) || tieneEnMano(palotriunfo)){
            cartaValida = false;
          }
        }
        if (cartaValida){
          jugada0.current = carta;
          setJugada0M(jugada0.current);
          turno.current = ( turno.current + 1 ) % 2;
          setTurnoM(turno.current);
          if(cartas.current.c1 === carta){
            cartas.current.c1 = "NO";
            setCartasMc1("NO");
          }else if(cartas.current.c2 === carta){
            cartas.current.c2 = "NO";
            setCartasMc2("NO");
          }else if(cartas.current.c3 === carta){
            cartas.current.c3 = "NO";
            setCartasMc3("NO");
          }else if(cartas.current.c4 === carta){
            cartas.current.c4 = "NO";
            setCartasMc4("NO");
          }else if(cartas.current.c5 === carta){
            cartas.current.c5 = "NO";
            setCartasMc5("NO");
          }else if(cartas.current.c6 === carta){
            cartas.current.c6 = "NO";
            setCartasMc6("NO");
          }
          var data = {
            jugador: username,
            partida: roomName.current,
            nronda: round.current,
            carta: carta
          }
          socket.emit("lanzarCarta",data, (error) => {
            if(error) {
              if(madeByUser){
                alert(error);  
              }
              return false;
            }
          })
        }else{
          if(madeByUser){
            alert("No puedes tirar esa carta");
          }
          return false;
        }
      }else{
        if(madeByUser){
          alert("No es tu turno");
        }
        return false;
      }
      return true;
    }else{
      return false;
    }
  };

  function handleMoveCarta(carta){  
    var carta2mov = "NO";
    var carta2mov2 = "NO";
    if("c1" === selectedCard.current){
      carta2mov = cartas.current.c1;
    }else if("c2" === selectedCard.current){
      carta2mov = cartas.current.c2;
    }else if("c3" === selectedCard.current){
      carta2mov = cartas.current.c3;
    }else if("c4" === selectedCard.current){
      carta2mov = cartas.current.c4;
    }else if("c5" === selectedCard.current){
      carta2mov = cartas.current.c5;
    }else if("c6" === selectedCard.current){
      carta2mov = cartas.current.c6;
    }
  
    if("c1" === carta){
      carta2mov2 = cartas.current.c1;
    }else if("c2" === carta){
      carta2mov2 = cartas.current.c2;
    }else if("c3" === carta){
      carta2mov2 = cartas.current.c3;
    }else if("c4" === carta){
      carta2mov2 = cartas.current.c4;
    }else if("c5" === carta){
      carta2mov2 = cartas.current.c5;
    }else if("c6" === carta){
      carta2mov2 = cartas.current.c6;
    }

    if("c1" === carta){
      cartas.current.c1 = carta2mov;
      setCartasMc1(carta2mov);
    }else if("c2" === carta){
      cartas.current.c2 = carta2mov;
      setCartasMc2(carta2mov);
    }else if("c3" === carta){
      cartas.current.c3 = carta2mov;
      setCartasMc3(carta2mov);
    }else if("c4" === carta){
      cartas.current.c4 = carta2mov;
      setCartasMc4(carta2mov);
    }else if("c5" === carta){
      cartas.current.c5 = carta2mov;
      setCartasMc5(carta2mov);
    }else if("c6" === carta){
      cartas.current.c6 = carta2mov;
      setCartasMc6(carta2mov);
    }

    if("c1" === selectedCard.current){
      cartas.current.c1 = carta2mov2;
      setCartasMc1(carta2mov2);
    }else if("c2" === selectedCard.current){
      cartas.current.c2 = carta2mov2;
      setCartasMc2(carta2mov2);
    }else if("c3" === selectedCard.current){
      cartas.current.c3 = carta2mov2;
      setCartasMc3(carta2mov2);
    }else if("c4" === selectedCard.current){
      cartas.current.c4 = carta2mov2;
      setCartasMc4(carta2mov2);
    }else if("c5" === selectedCard.current){
      cartas.current.c5 = carta2mov2;
      setCartasMc5(carta2mov2);
    }else if("c6" === selectedCard.current){
      cartas.current.c6 = carta2mov2;
      setCartasMc6(carta2mov2);
    }
  }

  function handleClickCarta(carta){
    if(selectedCard.current === carta){
      var carta2mov = "NO";
      if("c1" === selectedCard.current){
        carta2mov = cartas.current.c1;
      }else if("c2" === selectedCard.current){
        carta2mov = cartas.current.c2;
      }else if("c3" === selectedCard.current){
        carta2mov = cartas.current.c3;
      }else if("c4" === selectedCard.current){
        carta2mov = cartas.current.c4;
      }else if("c5" === selectedCard.current){
        carta2mov = cartas.current.c5;
      }else if("c6" === selectedCard.current){
        carta2mov = cartas.current.c6;
      }
      handleLancarCarta(carta2mov,true);
      selectedCard.current = "";
      setSelectedCardM("");
    }else if(selectedCard.current === ""){
      selectedCard.current = carta;
      setSelectedCardM(carta);
    }else{
      handleMoveCarta(carta);
      selectedCard.current = "";
      setSelectedCardM("");
    }
  }

  return (
    <div className={Application.tapete}>
     <div className={Application.controles1}>
      <h1 className={Application.header}>
        <Button variant="contained" className={Application.actionButton} onClick={() => {window.location.reload();}}>SALIR</Button>
      </h1>
     </div>
     <div className={Application.timer}>
     <div className="timer-wrapper">
       {turnoM===myOrdenM-1 ? timer : <></>}
     </div>
     </div>
     <div className={Application.usuario1}>
    { user1M.jugador ? 
      <Usuario
        nombre={user1M.jugador}
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
        <Button variant="contained" className={Application.actionButton} onClick={()=>{handleCantar()}}>CANTAR</Button>
        <Radio checked={turnoM===myOrdenM-1}/>
        { (roundM / 20) > 1 ?
        <div className={Application.cuenta}>
          <h1 className={Application.cuentaH}>Mi equipo: {misPuntos}</h1>
          <h1 className={Application.cuentaH}>Rival: {susPuntos}</h1>
        </div>
        :
        <div className={Application.cuenta}>
        </div>
        }
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
        onClick={() => handleClickCarta("c1")}
        src={"images/"+baraja+"/"+cartasMc1+".png"}
        text={cartasMc1}
        selected={selectedCardM===cartasMc1}
      />
     </div>
     <div className={Application.carta02}>
      <Card
        onClick={() => handleClickCarta("c2")}
        src={"images/"+baraja+"/"+cartasMc2+".png"}
        text={cartasMc2}
        selected={selectedCardM===cartasMc2}
      />
     </div>
     <div className={Application.carta03}>
      <Card
        onClick={() => handleClickCarta("c3")}
        src={"images/"+baraja+"/"+cartasMc3+".png"}
        text={cartasMc3}
        selected={selectedCardM===cartasMc3}
      />
     </div>
     <div className={Application.carta04}>
      <Card
        onClick={() => handleClickCarta("c4")}
        src={"images/"+baraja+"/"+cartasMc4+".png"}
        text={cartasMc4}
        selected={selectedCardM===cartasMc4}
      />
     </div>
     <div className={Application.carta05}>
      <Card
        onClick={() => handleClickCarta("c5")}
        src={"images/"+baraja+"/"+cartasMc5+".png"}
        text={cartasMc5}
        selected={selectedCardM===cartasMc5}
      />
     </div>
     <div className={Application.carta06}>
      <Card
        onClick={() => handleClickCarta("c6")}
        src={"images/"+baraja+"/"+cartasMc6+".png"}
        text={cartasMc6}
        selected={selectedCardM===cartasMc6}
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
     <Dialog open={finished} handleClose={()=>window.location.reload()} aria-labelledby="form-dialog-title">
     <DialogTitle id="form-dialog-title">RESULTADO</DialogTitle>
     <DialogContentText>
      {resultado}
    </DialogContentText>
     <Button edge="end"  variant="outlined" aria-label="Aceptar" onClick={() => window.location.reload()}>
      Aceptar
     </Button>
     </Dialog>
    </div>
  );
}