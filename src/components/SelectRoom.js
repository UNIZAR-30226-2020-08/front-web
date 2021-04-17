import React from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from '@material-ui/core/styles';
import Application from "./application.module.scss";
import PartidaService from "../services/partida.service"

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
    },
    {
      name: 'Sala 6',
      numusers: '3/4'
    },
    {
      name: 'Sala 7',
      numusers: '3/4'
    },
    {
      name: 'Sala 8',
      numusers: '3/4'
    },
    {
      name: 'Sala 9',
      numusers: '3/4'
    },
    {
      name: 'Sala 10',
      numusers: '3/4'
    },
    {
      name: 'Sala 11',
      numusers: '3/4'
    }
  ]

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    height: "80vh",
    borderRadius: "10px",
    backgroundColor: theme.palette.background.paper,
    margin: "auto",
    overflow: "auto"
  },
  cont: {
    width: "100%",
    height: "100%",
    margin: "auto",
    overflow: "hidden"
  },
  aux: {
    overflow: "auto" 
  }
}));

function SelectRoom(setRoom,setMatched,gamemode) {
    const classes = useStyles();
    const [loaded,setLoaded] = React.useState(false);

    function AvailableRooms(setRoom,setMatched) {
        if (!loaded){
          
        }
        return exampleRooms.map((value) => {
          return(
            <ListItem className="listItem">
                <ListItemText
                primary={value.name}
                secondary={"Usuarios en la sala: " + value.numusers}
                />
                <ListItemSecondaryAction>
                <Button edge="end"  variant="outlined" aria-label="Unirse" onClick= {() => {setRoom(value.name);
                                                                                            setMatched(true)}}>
                    Unirse
                </Button>
                </ListItemSecondaryAction>
            </ListItem>
          )
        })
    }  

    return (
      <div className={Application.selectRoom}>
        <List className={classes.root}>
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
          {AvailableRooms(setRoom,setMatched)}
        </List>
      </div>
    );
}

export default SelectRoom;