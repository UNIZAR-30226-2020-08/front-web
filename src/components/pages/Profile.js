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
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
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
    },
    borrarcuenta: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: "green",
      color: "white",
      borderRadius: 8,
    },
    ultimasPartidas: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: "green",
      color: "white",
      borderRadius: 8,
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
    const [open3, setOpen3] = React.useState(false);

    const [open4, setOpen4] = React.useState(false);


    const viewMail = () => { 
      var data = {
        username: user.data.username,
      };
      UserService.find(data);
      setMail();
    }

    

     const handleTapete1 = () => {  
      var data = {
        username: user.data.username,
        f_tapete: 'tapete1',
      };
      UserService.update(data)
        .then(response => {
        })
        .catch(e => {
          console.log(e);
        });
        user.data.f_tapete='tapete1';
        AuthenticationDataService.updateCurrentUser(user);
      }

      const handleTapete2 = () => {  
        var data = {
          username: user.data.username,
          f_tapete: 't_default',
        };
        UserService.update(data)
          .then(response => {
          })
          .catch(e => {
            console.log(e);
          });
          user.data.f_tapete='tapete2';
          AuthenticationDataService.updateCurrentUser(user);
        }

        const handleBaraja1 = () => {  
          var data = {
            username: user.data.username,
            f_carta: 'baraja1',
          };
          UserService.update(data)
            .then(response => {
            })
            .catch(e => {
              console.log(e);
            });
            user.data.f_carta='baraja1';
            AuthenticationDataService.updateCurrentUser(user);

          }
    
          const handleBaraja2 = () => {  
            var data = {
              username: user.data.username,
              f_carta: 'baraja2',
            };
            UserService.update(data)
              .then(response => {
              })
              .catch(e => {
                console.log(e);
              });
              user.data.f_carta='baraja2';
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
                console.log(e);
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
      <div className={Application.container}>
        {! user ?
          history.push("/")
          :
          <Container component="main" maxWidth="xs" className={classes.container}>
          <div className={classes.top}>
            <h1 className={Application.header}>
                Mi Cuenta
            </h1>
          </div>
              <CssBaseline />
                  <Card className={classes.root}>
                      <CardContent>
                      <img src="images/LOGO.png" alt="logo las10ultimas" className={Application.icon}/>                                           
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
                                    <LocalBarIcon></LocalBarIcon>
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
                                  <ListItemText primary="250"/>
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
                                      Tapete 1
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
                                      Cartas 1
                                    </Typography>
                                  
                                  </CardContent>
                                </CardActionArea>                                                
                              </Card>
                              </Grid>
                              </Grid>
                          <Link to="/EditProfile" className='nav-links'>
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
                          <Link className='nav-links'>
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
                              <ListItem button>
                                <ListItemText primary="Partida 135" secondary="Victoria" />
                              </ListItem>
                              <Divider />
                              <ListItem button>
                                <ListItemText primary="Partida 134" secondary="Derrota" />
                              </ListItem>
                            </List>
                          </Dialog>
                          </div>
                          <div>
                          <Link  className='nav-links'>
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
        <div className={Application.chat}>
        <div className={Application.amigos}>
          <h1 className={Application.header}>
            Amigos
          </h1>
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
            />
          </div>
          <Friends/>
        </div>
        <div className={Application.torneos}>
          <h1 className={Application.header}>
            Torneos
          </h1>
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
            />
          </div>
          <Tournaments/>
        </div>
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
            <h2 id="transition-modal-title">Tapetes disponibles</h2>          
            <div id="transition-modal-description">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <Card button onClick={handleTapete1} className={classes.media1}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media2}
                        image="images/tapete1.jpg"
                        title="tapete1"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Tapete 1
                        </Typography>
                      </CardContent>
                    </CardActionArea>                              
                  </Card>                            
                  </Grid>
                  <Grid item xs={12} sm={6}>                             
                  <Card button onClick={handleTapete2} className={classes.media1}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media2}
                        image="images/tapete2.jpg"
                        title="tapete2"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Tapete 2
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    </Card>
                  </Grid>
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
            <h2 id="transition-modal-title">Cartas disponibles</h2>          
            <div id="transition-modal-description">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <Card button onClick={handleBaraja1} className={classes.media1}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media2}
                        image="images/baraja1/1B.png"
                        title="ascopas"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Cartas 1
                        </Typography>
                      </CardContent>
                    </CardActionArea>                                
                  </Card>                            
                  </Grid>
                  <Grid item xs={12} sm={6}>                             
                  <Card button onClick={handleBaraja2} className={classes.media1}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media2}
                        image="images/baraja1/1C.png"
                        title="asoros"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Cartas 2
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                      
                    </Card>
                  </Grid>
                  </Grid>
            </div>
          </div>
        </Fade>
      </Modal>
      </div>
      </div>
    );
  }