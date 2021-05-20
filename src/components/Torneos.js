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
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { Bracket, RoundProps } from 'react-brackets';

import GroupIcon from '@material-ui/icons/Group';

import PersonIcon from '@material-ui/icons/Person';



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

const DialogTitle = withStyles(useStyles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

function Tournaments(props) {
    const setGamemode = props.setGamemode
    const setMatched = props.setMatched
    const gamemodeRef = props.gamemode
    const username = props.username
    const roomName = props.roomName
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [value2, setValue2] = React.useState(0);
    const [torneos,setTorneos] = React.useState([]);
    const [torneosB,setTorneosB] = React.useState({nombre:""});
    const [loaded,setLoaded] = React.useState(false);
    const [loaded2,setLoaded2] = React.useState(true);
    const [loaded3,setLoaded3] = React.useState(false);
    const [loaded4,setLoaded4] = React.useState(false);
    const [loaded8,setLoaded8] = React.useState(false);
    const [nombreTorneo,setnombreTorneo] = React.useState("");
    const user = AuthenticationDataService.getCurrentUser() ? AuthenticationDataService.getCurrentUser() : {data:{username:'anonimo'}};
    const [open5, setOpen5] = React.useState(false);
    const [open6, setOpen6] = React.useState(false);
    const [open7, setOpen7] = React.useState(false);
    const [input,setInput] = React.useState("");
    const [largo, setLargo] = React.useState(false);
    const [inicial, setInicial] = React.useState(1);
    const [busqueda, setBusqueda] = React.useState(false);
    const [TournamentName, setTournamentname] = React.useState("");
    const [checkbox, setCheck] = React.useState(false);
    const [correct, setCorrect] = React.useState(true);
    const [created, setCreated] = React.useState(false);
    const [tipoo, setTipoo] = React.useState(0);
    const [participantes, setParticipantes] = React.useState(0);
    const [contrasenya, setContrasenya] = React.useState("");
    const [partidaActual, setPartidaActual] = React.useState({});

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
      setLoaded8(false);
      setOpen7(false);
      setCreated(false);
    }
    
    const onChangeInput = (e) => {
      setInput(e.target.value);
      console.log(e.target.value);
      
    }

    const onChangeTournamentname = (e) => {
      setTournamentname(e.target.value);
    }

    const onChangeContrasenya = (e) => {
      setContrasenya(e.target.value);
    }

    const handleChange = (event, newValue) => {
      setValue(newValue);
      setLoaded(false);
      if(newValue === 0 || newValue === 1){
        setLargo(false);
        setInicial(1);
      }else{
        setLargo(true);
        setInicial(0);
      }
      if(newValue===4){
        setLoaded2(false);
      }else{
        setLoaded2(true);
      }
    };

    const handleClickOpen5 = (namee) => {
      setnombreTorneo(namee);
      setOpen5(true);
      
    };
    const handleClose5 = () => {
      setOpen5(false);
    };

    const handleClickOpen7 = () => {
      setOpen7(true);
    }

    const handleCheck = (e) =>{
      setCheck(e.target.checked);
    };

    const handleClose7 = () => {
      setOpen7(false);
    };

    const handleClickOpen6 = (namee) => {
      setnombreTorneo(namee);
      setOpen6(true);
      
    };
    const handleClose6 = () => {
      setOpen6(false);
    };

    function AvailableBTorneos() {
      var data = {
        torneo:input,
      };

      if (!loaded2){
        setLoaded2(true);
        TorneoService.find(data).then(response => {
          console.log(response);
          setTorneosB(response.data);
          if(response.data.nparticipantes === 8){
            console.log("8");
            setLargo(false);
            setInicial(1);
          }else if(response.data.nparticipantes === 16){
            console.log("16");
            setLargo(true);
            setInicial(0);
          }
        })
        .catch(e => {
          console.log(e);
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
           <Button edge="end"  variant="outlined" aria-label="Solicitar" onClick={() => {handleClickOpen6(value.nombre); UnirseTorneo(value.nombre);handleUnirseTorneo(torneosB);}}>
           Unirse
            </Button>
            <Dialog onClose={handleClose6} aria-labelledby="customized-dialog-title" open={open6} style={{ maxWidth: "100%" }}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose6}>
                      Torneo {torneosB.nombre}
                    </DialogTitle>
                    <div>
                    {ElBrack()}
                    </div>
                    <Button edge="end"  variant="outlined" aria-label="Unirse" marginTop="15" onClick= {() => {handleUnirsePartida(data,nombreTorneo)}}>
                      Jugar
                    </Button>
                  </Dialog>
          </ListItemSecondaryAction>
      </ListItem> 
        )}
    
    };

    

    function UnirseTorneo(torneoDisp) {
      var data = {
        torneo: torneoDisp,
        jugador: user.data.username,
      };
      if (!loaded4){
        setLoaded4(true);
        ParticipantesTorneoService.create(data).then(response => {
          console.log(response);
          setLoaded2(false);
          setLoaded(false);
        })
        .catch(e => {
          console.log(e);
        });
    }
        return(  
          <></>    
        )
    
    };

    

    function VerCrearTorneo(tipoEquipo,Nparticipantess){
      return(
        <Dialog open={open7} onClose={handleClose7} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{"CREAR TORNEO " + tipoEquipo + " " + Nparticipantess }</DialogTitle>
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
              <Button edge="end"  variant="outlined" aria-label="Aceptar" onClick={handleClose7}>
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
                    id="outlined-margin-normal"
                    placeholder= "Nombre del torneo"
                    className={classes.textField}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true
                    }}
                    fullWidth
                    variant="outlined"
                    value={TournamentName}
                />

                <TextField
                    label="Contraseña (Opcional)"
                    onChange={onChangeContrasenya}
                    id="outlined-margin-normal"
                    placeholder= "Contraseña"
                    className={classes.textField}
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
            <Button edge="end"  variant="outlined" aria-label="Cancelar" onClick={handleClose7}>
              Cancelar
            </Button>
            <Button edge="end"  variant="outlined" aria-label="Crear" onClick={() => {CreateTournament(TournamentName,tipoEquipo,Nparticipantess,contrasenya,user.data.username,false);setLoaded8(false)}}>
              Crear
            </Button>
            <Button edge="end"  variant="outlined" aria-label="Crear" onClick={() => {CreateTournament(TournamentName,tipoEquipo,Nparticipantess,contrasenya,user.data.username,true);setLoaded8(false);}}>
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
      if (!loaded){
        setLoaded(true);
        TorneoService.findAll(data).then(response => {
          console.log(response.data)
          setTorneos(response.data);
        })
        .catch(e => {
          console.log(e);
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
                <Button edge="end"  variant="outlined" aria-label="Unirse" onClick= {() => {handleClickOpen5(value.nombre); UnirseTorneo(value.nombre); handleUnirseTorneo(data,nombreTorneo);}}>
                    Unirse
                </Button>
                  <Dialog onClose={handleClose5} aria-labelledby="customized-dialog-title" open={open5} style={{ maxWidth: "100%" }}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose5}>
                      Torneo {nombreTorneo}
                    </DialogTitle>
                    <div>
                    {ElBrack()}
                    </div>
                    <Button edge="end"  variant="outlined" aria-label="Unirse" marginTop="15" onClick= {() => {handleUnirsePartida(data,nombreTorneo)}}>
                      Jugar
                    </Button>
                  </Dialog>
                </ListItemSecondaryAction>
            </ListItem>
        )
      })
    
    };

    const handleUnirseTorneo = (value,nombreeTorneo) => {
      props.socket.emit('joinTournament', { name:user.data.username, tournament:nombreeTorneo , tipo: value.tipo, nTeams:value.npart}, (error) => {
        if(error) {
          alert("No se ha podido unir al torneo");
        }
      })
    }

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
      setCreated(true);
      if (TournamentName != ""){
        if(contrasenyaa!= ""){
          var data = {
                  nombre: nombree,
                  tipo: tipoo,
                  nparticipantes: nparticipantess,
                  contrasenya: contrasenyaa,
                };
          }else{
            var data = {
              nombre: nombree,
              tipo: tipoo,
              nparticipantes: nparticipantess,
            };
          }
      }
      
      if(!loaded8){
        setLoaded8(true);
        console.log(data);
        TorneoService.create(data)
        .then(response => {
            if(join){
                handleClickOpen5(TournamentName);
              setLoaded4(true);
              let value = {
                nombre: response.nombre
              }
              console.log("Legaaaaaaaaaaaaaaaaaaaaa: "+ nombree);
              UnirseTorneo(nombree);
              setLoaded(false);
            }
            setCorrect(true);
        })
        .catch(e => {
          setCorrect(false);
          console.log(e);
        });
      }
  };

    useEffect(() => {
      props.socket.on("matches", ( dataMatches ) => {
       console.log("Matches: "+dataMatches);
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
            onChange={handleChange}
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
            <Button edge="end"  variant="outlined" style={{ marginTop: '10px' }} onClick={() => {handleClickOpen7();setLoaded4(false);}}>
                Nuevo Torneo
            </Button>
            {VerCrearTorneo(0,8)}
          <List className={classes.lista}>
          {value === 0? AvailableTournaments(0,8): <></>}
          </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
            <Button edge="end"  variant="outlined" style={{ marginTop: '10px' }} onClick={() => {handleClickOpen7();setLoaded4(false);}}>
                Nuevo Torneo
            </Button>
            {VerCrearTorneo(1,8)}
          <List className={classes.lista}>
          {value === 1? AvailableTournaments(1,8): <></>}
          </List>
      </TabPanel>
      <TabPanel value={value} index={2}>
            <Button edge="end"  variant="outlined" style={{ marginTop: '10px' }} onClick={() => {handleClickOpen7();setLoaded4(false);}}>
                Nuevo Torneo
            </Button>
            {VerCrearTorneo(0,16)}
          <List className={classes.lista}>
          {value === 2? AvailableTournaments(0,16): <></>}
          </List>
      </TabPanel>
      <TabPanel value={value} index={3}>
            <Button edge="end"  variant="outlined" style={{ marginTop: '10px' }} onClick={() => {handleClickOpen7();setLoaded4(false);}}>
                Nuevo Torneo
            </Button>
            {VerCrearTorneo(1,16)}
          <List className={classes.lista}>
          {value === 3? AvailableTournaments(1,16): <></>}
          </List>
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
            <Button edge="end"  variant="outlined" style={{ marginTop: '10px', marginLeft: '10px' }} onClick={() => {AvailableBTorneos();setLoaded2(false);}}>
                Buscar
            </Button>
            <List className={classes.lista}>
          {AvailableBTorneos()}
          </List>
      </TabPanel>

      </div>
    );
}

export default Tournaments;