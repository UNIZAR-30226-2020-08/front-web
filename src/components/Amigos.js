import React, {useEffect,useRef} from 'react';
//import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
//import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { fade,makeStyles } from '@material-ui/core/styles';
import Application from "./application.module.scss";
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import partidaService from '../services/partida.service';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AmigoService from "../services/amigo.service";
import AuthenticationDataService from "../services/auth.service";
import UserService from "../services/user.service";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ContactsIcon from '@material-ui/icons/Contacts';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
    width: '100%',
  },
  lista: {
    width: "100%",
    marginTop: "6px",
    height: "30vh",
    margin: "auto",
    overflow: "auto"
  },
  lista2: {
    width: "100%",
    marginTop: "6px",
    height: "40vh",
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
  },
  pestana: {
    width: "100%",
    height: "100%",
    margin: "auto",
  },
  pestana2: {
    width: "100%",
    height: "100%",
    margin: "auto",
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }, 
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    maxWidth: '100%',
    width: '50vh',
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

function Friends(props) {
    const setGamemode = props.setGamemode
    const setMatched = props.setMatched
    const gamemodeRef = props.gamemode
    const username = props.username
    const roomName = props.roomName
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [rank, setRank] = React.useState(0);
    const [busqueda, setBusqueda] = React.useState(false);
    const [amigs,setAmigs] = React.useState([]);
    const [global,setGlobal] = React.useState([]);
    const [busc,setBusc] = React.useState([]);
    const [solicitudes,setSolicitudes] = React.useState([]);
    const invitacionesRecibidas = useRef([]);
    const [invitaciones,setInvitaciones] = React.useState([]);
    const [loaded,setLoaded] = React.useState(false);
    const [loaded2,setLoaded2] = React.useState(false);
    const [loaded3,setLoaded3] = React.useState(true);
    const [loaded4,setLoaded4] = React.useState(false);
    const [bien,setBien] = React.useState(false);
    const [input,setInput] = React.useState("");
    const [inviteDialog,setInviteDialog] = React.useState(false);
    const [nombreranking,setNombreRanking] = React.useState("");
    
    const user = AuthenticationDataService.getCurrentUser() ? AuthenticationDataService.getCurrentUser() : {data:{username:'anonimo'}};


    const handleChange = (event, newValue) => {
      setValue(newValue);
      setRank(newValue);
      setBusqueda(false);
      if(newValue==2){
        setLoaded2(false);
      }
    };

    const onChangeInput = (e) => {
      setInput(e.target.value);
      console.log(e.target.value);
    }

    const handleSolicitar = (amigoo) => {   
      var data = {
          usuario: user.data.username,
          amigo: amigoo,
        };
        AmigoService.create(data)
          .then(response => {
          })
          .catch(e => {
            console.log(e);
          });
      }
    
    const handleAceptar = (amigo) => {   
      var data = {
          username: user.data.username,
          amigoname: amigo,
        };
        setLoaded(false);
        setLoaded2(false);
        AmigoService.aceptar(data)
          .then(response => {
          })
          .catch(e => {
            console.log(e);
          });
          setLoaded(false);
          setLoaded2(false);
      }

      const handleEliminar = (amigo) => {   
        var data = {
            username: user.data.username,
            amigoname: amigo,
          };
          AmigoService.delete(data)
            .then(response => {
            })
            .catch(e => {
              console.log(e);
            });
        }

    function handleInvitar(value){
      setGamemode(1);
      gamemodeRef.current = 1;
      let data = {tipo: 0};
      partidaService.create(data)
      .then(response => {
          props.socket.emit('join', { name:username, room:response.nombre , tipo: parseInt(0)}, (error) => {
            if(error) {
              alert(error);
            }
          })
          props.socket.emit('enviarInvitacion', { username:username, nombre:response.nombre , tipo: parseInt(0), destinatario:value.username}, (error) => {
            if(error) {
              alert(error);
            }
          })
          roomName.current = response.nombre;
          setMatched(true);
      })
      .catch(e => {
        console.log(e);
      });
    } 

    function AvailableFriends() {
      var data = {
        username: user.data.username,
      };

      if (!loaded){
        setLoaded(true);
        AmigoService.findAll(data).then(response => {
          console.log(response.data)
          setAmigs(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

      return amigs.map((value) => {
        return(
          <ListItem key={value} className="listItem">
          <ListItemText
          primary={value.username}
          secondary={value.copas+"🏆"}
          />
          <ListItemSecondaryAction>
          {rank === 0? 
           <Button edge="end"  onClick={()=>handleInvitar(value)} variant="outlined" aria-label="Unirse" style={{ marginRight: '10px' }}>
           Invitar
            </Button>
            : <></>}
          {rank === 0? 
           <IconButton  onClick={() => {handleEliminar(value.username);setLoaded(false)}} style={{ marginLeft: '30px' }}>
             <DeleteIcon />
            </IconButton>
            : <></>}
          </ListItemSecondaryAction>
      </ListItem>
        )
      })
    }

    function AvailableFriends2() {
      var data = {
        username: input,
      };

      if (!loaded3){
        setLoaded3(true);
        UserService.find(data).then(response => {
          console.log(response.data)
          setBusc(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    if(busc.username !== undefined){
        return(
          <ListItem key={busc.username} className="listItem">
          <ListItemText
          primary={busc.username}
          secondary={busc.copas+"🏆"}
          />
          <ListItemSecondaryAction>
           <Button edge="end"  variant="outlined" aria-label="Solicitar" onClick={() => {handleSolicitar(busc.username);}}>
           Solicitar
            </Button>
          </ListItemSecondaryAction>
      </ListItem>
        )
    
    }
  }

    function AvailableGlobal() {
      var data = {
      };

      if (!loaded4){
        setLoaded4(true);
        UserService.findAll(data).then(response => {
          console.log(response.data)
          setGlobal(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

      return global.map((value) => {
        return(
          
            <ListItem key={value} className="listItem">    
            {value.username !== "IA" ? 
            <ListItemText
            primary={value.username}
            secondary={value.copas+"🏆"}
            />
            :
            <></>
            }
            </ListItem>
            
          
        )
      })
    }

  const handleUnirse = (value) => {
    setGamemode(1);
    gamemodeRef.current = 1;
    roomName.current = value.nombre;
    setMatched(true);
    let rm = value.nombre;
    console.log(username , " " , rm, " ")
    props.socket.emit('join', { name:username, room:rm , tipo: value.tipo}, (error) => {
      if(error) {
        alert("La invitacion a la partida ", value.nombre, " ya no está disponible");
      }
    })
  }

    function AvailableInvitaciones() {
      return invitaciones.map((value) => {
        return(
          <ListItem key={value} className="listItem">
          <ListItemText
          primary={value.username}
          secondary="Individual"
          />
          <ListItemSecondaryAction>
          <Button edge="end"  variant="outlined" onClick={()=>{handleUnirse(value)}}>
              Unirse
          </Button>
          </ListItemSecondaryAction>
          </ListItem>
        )
      })
    }

    function AvailableSolicitudes() {
      var data = {
        username: user.data.username,
      };

      if (!loaded2){
        setLoaded2(true);
        AmigoService.listarSolicitudes(data).then(response => {
          if(response.data.message == 'No se ha encontrado ninguna solicitud de amistad'){
            setBien(false);
          }else{
            setSolicitudes(response.data);
            setBien(true);
          }
          
        })
        .catch(e => {
          setBien(false);
          console.log(e);
        });
    }
      
        if(bien){
        return solicitudes.map((value) => {
          return(
            <ListItem key={value} className="listItem">
            <ListItemText
            primary={value.usuario}
            />
            <ListItemSecondaryAction>
            <Button edge="end"  variant="outlined" onClick={() => {handleAceptar(value.usuario);setLoaded2(false);setLoaded(false);}}>
                Aceptar
            </Button>
            </ListItemSecondaryAction>
        </ListItem>
          )
        })}
    }

    useEffect(() => {
      props.socket.on("invitacionRecibida", ( data ) => {
        console.log("Invitacion recibida")
        console.log(data)
        if(data.destinatario === username){
          invitacionesRecibidas.current.push(data);
          setInvitaciones(invitacionesRecibidas.current);
          setInviteDialog(true);
        }
      });
    }, []);


    return (
     <div className={classes.root}>
       <AppBar position="static" color="transparent" className={classes.bar}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        indicatorColor="primary"
        textColor="primary"
        aria-label="scrollable force tabs example"
        className={classes.pestana}
        
      >
        <Tab label="Amigos" icon={<ContactsIcon />} {...a11yProps(0)} />
        {<Tab label="Invitaciones" icon={<SendIcon />} {...a11yProps(1)} />}
        {<Tab label="Solicitudes" icon={<PersonAddIcon />} {...a11yProps(2)} />}
        {<Tab label="Ranking Amigos" icon={<EmojiEventsIcon />} {...a11yProps(3)} />}
        {<Tab label="Ranking Global" icon={<EmojiEventsIcon />} {...a11yProps(4)} />}
        
        
      </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Buscar usuario"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={onChangeInput}
              />
          </div>
          <Button edge="end"  variant="outlined" style={{ marginTop: '10px' }} onClick={() => {AvailableFriends2();setBusqueda(true);setLoaded3(false);}}>
                Buscar
            </Button>
          
        <List className={classes.lista}>
        { busqueda ? AvailableFriends2() :  AvailableFriends() }
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List className={classes.lista2}>
            {AvailableInvitaciones()}
          </List>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <List className={classes.lista2}>
          {AvailableSolicitudes()}
        </List>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <List className={classes.lista2}>
            {AvailableFriends()}
          </List>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <List className={classes.lista2}>
            {AvailableGlobal()}
          </List>
      </TabPanel>
      <Dialog open={inviteDialog} handleClose={()=>setInviteDialog(false)} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">INVITACIÓN</DialogTitle>
      <DialogContentText>
        Se te ha invitado a una partida
      </DialogContentText>
      <Button edge="end"  variant="outlined" aria-label="Cancelar" onClick={() => {setInviteDialog(false)}}>
        Cancelar
      </Button>
      <Button edge="end"  variant="outlined" aria-label="Aceptar" onClick={() => {setValue(1);setInviteDialog(false);}}>
        Ver invitación
      </Button>
      </Dialog>
  </div>
    );
}

export default Friends;