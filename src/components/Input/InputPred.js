import React from 'react';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';

import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => (
  <div style={{margin:"auto"}}>
    <IconButton className="sendButton" onClick={e => {setMessage("😡");sendMessage(e);}}>
      😡
    </IconButton>
    <IconButton className="sendButton" onClick={e => {setMessage("👍");sendMessage(e);}}>
      👍
    </IconButton>
    <IconButton className="sendButton" onClick={e => {setMessage("😂");sendMessage(e);}}>
      😂
    </IconButton>
    <IconButton className="sendButton" onClick={e => {setMessage("¡Hola!");sendMessage(e);}}>
      ¡Hola!
    </IconButton>
  </div>
)

export default Input;