import React, {useEffect,useRef} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { fade, makeStyles } from '@material-ui/core/styles';
import Application from "./application.module.scss";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TorneoService from "../services/torneo.service";
import AuthenticationDataService from "../services/auth.service";
import ParticipantesTorneoService from "../services/participantes_torneo.service";
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Bracket, RoundProps } from 'react-brackets';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import torneoService from '../services/torneo.service';

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      marginTop: "6px",
      height: "25vh",
      margin: "auto",
      overflow: "auto"
    },
    root2: {
      width: "100%",
      marginTop: "6px",
      height: "25vh",
      margin: "auto",
      overflow: "auto"
    },
    lista: {
      width: "100%",
      marginTop: "6px",
      height: "25vh",
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
      width: '100%',
      overflow: "auto",
      backgroundColor: theme.palette.background.paper,
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
    },
    root5: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton5: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
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

function Tournaments(props) {
    const setGamemode = props.setGamemode
    const setMatched = props.setMatched
    const gamemodeRef = props.gamemode
    const username = props.username
    const roomName = props.roomName
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [torneos,setTorneos] = React.useState([]);
    const [torneosB,setTorneosB] = React.useState({nombre:""});
    const [loadedListaTorneos,setLoadedListaTorneos] = React.useState(false);
    const [loadedTorneoBuscado,setLoadedTorneoBuscado] = React.useState(true);
    const [loadedTorneoUnirse,setLoadedTorneoUnirse] = React.useState(false);
    const [loadedTorneoCreado,setLoadedTorneoCreado] = React.useState(false);
    const [nombreTorneo,setnombreTorneo] = React.useState("");
    const [torneo,setTorneo] = React.useState(torneoService.getCurrentTournament());
    const user = AuthenticationDataService.getCurrentUser() ? AuthenticationDataService.getCurrentUser() : {data:{username:'anonimo'}};
    const [openBracket, setOpenBracket] = React.useState(false);
    const [openTorneoCreado, setOpenTorneoCreado] = React.useState(false);
    const [input,setInput] = React.useState("");
    const [largo, setLargo] = React.useState(false);
    const [TournamentName, setTournamentname] = React.useState("");
    const [correct, setCorrect] = React.useState(true);
    const [created, setCreated] = React.useState(false);
    const [contrasenya, setContrasenya] = React.useState("");
    const [partidaActual, setPartidaActual] = React.useState({});
    const [torneoReady, settorneoReady] = React.useState(false);
    const [errorNameTorneo,setErrorNameTorneo] = React.useState(false);
    const [equipos,setEquipos] = React.useState([]);
    const [equipo1,setnombreEquipo1] = React.useState("");
    const [equipo2,setnombreEquipo2] = React.useState("");
    const [equipo3,setnombreEquipo3] = React.useState("");
    const [equipo4,setnombreEquipo4] = React.useState("");
    const [equipo5,setnombreEquipo5] = React.useState("");
    const [equipo6,setnombreEquipo6] = React.useState("");
    const [equipo7,setnombreEquipo7] = React.useState("");
    const [equipo8,setnombreEquipo8] = React.useState("");
    const [equipo9,setnombreEquipo9] = React.useState("");
    const [equipo10,setnombreEquipo10] = React.useState("");
    const [equipo11,setnombreEquipo11] = React.useState("");
    const [equipo12,setnombreEquipo12] = React.useState("");
    const [equipo13,setnombreEquipo13] = React.useState("");
    const [equipo14,setnombreEquipo14] = React.useState("");
    const [equipo15,setnombreEquipo15] = React.useState("");
    const [equipo16,setnombreEquipo16] = React.useState("");

    const rounds = [
      {
        title: 'Cuartos',
        seeds: [
          {
            id: 1,
            date: new Date().toDateString(),
            teams: [{ name: equipo1 }, { name: equipo2 }],
          },
          {
            id: 2,
            date: new Date().toDateString(),
            teams: [{ name: equipo3 }, { name: equipo4 }],
          },
          {
            id: 3,
            date: new Date().toDateString(),
            teams: [{ name: equipo5 }, { name: equipo6 }],
          },
          {
            id: 4,
            date: new Date().toDateString(),
            teams: [{ name: equipo7 }, { name: equipo8 }],
          },
        ],
      },
      {
        title: 'Semifinales',
        seeds: [
          {
            
              id: 5,
              date: new Date().toDateString(),
              teams: [{ name: 'Team A' }, { name: 'Team C' }],
            },
            {
              id: 6,
              date: new Date().toDateString(),
              teams: [{ name: 'Team G' }, { name: 'Team F' }],
            
          },
        ],
      },
      {
        title: 'Final',
        seeds: [
          {     
              id: 7,
              date: new Date().toDateString(),
              teams: [{ name: 'Team A' }, { name: 'Team F' }],
            },
        ],
      },
    ];

    const rounds2 = [
      {
        title: 'Octavos',
        seeds: [
          {
            id: 1,
            date: new Date().toDateString(),
            teams: [{ name: equipo1 }, { name: equipo2 }],
          },
          {
            id: 2,
            date: new Date().toDateString(),
            teams: [{ name: equipo3 }, { name: equipo4 }],
          },
          {
            id: 3,
            date: new Date().toDateString(),
            teams: [{ name: equipo5 }, { name: equipo6 }],
          },
          {
            id: 4,
            date: new Date().toDateString(),
            teams: [{ name: equipo7 }, { name: equipo8 }],
          },
          {
            id: 5,
            date: new Date().toDateString(),
            teams: [{ name: equipo9 }, { name: equipo10 }],
          },
          {
            id: 6,
            date: new Date().toDateString(),
            teams: [{ name: equipo11 }, { name: equipo12 }],
          },
          {
            id: 7,
            date: new Date().toDateString(),
            teams: [{ name: equipo13 }, { name: equipo14 }],
          },
          {
            id: 8,
            date: new Date().toDateString(),
            teams: [{ name: equipo15 }, { name: equipo16 }],
          },
        ],
      },
      {
        title: 'Cuartos',
        seeds: [
          {
            id: 9,
            date: new Date().toDateString(),
            teams: [{ name: equipo1 }, { name: equipo2 }],
          },
          {
            id: 10,
            date: new Date().toDateString(),
            teams: [{ name: equipo3 }, { name: equipo4 }],
          },
          {
            id: 11,
            date: new Date().toDateString(),
            teams: [{ name: equipo5 }, { name: equipo6 }],
          },
          {
            id: 12,
            date: new Date().toDateString(),
            teams: [{ name: equipo7 }, { name: equipo8 }],
          },
        ],
      },
      {
        title: 'Semifinales',
        seeds: [
          {
            
              id: 13,
              date: new Date().toDateString(),
              teams: [{ name: 'Team A' }, { name: 'Team C' }],
            },
            {
              id: 14,
              date: new Date().toDateString(),
              teams: [{ name: 'Team G' }, { name: 'Team F' }],
            
          },
        ],
      },
      {
        title: 'Final',
        seeds: [
          {     
              id: 15,
              date: new Date().toDateString(),
              teams: [{ name: 'Team A' }, { name: 'Team F' }],
            },
          ],
      },
    ]
  

    const ElBrack = () => {
      if (largo){
      return (
        <Bracket rounds={rounds2}/>
      );}
      else{
        return (
          <Bracket rounds={rounds}/>
        );
      }
    };

    
    function Reset() {
      setLoadedTorneoCreado(false);
      setOpenTorneoCreado(false);
      setCreated(false);
    }
    
    const onChangeInput = (e) => {
      setInput(e.target.value);
      
    }

    const onChangeTournamentname = (e) => {
      if(e.target.value !== ""){
        setErrorNameTorneo(false);
      }else{
        setErrorNameTorneo(true);
      }
      setTournamentname(e.target.value);
    }

    const onChangeContrasenya = (e) => {
      setContrasenya(e.target.value);
    }

    const handleChangeScrollable = (event, newValue) => {
      setValue(newValue);
      setLoadedListaTorneos(false);
      if(newValue === 0 || newValue === 1){
        setLargo(false);
      }else{
        setLargo(true);
      }
      if(newValue===4){
        setLoadedTorneoBuscado(false);
      }else{
        setLoadedTorneoBuscado(true);
      }
    };

    const handleClickBracket = (namee) => {
      setnombreTorneo(namee);
      setOpenBracket(true);
    };
    const handleCloseBracket = () => {
      setOpenBracket(false);
    };

    const handleClickOpenCrearTorneo = () => {
      setOpenTorneoCreado(true);
    }

    const handleCloseTorneoCreado = () => {
      setOpenTorneoCreado(false);
    };

    function AvailableBTorneos() {
      var data = {
        torneo:input,
      };
      if (!loadedTorneoBuscado){
        setLoadedTorneoBuscado(true);
        TorneoService.find(data).then(response => {
          setTorneosB(response.data);
          if(response.data.nparticipantes === 8){
            setLargo(false);
          }else if(response.data.nparticipantes === 16){
            setLargo(true);
          }
        })
        .catch(e => {
        });
    }
      
      if (torneosB.nombre !== "" && torneosB.nombre !== undefined ){
        return(       
          <ListItem key={torneosB.nombre} className="listItem">
          <ListItemText
          primary={torneosB.nombre}
          secondary={"Tipo: "+torneosB.nparticipantes+" jugadores. "}
          />
          <ListItemSecondaryAction>
                {torneo && torneo.torneo === torneosB.nombre  ?
                <Button edge="end"  variant="outlined" aria-label="Ver Bracket" onClick= {() => {handleClickBracket(torneosB.nombre);}}>
                Ver Brackets
                </Button> :
                <></> 
                }

                {torneo &&  torneo.torneo!=="" ?
                <></> :
                <Button edge="end"  variant="outlined" aria-label="Unirse" onClick= {() => {UnirseTorneo(data,torneosB.nombre);}}>
                    Unirse
                </Button>}
          </ListItemSecondaryAction>
      </ListItem> 
        )}
    
    };

    

    function UnirseTorneo(value,torneoDisp) {
      setnombreTorneo(torneoDisp);
      var data = {
        torneo: torneoDisp,
        tipo:value.tipo,
        npart:value.npart,
        username: username
      };
      console.log("Torneo")
      console.log(data)
      if(torneo){
        setTorneo(data);
        torneoService.updateCurrentTournament(data);
      }else{
        setTorneo(data);
        torneoService.createCurrentTournament(data);
      }
      setLoadedListaTorneos(false);
      props.socket.emit('joinTournament', { name:user.data.username, tournament:torneoDisp , tipo: value.tipo, nTeams:value.npart}, (error) => {
        if(error) {
          alert("No se ha podido unir al torneo");
        }
      })
    };

    

    function VerCrearTorneo(tipoEquipo,Nparticipantess){
      return(
        <Dialog open={openTorneoCreado} onClose={handleCloseTorneoCreado} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{"CREAR TORNEO " +  (tipoEquipo===0 ? "INDIVIDUAL" : "POR PAREJAS") + " DE " + Nparticipantess + " EQUIPOS" }</DialogTitle>
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
              <Button edge="end"  variant="outlined" aria-label="Aceptar" onClick={handleCloseTorneoCreado}>
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
                    label="Nombre del torneo"
                    onChange={onChangeTournamentname}
                    id="outlined-margin-normal-2"
                    placeholder= "Nombre del torneo"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true
                    }}
                    fullWidth
                    variant="outlined"
                    error={errorNameTorneo}
                    helperText={errorNameTorneo ? 'El nombre del torneo no puede ser vacio' : ' ' }
                    value={TournamentName}
                />

                <TextField
                    label="Contraseña (Opcional)"
                    onChange={onChangeContrasenya}
                    id="outlined-margin-normal"
                    placeholder= "Contraseña"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true
                    }}
                    fullWidth
                    variant="outlined"
                    value={contrasenya}
                />
                
          </DialogContent>
          <DialogActions>
            <Button edge="end"  variant="outlined" aria-label="Cancelar" onClick={handleCloseTorneoCreado}>
              Cancelar
            </Button>
            <Button edge="end"  variant="outlined" aria-label="Crear" onClick={() => {CreateTournament(TournamentName,tipoEquipo,Nparticipantess,contrasenya,user.data.username,false);setLoadedTorneoCreado(false)}}>
              Crear
            </Button>
            <Button edge="end"  variant="outlined" aria-label="Crear" onClick={() => {CreateTournament(TournamentName,tipoEquipo,Nparticipantess,contrasenya,user.data.username,true);setLoadedTorneoCreado(false);}}>
              Crear y unirse
            </Button>
          </DialogActions>
          </div>
        }         
      </Dialog>
      )
    }


    
    function AvailableTournaments(tip,part) {
      var data = {
        username: user.data.username,
        tipo: tip,
        npart: part,
      };
      if (!loadedListaTorneos){
        setLoadedListaTorneos(true);
        TorneoService.findAll(data).then(response => {
          setTorneos(response.data);
        })
        .catch(e => {
        });
      }

    
      return torneos.map((value) => {
        return(
          <ListItem key={value.nombre} className="listItem">
                
                <ListItemText
                primary={value.nombre}
                secondary={value.jugadores_online+" participantes"}
                />
                <ListItemSecondaryAction>
                {torneo && torneo.torneo === value.nombre  ?
                <Button edge="end"  variant="outlined" aria-label="Unirse" onClick= {() => {handleClickBracket(value.nombre); }}>
                Ver Brackets
                </Button> :
                <></> 
                }

                {torneo &&  torneo.torneo!=="" ?
                <></> :
                <Button edge="end"  variant="outlined" aria-label="Unirse" onClick= {() => {setnombreTorneo(value.nombre); UnirseTorneo(data,value.nombre);}}>
                    Unirse
                </Button>}
                </ListItemSecondaryAction>
            </ListItem>
        )
      })
    
    };

    const handleUnirsePartida = (value,nombreeTorneo) => {
      setGamemode(value.tipo + 1);
      gamemodeRef.current = value.tipo + 1;
      roomName.current = partidaActual.partida;
      setMatched(true);
      let rm = partidaActual.partida;
      props.socket.emit('join', { name:username, room:rm , tipo: value.tipo}, (error) => {
        if(error) {
          alert("La partida ", partidaActual.partida, " del torneo ", nombreeTorneo, " ya no está disponible");
        }
      })
    }

    function CreateTournament(nombree,tipoo,nparticipantess,contrasenyaa,username,join) {
      var correct = true;
      var data = {
        nombre: nombree,
        tipo: tipoo,
        nparticipantes: nparticipantess,
      };
      if (TournamentName != ""){
        if(contrasenyaa!= ""){
          var data = {
                  nombre: nombree,
                  tipo: tipoo,
                  nparticipantes: nparticipantess,
                  contrasenya: contrasenyaa,
                };
              }
      }else{
        correct = false;
        setErrorNameTorneo(true);
      }

      if(!loadedTorneoCreado && correct){
        setCreated(true);
        setLoadedTorneoCreado(true);
        TorneoService.create(data)
        .then(response => {
            if(join){
              setnombreTorneo(response.nombre);
              var data = {
                username: username,
                tipo: response.tipo,
                npart: nparticipantess,
              };
              console.log("Create tournament")
              console.log(data)
              console.log(response.nombre)
              UnirseTorneo(data,response.nombre);
            }
            setLoadedListaTorneos(false);
            setCorrect(true);
        })
        .catch(e => {
          setCorrect(false);
        });
      }
  };

    useEffect(() => {
      props.socket.on("matches", ( dataMatches ) => {
        settorneoReady(true);
        setEquipos(dataMatches);
        var d;
        for(d of dataMatches){
          if(d.jugador === username){
              setPartidaActual(d);
          }
        }
      });
    }, []);

    return (
      <div className={Application.selectTournament}>
          <AppBar position="static" color="transparent" className={classes.bar}>
          <Tabs
            value={value}
            onChange={handleChangeScrollable}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
          >
            <Tab label="Individuales 8 equipos" icon={<PersonIcon />} {...a11yProps(0)} />
            <Tab label="Por Parejas 8 equipos" icon={<GroupIcon />} {...a11yProps(1)} />
            <Tab label="Individuales 16 equipos" icon={<PersonIcon />} {...a11yProps(2)}  />
            <Tab label="Por Parejas 16 equipos" icon={<GroupIcon />} {...a11yProps(3)} />
            <Tab label="Buscador" icon={<SearchIcon />} {...a11yProps(4)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
        {torneo && torneo.tipo===0 && torneo.npart === 8?
            <div>           
              <ListItemText
              primary={torneo.torneo}
              secondary="Torneo en Juego"
              />
              <List>          
              <ListItem>
              <Button  className={Application.actionB}  variant="outlined" onClick={()=>{handleClickBracket(value.nombre);}}>
                  Ver Bracket
              </Button> 
              </ListItem>
              <ListItem>
              {torneoReady ?
              <></>
              :
              <Button  className={Application.actionB}  variant="outlined" onClick={()=>{torneoService.removeCurrentTournament();window.location.reload()}}>
                  Abandonar
              </Button> 
              }
              </ListItem>
              </List>
            </div>
            :
            <Button edge="end"  variant="outlined" style={{ marginTop: '10px' }} onClick={() => {handleClickOpenCrearTorneo();setLoadedTorneoUnirse(false);}}>
                Nuevo Torneo
            </Button>
            }
            {torneo && torneo.tipo===0 && torneo.npart === 8?
            <></>
            :
            <List className={classes.lista}>
              {value === 0 ? AvailableTournaments(0,8) : <></>}
            </List>
            }
            {VerCrearTorneo(0,8)}
      </TabPanel>
      
      <TabPanel value={value} index={1}>
      {torneo && torneo.tipo===1 && torneo.npart === 8?
            <div>           
              <ListItemText
              primary={torneo.torneo}
              secondary="Torneo en Juego"
              />
              <List>          
              <ListItem>
              <Button  className={Application.actionB}  variant="outlined" onClick={()=>{handleClickBracket(value.nombre);}}>
                  Ver Bracket
              </Button> 
              </ListItem>
              <ListItem>
              {torneoReady ?
              <></>
              :
              <Button  className={Application.actionB}  variant="outlined" onClick={()=>{torneoService.removeCurrentTournament();window.location.reload()}}>
                  Abandonar
              </Button> 
              }
              </ListItem>
              </List>
            </div>
            :
            <Button edge="end"  variant="outlined" style={{ marginTop: '10px' }} onClick={() => {handleClickOpenCrearTorneo();setLoadedTorneoUnirse(false);}}>
                Nuevo Torneo
            </Button>
            }
            {torneo && torneo.tipo===1 && torneo.npart === 8?
            <></>
            :
            <List className={classes.lista}>
              {value === 1 ? AvailableTournaments(1,8) : <></>}
            </List>
            }
            {VerCrearTorneo(1,8)}
      </TabPanel>
      
      <TabPanel value={value} index={2}>
        {torneo && torneo.tipo===0 && torneo.npart === 16?
            <div>           
              <ListItemText
              primary={torneo.torneo}
              secondary="Torneo en Juego"
              />
              <List>          
              <ListItem>
              <Button  className={Application.actionB}  variant="outlined" onClick={()=>{handleClickBracket(value.nombre);}}>
                  Ver Bracket
              </Button> 
              </ListItem>
              <ListItem>
              {torneoReady ?
              <></>
              :
              <Button  className={Application.actionB}  variant="outlined" onClick={()=>{torneoService.removeCurrentTournament();window.location.reload()}}>
                  Abandonar
              </Button> 
              }
              </ListItem>
              </List>
            </div>
            :
            <Button edge="end"  variant="outlined" style={{ marginTop: '10px' }} onClick={() => {handleClickOpenCrearTorneo();setLoadedTorneoUnirse(false);}}>
                Nuevo Torneo
            </Button>
            }
            {torneo && torneo.tipo===0 && torneo.npart === 16?
            <></>
            :
            <List className={classes.lista}>
              {value === 2 ? AvailableTournaments(0,16) : <></>}
            </List>
            }
            {VerCrearTorneo(0,16)}
      </TabPanel>

      <TabPanel value={value} index={3}>
      {torneo && torneo.tipo===1 && torneo.npart === 16?
            <div>           
              <ListItemText
              primary={torneo.torneo}
              secondary="Torneo en Juego"
              />
              <List>          
              <ListItem>
              <Button  className={Application.actionB}  variant="outlined" onClick={()=>{handleClickBracket(value.nombre);}}>
                  Ver Bracket
              </Button> 
              </ListItem>
              <ListItem>
              {torneoReady ?
              <></>
              :
              <Button  className={Application.actionB}  variant="outlined" onClick={()=>{torneoService.removeCurrentTournament();window.location.reload()}}>
                  Abandonar
              </Button> 
              }     
              </ListItem>
              </List>
            </div>
            :
            <Button edge="end"  variant="outlined" style={{ marginTop: '10px' }} onClick={() => {handleClickOpenCrearTorneo();setLoadedTorneoUnirse(false);}}>
                Nuevo Torneo
            </Button>
            }
            {torneo && torneo.tipo===1 && torneo.npart === 16?
            <></>
            :
            <List className={classes.lista}>
              {value === 3 ? AvailableTournaments(1,16) : <></>}
            </List>
            }
            {VerCrearTorneo(1,16)}
      </TabPanel>

      <TabPanel value={value} index={4}>
      <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Buscar torneo"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={onChangeInput}
              />
            </div>
            <Button edge="end"  variant="outlined" style={{ marginTop: '10px', marginLeft: '10px' }} onClick={() => {AvailableBTorneos();setLoadedTorneoBuscado(false);}}>
                Buscar
            </Button>
            <List className={classes.lista}>
          {AvailableBTorneos()}
          </List>
      </TabPanel>

      <Dialog onClose={handleCloseBracket} aria-labelledby="customized-dialog-title" open={openBracket} style={{ maxWidth: "100%" }}>
        <DialogTitle id="customized-dialog-title">
          Torneo {nombreTorneo}
        </DialogTitle>
        <div>
        {ElBrack()}
        </div>
        {torneoReady ?
        <Button style={{  margin: "auto",width: "60vh"}}  variant="outlined" aria-label="Unirse" marginTop="15" onClick= {() => {handleUnirsePartida(torneo,nombreTorneo)}}>
          Jugar
        </Button>
        :
        <Button  style={{ margin: "auto",backgroundColor: "#F1948A", width: "60vh"}} variant="outlined" aria-label="Unirse" marginTop="15" onClick= {() => {}}>
          Esperando a los demas jugadores
        </Button>}
      </Dialog>
      </div>
    );
}

export default Tournaments;