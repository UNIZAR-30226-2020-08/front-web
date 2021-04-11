import React from 'react';
import Application from "./application.module.scss"
import Card from "./Card"
import Usuario from "./Usuario"
import Button from '@material-ui/core/Button';

export default function Board() {

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
        copas={"300"+"🏆"}
        image="images/userlogo.png"
      />
     </div>
     <div className={Application.carta1}>
      <Card
        src='images/baraja1/asoros.jpg'
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
        copas={"216"+"🏆"}
        image="images/userlogo.png"
      />
     </div>
     <div className={Application.carta2}>
      <Card
        src='images/baraja1/seisoros.jpg'
        text='Seis de Oros'
      />
     </div>
     <div className={Application.usuario3}>
      <Usuario
        nombre="DIEGGG"
        copas={"251"+"🏆"}
        image="images/userlogo.png"
      />
     </div>
     <div className={Application.carta3}>
      <Card
        src='images/baraja1/cuatrooros.jpg'
        text='Cuatro de Oros'
      />
     </div>
     <div className={Application.mazo1}>
     <Card
        src='images/baraja1/dosbastos.jpg'
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
        <Button variant="contained" className={Application.actionButton}>CAMBIAR 7</Button>
      </h1>
     </div>
     <div className={Application.carta00}>
      <Card
        src='images/baraja1/asbastos.jpg'
        text='As de Bastos'
      />
     </div>
     <div className={Application.carta01}>
      <Card
        src='images/baraja1/tresbastos.jpg'
        text='Tres de Bastos'
      />
     </div>
     <div className={Application.carta02}>
      <Card
        src='images/baraja1/dosespadas.jpg'
        text='Dos de Espadas'
      />
     </div>
     <div className={Application.carta03}>
      <Card
        src='images/baraja1/tresespadas.jpg'
        text='Tres de Espadas'
      />
     </div>
     <div className={Application.carta04}>
      <Card
        src='images/baraja1/cuatroespadas.jpg'
        text='Cuatro de Espadas'
      />
     </div>
     <div className={Application.carta05}>
      <Card
        src='images/baraja1/cincoespadas.jpg'
        text='Cinco de Espadas'
      />
     </div>
     <div className={Application.carta06}>
      <Card
        src='images/baraja1/sieteoros.jpg'
        text='Siete de Oros'
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
