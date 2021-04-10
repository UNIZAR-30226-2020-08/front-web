import React from 'react';
import Application from "./application.module.scss"
import CardItem from "./CardItem"
import "./Cards.css"

export default function Board() {

  return (
    <div className={Application.tapete}>
     <div className={Application.controles1}>
      <h1 className={Application.header}>
        Ctrl1
      </h1>
     </div>
     <div className={Application.usuario1}>
      <h1 className={Application.header}>
        User1
      </h1>
     </div>
     <div className={Application.carta1}>
      <CardItem
        src='images/baraja1/asoros.jpg'
        text='As de Oros'
      />
     </div>
     <div className={Application.bazas1}>
      Sus Bazas
      <CardItem
        src='images/baraja1/reverso.png'
        text='Tus Bazas'
      />
     </div>
     <div className={Application.usuario2}>
      <h1 className={Application.header}>
        User2
      </h1>
     </div>
     <div className={Application.carta2}>
      <CardItem
        src='images/baraja1/seisoros.jpg'
        text='Seis de Oros'
      />
     </div>
     <div className={Application.usuario3}>
      <h1 className={Application.header}>
        User3
      </h1>
     </div>
     <div className={Application.carta3}>
      <CardItem
        src='images/baraja1/cuatrooros.jpg'
        text='Cuatro de Oros'
      />
     </div>
     <div className={Application.mazo1}>
      <h1 className={Application.header}>
        Mazo1
      </h1> 
     </div>
     <div className={Application.mazo2}>
      <CardItem
        src='images/baraja1/reverso.png'
        text='Tus Bazas'
      />
     </div>
     <div className={Application.controles2}>
      <h1 className={Application.header}>
        Ctrl2
      </h1>
     </div>
     <div className={Application.carta00}>
      <CardItem
        src='images/baraja1/asbastos.jpg'
        text='As de Bastos'
      />
     </div>
     <div className={Application.carta01}>
      <CardItem
        src='images/baraja1/tresbastos.jpg'
        text='Tres de Bastos'
      />
     </div>
     <div className={Application.carta02}>
      <CardItem
        src='images/baraja1/dosespadas.jpg'
        text='Dos de Espadas'
      />
     </div>
     <div className={Application.carta03}>
      <CardItem
        src='images/baraja1/tresespadas.jpg'
        text='Tres de Espadas'
      />
     </div>
     <div className={Application.carta04}>
      <CardItem
        src='images/baraja1/cuatroespadas.jpg'
        text='Cuatro de Espadas'
      />
     </div>
     <div className={Application.carta05}>
      <CardItem
        src='images/baraja1/cincoespadas.jpg'
        text='Cinco de Espadas'
      />
     </div>
     <div className={Application.carta06}>
      <CardItem
        src='images/baraja1/sieteoros.jpg'
        text='Siete de Oros'
      />
     </div>
     <div className={Application.bazas2}>
      Tus Bazas
      <CardItem
        src='images/baraja1/reverso.png'
        text='Tus Bazas'
      />
     </div>
    </div>
  );
}
