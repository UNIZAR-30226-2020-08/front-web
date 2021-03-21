/*Proyecto:     Las10últimas
//Fecha:        marzo-2021
//Autor:        WBDevelopment
//Módulo:       Front-end del sistema Las10últimas
//Fichero:      Customize.js
//Descripción:  Pagina de inicio del sistema Las10últimas*/

import React from 'react';
import Application from './application.module.scss'

export default function Customize() {
  
  return (
    <div>
      <h1 className={Application.header}>
        Tapete
      </h1>
      <div className={Application.customize}>
        <div className={Application.leftC}>
          <img className={Application.arrow} alt="flecha" src="/images/flechaIzq.png" />
        </div>
        <div className={Application.customizable}>
          
        </div>
        <div className={Application.rightC}>
          <img className={Application.arrow} alt="flecha" src="/images/flechaDer.png" />
        </div>
      </div>
      <h1 className={Application.header}>
        Baraja
      </h1>
      <div className={Application.customize}>
        <div className={Application.leftC}>
          <img className={Application.arrow} alt="flecha" src="/images/flechaIzq.png" />
        </div>
        <div className={Application.customizable}>
          
        </div>
        <div className={Application.rightC}>
          <img className={Application.arrow} alt="flecha" src="/images/flechaDer.png" />
        </div>
      </div>
      <h1 className={Application.header}>
        Baraja (Dorso)
      </h1>
      <div className={Application.customize}>
        <div className={Application.leftC}>
          <img className={Application.arrow} alt="flecha" src="/images/flechaIzq.png" />
        </div>
        <div className={Application.customizable}>
          
        </div>
        <div className={Application.rightC}>
          <img className={Application.arrow} alt="flecha" src="/images/flechaDer.png" />
        </div>
      </div>
    </div>
  );
}
