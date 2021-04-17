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
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Application from "../application.module.scss"
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import AuthenticationDataService from "../../services/auth.service";
import { useHistory } from "react-router-dom";
import Loading from '../Loading'


const useStyles = makeStyles((theme) => ({
  root: {
    width: 'fit-content',
    margin: 'auto',
    textAlign: 'center'
  },
  container: {
    padding: '2rem'
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
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "white",
    color: "green"
  },
  link: {
    color: "green"
  }
}));

export default function SignIn() {
  const classes = useStyles();

  const history = useHistory();

  const [errorMail, setErrorMail] = React.useState(false);

  const [errorPasswd, setErrorPasswd] = React.useState(false);

  const [errorPasswdBis, setErrorPasswdBis] = React.useState(false);

  const [errorUsername, setErrorUsername] = React.useState(false);

  const [failAuth, setFailAuth] = React.useState(false);

  const [mail, setMail] = React.useState("");

  const [passwd, setPasswd] = React.useState("");

  const [passwdBis, setPasswdBis] = React.useState("");

  const [username, setUsername] = React.useState("");

  const [loading,setLoading] = React.useState(false);

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

  const handleSignup = () => {
    var noErrors = true;
    if(!emailRegEx.test(mail)){
      setErrorMail(true);
      noErrors= false;
    }
    if(passwd === ""){
      setErrorPasswd(true);
      noErrors = false;
    }
    if (noErrors){
      setLoading(true);
      var data = {
        username: username,
        email: mail,
        password: passwd
      };
      AuthenticationDataService.signup(data.username,data.email,data.password)
        .then(response => {
          if(response.data.username === username){
            history.push("/");
          }else{
            setLoading(false);
            setFailAuth(true);
          }
        })
        .catch(e => {
          console.log(e);
          setLoading(false);
          setFailAuth(true);
        });
    }
  }

  return (
    <div className={Application.containerHome}>
      <Container component="main" maxWidth="xs" className={classes.container}>
          <CssBaseline />
              <Card className={classes.root}>
                  <CardContent>
                  { loading ?
                  <div className={classes.paper}>
                    < Loading className="check" margin="auto"/>
                  </div>
                  :
                  <div className={classes.paper}>
                      <img src="images/LOGO.png" alt="logo las10ultimas" className={Application.icon}/>
                      <form className={classes.form} noValidate>
                      <Grid container spacing={2}>
                          <Grid item xs={12}>
                          <TextField
                              className={classes.text}
                              variant="outlined"
                              margin="normal"
                              required
                              fullWidth
                              id="username"
                              label="Username"
                              name="username"
                              autoComplete="username"
                              autoFocus
                              onChange={onChangeUsername}
                              value={username}
                              error={errorUsername || failAuth} 
                              helperText={errorUsername ? 'Introduce tu nombre de usuario' : failAuth ? 'Usuario o contraseña incorrectos' : ' ' }
                          />
                          </Grid>
                          <Grid item xs={12}>
                          <TextField
                              className={classes.text}
                              variant="outlined"
                              margin="normal"
                              required
                              fullWidth
                              id="email"
                              label="Email"
                              name="email"
                              autoComplete="email"
                              autoFocus
                              onChange={onChangeMail}
                              value={mail}
                              error={errorMail || failAuth} 
                              helperText={errorMail ? 'Introduce tu correo electronico' : failAuth ? 'No se pudo registrar este usuario' : ' ' }
                          />
                          </Grid>
                          <Grid item xs={12}>
                          <TextField
                              variant="outlined"
                              margin="normal"
                              required
                              fullWidth
                              name="password"
                              label="Password"
                              type="password"
                              id="password"
                              autoComplete="current-password"
                              onChange={onChangePasswd}
                              value={passwd}
                              error={errorPasswd || failAuth} 
                              helperText={errorPasswd ? 'La contraseña no puede ser vacía' : failAuth ? 'No se pudo registrar este usuario' : ' ' }
                          />
                          </Grid>
                          <Grid item xs={12}>
                          <TextField
                              variant="outlined"
                              required
                              fullWidth
                              name="password"
                              label="Repite la contraseña"
                              type="password"
                              id="password"
                              autoComplete="current-password"
                              onChange={onChangePasswdBis}
                              value={passwdBis}
                              error={errorPasswdBis || failAuth} 
                              helperText={errorPasswdBis ? 'Las contraseñas deben coincidir' : failAuth ? 'No se pudo registrar este usuario' : ' ' }
                          />
                          </Grid>
                      </Grid>
                      <Button
                          fullWidth
                          variant="contained"
                          onClick={handleSignup}
                          className={classes.submit}
                      >
                          Sign Up
                      </Button>
                      <Grid container justify="flex-end">
                          <Grid item>
                          <Link href="/" variant="body2" className={classes.link}>
                              Tienes ya una cuenta? Inicia Sesión
                          </Link>
                          </Grid>
                      </Grid>
                      </form>
                  </div>
                  }
              </CardContent>
          </Card>
      </Container>
    </div>
  );
}