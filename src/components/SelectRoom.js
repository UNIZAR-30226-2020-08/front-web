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
import partidaService from '../services/partida.service';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

/*const exampleRooms = [
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
  ]*/

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

function SelectRoom(setRoom,setMatched,gamemode,socket,username) {
    const classes = useStyles();
    const [loaded,setLoaded] = React.useState(false);
    //const [loading,setLoading] = React.useState(false);
    //const [fail,setFail] = React.useState(false);
    const [rooms,setRooms] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [correct, setCorrect] = React.useState(false);
    const [created, setCreated] = React.useState(false);
    const [checkbox, setCheck] = React.useState(false);
    const [roomname, setRoomname] = React.useState("");

    const handleCheck = (e) =>{
      setCheck(e.target.checked);
    };
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const onChangeRoomname = (e) => {
      setRoomname(e.target.value);
    }

    const handleUnirsePartida = (setRoom,setMatched,value,username) => {
      setRoom(value.nombre);
      setMatched(true);
      let rm = value.nombre;
      socket.emit('join', { name:username, room:rm }, (error) => {
        if(error) {
          alert(error);
        }
      })
    }

    function CreateRoom() {
        setCreated(true);
        let data = {tipo: (gamemode-1)};
        if (roomname != ""){
          data = {tipo: (gamemode-1),
                  nombre: roomname
                 };
        }
        partidaService.create(data)
        .then(response => {
            setCorrect(true);
        })
        .catch(e => {
          setCorrect(false);
          console.log(e);
        });
    }

    function Reset() {
      setLoaded(false);
      setOpen(false);
      setCreated(false);
      setCorrect(false);
    }

    function AvailableRooms(setRoom,setMatched,username) {
        if (!loaded && gamemode>0){
            setLoaded(true);
            partidaService.getAll(gamemode-1).then(response => {
                setRooms(response);
                //setLoading(false);
                //console.log(response);
            })
            .catch(e => {
              console.log(e);
              //setLoading(false);
              //setFail(true);
            });
        }
        return rooms.map((value) => {
          return(
            <ListItem className="listItem" key={value.nombre}>
                <ListItemText
                primary={value.nombre}
                secondary={"Usuarios en la sala: " + value.jugadores_online}
                />
                <ListItemSecondaryAction>
                <Button edge="end"  variant="outlined" aria-label="Unirse" onClick={() => handleUnirsePartida(setRoom,setMatched,value,username)}>
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
          <ListItem button className="listItem" onClick={handleClickOpen}>
            <ListItemText
            primary="Crear una nueva sala"
            />
            <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="Añadir sala" onClick={handleClickOpen}>
                <AddIcon />
            </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          {AvailableRooms(setRoom,setMatched,username)}
        </List>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">CREAR PARTIDA</DialogTitle>
          { created ?
          <div>
            { correct ?
              Reset()
              :
              <div>
                <div>
                  <h1>
                  Algo salio mal...
                  </h1>
                </div>  
                <DialogActions>
                <Button edge="end"  variant="outlined" aria-label="Aceptar" onClick={handleClose}>
                  Aceptar
                </Button>
              </DialogActions>
              </div>
            }
          </div>
          :
          <div>
            <DialogContent>
              <DialogContentText>
                Introduzca los datos solicidatos.
              </DialogContentText>
                  <TextField
                      label="Nombre de la partida"
                      onChange={onChangeRoomname}
                      id="outlined-margin-normal"
                      placeholder= "Nombre de la partida (opcional)"
                      className={classes.textField}
                      margin="normal"
                      InputLabelProps={{
                          shrink: true
                      }}
                      fullWidth
                      variant="outlined"
                      value={roomname}
                  />
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox checked={checkbox} onChange={handleCheck} name="checkedB" color="primary" />}
                      label="Partida privada"
                    />
                  </FormGroup>
            </DialogContent>
            <DialogActions>
              <Button edge="end"  variant="outlined" aria-label="Cancelar" onClick={handleClose}>
                Cancelar
              </Button>
              <Button edge="end"  variant="outlined" aria-label="Crear" onClick={() => CreateRoom()}>
                Crear
              </Button>
            </DialogActions>
            </div>
          }         
        </Dialog>
      </div>
    );
}

export default SelectRoom;