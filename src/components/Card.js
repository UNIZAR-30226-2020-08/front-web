import React from 'react';
import { Link } from 'react-router-dom';
import "./Card.css"

function CardItem(props) {
  return (
    <>
        <Link className='cards__item__link' >
            <img
              className={props.alternative ? 'cards__item__img alternative' : 'cards__item__img'}
              alt={props.text}
              src={props.src}
            />
        </Link>
    </>
  );
}

export default CardItem;
