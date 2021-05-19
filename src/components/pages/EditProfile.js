/*Proyecto:     Las10últimas
//Fecha:        marzo-2021
//Autor:        WBDevelopment
//Módulo:       Front-end del sistema Las10últimas
//Fichero:      Home.js
//Descripción:  Pagina de inicio del sistema Las10últimas*/

import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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
import { useHistory } from "react-router-dom";
import UserService from "../../services/user.service";
import AuthenticationDataService from "../../services/auth.service";
import FotoPerfilService from "../../services/foto_perfil.service";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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

    butoon: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: "green",
      color: "white",
      borderRadius: 8,
      '&:hover': {
        backgroundColor: "green",
        color: "white",}
    },
    

    
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: "white",
      color: "green"
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
    media2: {
      height: 140,
    },
    media1: {
      maxWidth: 345,
    },  
    link: {
      color: "green"
    }
  }));

  export default function EditProfile() {
    const classes = useStyles();
    const history = useHistory();
    const user = AuthenticationDataService.getCurrentUser();

    const [mail, setMail] = React.useState("");
    const [errorMail, setErrorMail] = React.useState(false);
    const [loading,setLoading] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [passwd, setPasswd] = React.useState("");
    const [failAuth, setFailAuth] = React.useState(false);
    const [failAuth2, setFailAuth2] = React.useState(false);
    const [errorUsername, setErrorUsername] = React.useState(false);
    const [errorPasswd, setErrorPasswd] = React.useState(false);
    const [passwdBis, setPasswdBis] = React.useState("");
    const [errorPasswdBis, setErrorPasswdBis] = React.useState(false);
    const [loaded,setLoaded] = React.useState(false);
    const [logos,setLogos] = React.useState([]);
    const [open1,setOpen1] = React.useState(false);


    const emailRegEx = /^\S+@\S+\.\S+$/;

    const onChangeUsername = (e) => {
      setUsername(e.target.value);
      if (e.target.value === ""){
        setErrorUsername(true);
      }
      else
      {
        setErrorUsername(false);
      }
    }
    
    const onChangeMail = (e) => {
    
      setMail(e.target.value);
      if (!emailRegEx.test(e.target.value)){
        setErrorMail(true);
      }
      else
      {
        setErrorMail(false);
      }
    }

    const onChangePasswd = (e) => {
      setPasswd(e.target.value);
      
      if (e.target.value === ""){
        setErrorPasswd(true);
      }
      else
      {
        setErrorPasswd(false);
      }
    }
  
    const onChangePasswdBis = (e) => {
      setPasswdBis(e.target.value);
      if (e.target.value === passwd){
        setErrorPasswdBis(false);
      }
      else
      {
        setErrorPasswdBis(true);
      }
    }


    const handleUpdate2 = () => {  
     var noErrors = true;
     if(!emailRegEx.test(mail)){
     setErrorMail(true);
     noErrors= false;
     }
     if (noErrors){
      var data = {
        username: user.data.username,
        email: mail,
      };
      UserService.update(data)
        .then(response => {
        })
        .catch(e => {
          console.log(e);
        });
        user.data.email=mail;
        AuthenticationDataService.updateCurrentUser(user);
      }
    }

    const handleUpdate3 = () => {
      var noErrors = true;
      if(passwd === ""){
        setErrorPasswd(true);
        noErrors = false;
      }
      if (noErrors){
        var data = {
          username: user.data.username,
          password: passwd,
        };
        UserService.update(data)
          .then(response => {
          })
          .catch(e => {
            console.log(e);
          });
      }
    }

    function AvailableLogo() {
      
      var data = {
      };

      if (!loaded){
        setLoaded(true);
        FotoPerfilService.findAll(data).then(response => {
          console.log(response.data)
          setLogos(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    const handleLogo1 = (logoo) => {  
      var data = {
        username: user.data.username,
        f_perfil: logoo,
      };
      UserService.update(data)
        .then(response => {
        })
        .catch(e => {
          console.log(e);
        });
        user.data.f_perfil=logoo;
        AuthenticationDataService.updateCurrentUser(user);
      }

      return logos.map((value) => {
        return(         
          <Grid item xs={12} sm={6}>
          <Card button onClick={() => {handleLogo1(value.f_perfil);;handleClose();}} className={classes.media1}>
            <CardActionArea>
              <CardMedia
                className={classes.media2}
                image={"images/"+value.f_perfil+".png"}
                title="ascopas"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {value.f_perfil}
                </Typography>
              </CardContent>
            </CardActionArea>                                
          </Card> 
          </Grid>
        )
      })
    }

    const handleClose = () => {
      setOpen1(false);
    };

    const handleOpen1 = () => {
      setOpen1(true);
    };
  
    return (
      <div className={Application.container}>
        {! user ?
          history.push("/")
          :
          <Container component="main" maxWidth="xs" className={classes.container}>
          <div className={classes.top}>
            <h1 className={Application.header}>
                Editar Cuenta
            </h1>
          </div>
              <CssBaseline />
                  <Card className={classes.root}>
                      <CardContent>
                      <img src="images/LOGO.png" alt="logo las10ultimas" className={Application.icon}/> 
                          <Card button  onClick={() => {handleOpen1();}} className={classes.media1}>
                            <CardActionArea>
                              <CardMedia
                                className={classes.media2}
                                image={"images/"+user.data.f_perfil+".png"}
                                title="logo 1"
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                  Avatar
                                </Typography>
                              
                              </CardContent>
                            </CardActionArea>                                                
                          </Card>    

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
                                <h2 id="transition-modal-title">Logos disponibles</h2>          
                                <div id="transition-modal-description">
                                <Grid container spacing={2}>
                                  {AvailableLogo()}
                                      </Grid>
                                </div>
                              </div>
                            </Fade>
                          </Modal>

                        <div className={classes.paper}>
                          <form className={classes.form} noValidate>
                            <Grid container spacing={2}>                          
                            <Grid item xs={12}>
                              <TextField
                                  variant="outlined"
                                  fullWidth
                                  id="email"
                                  label="Email"
                                  name="email"
                                  autoComplete="email"
                                  onChange={onChangeMail}
                                  value={mail}
                                  error={errorMail} 
                                  helperText={errorMail ? 'Introduce tu nuevo correo electronico' : ' ' }
                              />
                            </Grid>
                            <Button
                              type="customizar"
                              fullWidth
                              variant="contained"
                              color="primary"
                              onClick={handleUpdate2}
                              className={classes.butoon}
                              >
                                  Cambiar email 
                              </Button>  
                            <Grid item xs={12}>
                              <TextField
                                  variant="outlined"
                                  fullWidth
                                  name="password"
                                  label="Contraseña"
                                  type="password"
                                  id="passwd"
                                  autoComplete="current-password"
                                  onChange={onChangePasswd}
                                  value={passwd}
                                  error={errorPasswd} 
                                  helperText={errorPasswd ? 'La contraseña no puede ser vacía' : ' ' }
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                  variant="outlined"
                                  fullWidth
                                  name="passwordbis"
                                  label="Repite la contraseña"
                                  type="password"
                                  id="passwdbis"
                                  autoComplete="current-password"
                                  onChange={onChangePasswdBis}
                                  value={passwdBis}
                                  error={errorPasswdBis} 
                                  helperText={errorPasswdBis ? 'Las contraseñas deben coincidir' : ' ' }
                              />
                               </Grid>
                            
                          </Grid>
                          <Button
                              type="customizar"
                              fullWidth
                              variant="contained"
                              color="primary"
                              onClick={handleUpdate3}
                              className={classes.butoon}
                          >
                              Cambiar Contraseña
                          </Button>                        
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
          <Friends/>
        </div>
        <div className={Application.torneos}>
          <h1 className={Application.header}>
            Torneos
          </h1>
          <Tournaments/>
        </div>
      </div>
      </div>
    );
  }