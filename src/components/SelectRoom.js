import React from 'react';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";

const exampleRooms = [
    {
      name: 'Sala 1',
      numusers: '4/4'
    },
    {
      name: 'Sala 2',
      numusers: '0/4'
    },
    {
      name: 'Sala 3',
      numusers: '1/4'
    },
    {
      name: 'Sala 4',
      numusers: '2/4'
    },
    {
      name: 'Sala 5',
      numusers: '3/4'
    }
  ]

function SelectRoom() {
    const [room,setRoom] = React.useState("");
   
    function AvailableRooms() {
        return exampleRooms.map((value) => {
          return(
            <ListItem button className="listItem">
                <ListItemText
                primary={value.nombre}
                secondary={"Usuarios en la sala: " + value.numusers}
                />
                <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="Unirse" onClick= {() => {setRoom(value.name)}}>
                    { room===value.name ?
                    <RadioButtonCheckedIcon />
                    :
                    <RadioButtonUncheckedIcon />
                    }
                </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
          )
        })
    }  

    return (
        <List className={classes.root}>
            {AvailableRooms(usuario)}
            <ListItem button className="listItem">
                <ListItemText
                primary="Crear una nueva sala"
                />
                <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="Añadir sala" onClick={() => {}}>
                    <AddIcon />
                </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </List>
    );
}

export default SelectRoom;