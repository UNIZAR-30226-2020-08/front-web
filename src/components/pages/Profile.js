/*Proyecto:     Las10últimas
//Fecha:        marzo-2021
//Autor:        WBDevelopment
//Módulo:       Front-end del sistema Las10últimas
//Fichero:      Home.js
//Descripción:  Pagina de inicio del sistema Las10últimas*/

import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { fade,makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Application from "../application.module.scss"
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Friends from '../Amigos'
import Tournaments from '../Torneos'
import { Link } from 'react-router-dom';
import AuthenticationDataService from "../../services/auth.service";
import { useHistory } from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import CardActionArea from '@material-ui/core/CardActionArea';

import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

import UserService from "../../services/user.service";
import PartidaService from "../../services/partida.service";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import FondoCartaService from "../../services/fondo_carta.service";
import FondoTapeteService from "../../services/fondo_tapete.service";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    root: {
      width: 'fit-content',
      margin: 'auto',
      textAlign: 'center'
    },
    container: {
      padding: '2rem',
      paddingTop: '1rem'
    },
    top: {
      padding: '2rem',
      textAlign: 'center'
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: 'white',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: "green",
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      color: 'white',
    },
    text: {
      borderColor: 'white',
    },
    cambiarperfil: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: "green",
      color: "white",
      borderRadius: 8,
      '&:hover': {
        backgroundColor: "green",
        color: "white",}
    },
    borrarcuenta: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: "red",
      color: "white",
      borderRadius: 8,
      '&:hover': {
        backgroundColor: "red",
        color: "white",}
    },
    ultimasPartidas: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: "green",
      color: "white",
      borderRadius: 8,
      '&:hover': {
        backgroundColor: "green",
        color: "white",}
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
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },   
    link: {
      color: "green"
    },
    button: {
      backgroundColor: '#3c52b2',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#fff',
        color: '#3c52b2',
    }},
    
    media1: {
      maxWidth: 345,
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper1: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    mostrartexto: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: "green",
      border: 1,
      borderColor: "white",
      borderRadius: 16
    },
    media2: {
      height: 140,
    },
    appBar: {
      position: 'relative',
      backgroundColor: "green",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }));

  export default function Profile() {
    const classes = useStyles();
    const history = useHistory();

    const user = AuthenticationDataService.getCurrentUser();

    const [open1,setOpen1] = React.useState(false);
    const [open2,setOpen2] = React.useState(false);
    const [mail, setMail] = React.useState("");
    const [numeroo, setNumero] = React.useState();
    const [open3, setOpen3] = React.useState(false);
    const [cartas,setCartas] = React.useState([]);
    const [tapetes,setTapetes] = React.useState([]);
    const [partidas,setPartidas] = React.useState([]);
    const [loaded,setLoaded] = React.useState(false);
    const [loaded2,setLoaded2] = React.useState(false);
    const [loaded3,setLoaded3] = React.useState(false);
    const [personalizacion1,setPersonalizacion1] = React.useState(0);
    const [personalizacion2,setPersonalizacion2] = React.useState(100);
    const [personalizacion3,setPersonalizacion3] = React.useState(200);
    const [personalizacion4,setPersonalizacion4] = React.useState(300);

    const [open4, setOpen4] = React.useState(false);


    function AvailableBarajas() {
      
      var data = {
      };

      if (!loaded){
        setLoaded(true);
        FondoCartaService.findAll(data).then(response => {
          //console.log(response.data)
          setCartas(response.data);
        })
        .catch(e => {
          //console.log(e);
        });
    }
    
      return cartas.map((value) => {
        return(
          
          <Grid item xs={12} sm={6} key={value.f_carta}>
          {value.f_carta === "baraja1" && user.data.copas >= personalizacion1 ?
          <Card button onClick={() => {handleBaraja1(value.f_carta);handleClose();}} className={classes.media1}>
            <CardActionArea>
              <CardMedia
                className={classes.media2}
                image={"images/"+value.f_carta+"/0O.png"}
                title="ascopas"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {value.f_carta}
                </Typography>
              </CardContent>
            </CardActionArea>                                
          </Card> : <></>}
          {value.f_carta === "baraja2" && user.data.copas >= personalizacion2 ?
          <Card button onClick={() => {handleBaraja1(value.f_carta);handleClose();}} className={classes.media1}>
            <CardActionArea>
              <CardMedia
                className={classes.media2}
                image={"images/"+value.f_carta+"/0O.png"}
                title="ascopas"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {value.f_carta}
                </Typography>
              </CardContent>
            </CardActionArea>                                
          </Card> : <></>}
          {value.f_carta === "baraja3" && user.data.copas >= personalizacion3 ?
          <Card button onClick={() => {handleBaraja1(value.f_carta);handleClose();}} className={classes.media1}>
            <CardActionArea>
              <CardMedia
                className={classes.media2}
                image={"images/"+value.f_carta+"/0O.png"}
                title="ascopas"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {value.f_carta}
                </Typography>
              </CardContent>
            </CardActionArea>                                
          </Card> : <></>}
          {value.f_carta === "baraja4" && user.data.copas >= personalizacion4 ?
          <Card button onClick={() => {handleBaraja1(value.f_carta);handleClose();}} className={classes.media1}>
            <CardActionArea>
              <CardMedia
                className={classes.media2}
                image={"images/"+value.f_carta+"/0O.png"}
                title="ascopas"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {value.f_carta}
                </Typography>
              </CardContent>
            </CardActionArea>                                
          </Card> : <></>}
          </Grid> 
          
      
        )
      })
    }
    function AvailableTapetes() {
      
      var data = {
      };

      if (!loaded2){
        //console.log("Lleegaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        setLoaded2(true);
        FondoTapeteService.findAll(data).then(response => {
          //console.log(response.data)
          setTapetes(response.data);
        })
        .catch(e => {
          //console.log(e);
        });
    }

      return tapetes.map((value) => {
        return(
          
          <Grid item xs={12} sm={6} key={value.f_tapete}>
            {value.f_tapete === "tapete1" && user.data.copas > personalizacion1 ?
          <Card button onClick={() => {handleTapete1(value.f_tapete);;handleClose();}} className={classes.media1}>
            <CardActionArea>
              <CardMedia
                className={classes.media2}
                image={"images/"+value.f_tapete+".jpg"}
                title="ascopas"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {value.f_tapete}
                </Typography>
              </CardContent>
            </CardActionArea>                                
          </Card> : <></>}
          {value.f_tapete === "tapete2" && user.data.copas > personalizacion2 ?
          <Card button onClick={() => {handleTapete1(value.f_tapete);;handleClose();}} className={classes.media1}>
            <CardActionArea>
              <CardMedia
                className={classes.media2}
                image={"images/"+value.f_tapete+".jpg"}
                title="ascopas"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {value.f_tapete}
                </Typography>
              </CardContent>
            </CardActionArea>                                
          </Card> : <></>}
          {value.f_tapete === "tapete3" && user.data.copas > personalizacion3 ?
          <Card button onClick={() => {handleTapete1(value.f_tapete);;handleClose();}} className={classes.media1}>
            <CardActionArea>
              <CardMedia
                className={classes.media2}
                image={"images/"+value.f_tapete+".jpg"}
                title="ascopas"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {value.f_tapete}
                </Typography>
              </CardContent>
            </CardActionArea>                                
          </Card> : <></>}
          {value.f_tapete === "tapete4" && user.data.copas > personalizacion4 ?
          <Card button onClick={() => {handleTapete1(value.f_tapete);;handleClose();}} className={classes.media1}>
            <CardActionArea>
              <CardMedia
                className={classes.media2}
                image={"images/"+value.f_tapete+".jpg"}
                title="ascopas"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {value.f_tapete}
                </Typography>
              </CardContent>
            </CardActionArea>                                
          </Card> : <></>}
          </Grid>
          
      
        )
      })
    }

    function AvailableHistorial() {
      
      var data = {
        username: user.data.username,
      };

      if (!loaded3){
        setLoaded3(true);
        PartidaService.historial(data).then(response => {
          //console.log(response.data)
          setPartidas(response.data);
          //console.log(response.data.length)
          setNumero(response.data.length);
        })
        .catch(e => {
          //console.log(e);
        });
    }

      return partidas.map((value) => {
        return(         
          <ListItem key={value.nombre}>
            {value.tipo === 0 && value.estado === "VICTORIA" && value.puntos_e0 > value.puntos_e1?
            <ListItemText style={{ backgroundColor: '#9CEE83', padding:"20px" }} primary= { "INDIVIDUALES" } secondary={value.estado + " Mis puntos: " + value.puntos_e0 + " Puntos rival: " + value.puntos_e1} />
            : <></>
            }
            {value.tipo === 0 && value.estado === "VICTORIA" && value.puntos_e1 > value.puntos_e0?
            <ListItemText style={{ backgroundColor: '#9CEE83', padding:"20px" }} primary= { "INDIVIDUALES" } secondary={value.estado + " Mis puntos: " + value.puntos_e1 + " Puntos rival: " + value.puntos_e0} />
            : <></>
            }
            {value.tipo === 0 && value.estado === "DERROTA" && value.puntos_e0 < value.puntos_e1?
            <ListItemText style={{ backgroundColor: '#F66464', padding:"20px" }} primary= { "INDIVIDUALES" } secondary={value.estado + " Mis puntos: " + value.puntos_e0 + " Puntos rival: " + value.puntos_e1} />
            : <></>
            }
            {value.tipo === 0 && value.estado === "DERROTA" && value.puntos_e1 < value.puntos_e0?
            <ListItemText style={{ backgroundColor: '#F66464', padding:"20px" }} primary= { "INDIVIDUALES" } secondary={value.estado + " Mis puntos: " + value.puntos_e1 + " Puntos rival: " + value.puntos_e0} />
            : <></>
            }
            {value.tipo === 1 && value.estado === "VICTORIA" && value.puntos_e0 > value.puntos_e1?
            <ListItemText style={{ backgroundColor: '#9CEE83', padding:"20px" }} primary= { "POR PAREJAS" } secondary={value.estado + " Puntos de mi equipo: " + value.puntos_e0 + " Puntos equipo rival: " + value.puntos_e1} />
            : <></>
            }
            {value.tipo === 1 && value.estado === "VICTORIA" && value.puntos_e1 > value.puntos_e0?
            <ListItemText style={{ backgroundColor: '#9CEE83', padding:"20px" }} primary= { "POR PAREJAS" } secondary={value.estado + " Puntos de mi equipo: " + value.puntos_e1 + " Puntos equipo rival: " + value.puntos_e0} />
            : <></>
            }
            {value.tipo === 1 && value.estado === "DERROTA" && value.puntos_e0 < value.puntos_e1?
            <ListItemText style={{ backgroundColor: '#F66464', padding:"20px" }} primary= { "POR PAREJAS" } secondary={value.estado + " Puntos de mi equipo: " + value.puntos_e0 + " Puntos equipo rival: " + value.puntos_e1} />
            : <></>
            }
            {value.tipo === 1 && value.estado === "DERROTA" && value.puntos_e1 < value.puntos_e0?
            <ListItemText style={{ backgroundColor: '#F66464', padding:"20px" }} primary= { "POR PAREJAS" } secondary={value.estado + " Puntos de mi equipo: " + value.puntos_e1 + " Puntos equipo rival: " + value.puntos_e0} />
            : <></>
            }
            
          </ListItem> 
        )
      })
    }

    

     const handleTapete1 = (tapetee) => {  
      var data = {
        username: user.data.username,
        f_tapete: tapetee,
      };
      UserService.update(data)
        .then(response => {
        })
        .catch(e => {
          //console.log(e);
        });
        user.data.f_tapete=tapetee;
        AuthenticationDataService.updateCurrentUser(user);
      }

        const handleBaraja1 = (cartaa) => {  
          var data = {
            username: user.data.username,
            f_carta: cartaa,
          };
          UserService.update(data)
            .then(response => {
            })
            .catch(e => {
              //console.log(e);
            });
            user.data.f_carta=cartaa;
            AuthenticationDataService.updateCurrentUser(user);

          }
    
    

    const handleOpen1 = () => {
      setOpen1(true);
    };
    const handleOpen2 = () => {
      setOpen2(true);
    };
  
    const handleClose = () => {
      setOpen1(false);
      setOpen2(false);
    };

    const handleClickOpen3 = () => {
      setOpen3(true);
    };
  
    const handleClose3 = () => {
      setOpen3(false);
    };

    const handleClose3Eliminar = () => {
      var data = {
        username: user.data.username,
      };
      UserService.delete(data)
              .then(response => {
              })
              .catch(e => {
                //console.log(e);
              });
      setOpen3(false);
      AuthenticationDataService.logout();
    };

    const handleClickOpen4 = () => {
      setOpen4(true);
    };
  
    const handleClose4 = () => {
      setOpen4(false);
    };

  
    return (
      <div className={Application.container2}>
        {! user ?
          history.push("/")
          :
          <Container component="main" maxWidth="xs" className={classes.container} style={{ paddingTop: '0rem', }}>
          <div className={classes.top} style={{ paddingTop: '0rem', paddingBottom: '0rem', }}>
            <h1 className={Application.header}>
                Mi Cuenta
            </h1>
          </div>
              <CssBaseline />
                  <Card className={classes.root}>
                      <CardContent>
                      <img src="images/LOGO.png" alt="logo las10ultimas" className={Application.icon} onClick={() => {}}/>                                           
                        <div className={classes.paper}>
                          <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                              <List component="nav" className={classes.mostrartexto} aria-label="Nombre de Usuario">
                                <ListItem>
                                  <ListItemIcon>
                                  <AccountCircleIcon></AccountCircleIcon>
                                  </ListItemIcon>
                                  <ListItemText  primary={user.data.username}/>
                                </ListItem>
                              </List>
                              </Grid>
                            <Grid item xs={12}>
                            <List component="nav" className={classes.mostrartexto} aria-label="Email">
                                <ListItem>
                                  <ListItemIcon>
                                  <EmailIcon></EmailIcon>
                                  </ListItemIcon>
                                  <ListItemText primary={user.data.email}/>
                                </ListItem>
                              </List>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                          <List component="nav" className={classes.mostrartexto} aria-label="Copas">
                                <ListItem >
                                  <ListItemIcon>
                                    <EmojiEventsIcon></EmojiEventsIcon>
                                  </ListItemIcon>
                                  <ListItemText primary={user.data.copas}/>
                                </ListItem>
                              </List>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <List component="nav" className={classes.mostrartexto} aria-label="Partidas Jugadas">
                                <ListItem >
                                  <ListItemIcon>
                                    <SportsEsportsIcon></SportsEsportsIcon>
                                  </ListItemIcon>
                                  <ListItemText primary={numeroo}/>
                                </ListItem>
                              </List>
                            </Grid>
                          </Grid>
                          <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                          <Card button onClick={handleOpen1} className={classes.media1}>
                                <CardActionArea>
                                  <CardMedia
                                    className={classes.media2}
                                    image={"images/"+user.data.f_tapete+".jpg"}
                                    title="As Oros"
                                  />
                                  <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                     {user.data.f_tapete}
                                    </Typography>
                                  
                                  </CardContent>
                                </CardActionArea>                                
                              </Card>                            
                              </Grid>
                              <Grid item xs={12} sm={6}>                             
                              <Card button onClick={handleOpen2} className={classes.media1}>
                                <CardActionArea>
                                  <CardMedia
                                    className={classes.media2}
                                    image={"images/"+user.data.f_carta+"/0O.png"}
                                    title="As Oros"
                                  />
                                  <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                     {user.data.f_carta}
                                    </Typography>
                                  
                                  </CardContent>
                                </CardActionArea>                                                
                              </Card>
                              </Grid>
                              </Grid>
                          <Link to="/EditProfile" style={{ textDecoration: 'none' }} >
                          <Button
                              type="customizar"
                              fullWidth
                              variant="contained"
                              color="primary"
                              className={classes.cambiarperfil}
                              
                          >
                              Editar Perfil
                          </Button>
                          </Link>
                          <div>
                          <Link style={{ textDecoration: 'none' }}>
                          <Button
                              type="ultimasPartidas"
                              fullWidth
                              variant="contained"
                              color="primary"
                              className={classes.ultimasPartidas}
                              onClick={handleClickOpen4}
                          >
                              Últimas Partidas
                          </Button>
                          </Link>
                          <Dialog fullScreen open={open4} onClose={handleClose4} TransitionComponent={Transition}>
                            <AppBar className={classes.appBar}>
                              <Toolbar >
                                <IconButton edge="start" color="inherit" onClick={handleClose4} aria-label="close">
                                  <CloseIcon />
                                </IconButton>
                                <Typography variant="h6" className={classes.title}>
                                  Últimas Partidas
                                </Typography>
                              </Toolbar>
                            </AppBar>
                            <List>
                              {AvailableHistorial()}
                            </List>
                          </Dialog>
                          </div>
                          <div>
                          <Link style={{ textDecoration: 'none' }}>
                          <Button
                              type="borrarcuenta"
                              fullWidth
                              variant="contained"
                              color="primary"
                              className={classes.borrarcuenta}
                              onClick={handleClickOpen3}
                          >
                              Borrar Cuenta
                          </Button>  
                          </Link>                      
                            <Dialog
                              open={open3}
                              onClose3={handleClose3}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                            >
                              <DialogTitle id="alert-dialog-title">{"¿Esta seguro de que desea borrar su cuenta?"}</DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                  Esta acción es irreversible y no podrá recuperar su cuenta una vez ejecutada.
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleClose3} color="primary">
                                  Volver
                                </Button>
                                <Button onClick={handleClose3Eliminar} color="primary" autoFocus>
                                  Borrar
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </div>                                                                         
                          </form>
                      </div>
                  </CardContent>
              </Card>
          </Container>
        }
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open1}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open1}>
          <div className={classes.paper1}>
            <h2 id="transition-modal-title" style={{ padding: '10px' }}>Tapetes disponibles</h2>          
            <div id="transition-modal-description">
            <Grid container spacing={2}>
              {AvailableTapetes()}
                  </Grid>
            </div>
          </div>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open2}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open2}>
          <div className={classes.paper1}>
            <h2 id="transition-modal-title" style={{ padding: '10px' }}>Cartas disponibles</h2>          
            <div id="transition-modal-description">
            <Grid container spacing={2}>
              {AvailableBarajas()}
              </Grid>
            </div>
          </div>
        </Fade>
      </Modal>
      </div>
    );
  }