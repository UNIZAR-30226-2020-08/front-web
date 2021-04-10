import React from 'react';
import Application from './application.module.scss'

function Usuario(props) {
  return (
    <div className={Application.user}>
        <div className={Application.userlogo}>
            <img className={Application.imageuser} src={props.image} alt={props.nombre}/>
        </div>
        <div className={Application.nombre}>
            <h1>{props.nombre}</h1>
        </div>
        <div className={Application.copas}>
            <h1>{props.copas}</h1>
        </div>    
    </div>
  );
}

export default Usuario;