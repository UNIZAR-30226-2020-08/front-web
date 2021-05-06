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
      backgroundColor: "white",
      color: "green"
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: "white",
      color: "green"
    },
    ultimasPartidas: {
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
    link: {
      color: "green"
    }
  }));

  export default function EditProfile() {
    const classes = useStyles();
    const history = useHistory();
    const user = UserService.getCurrentUser();

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
                              className={classes.submit}
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
                              className={classes.submit}
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
      </div>
      </div>
    );
  }