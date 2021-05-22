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
import Loading from '../Loading'
import Application from "../application.module.scss"
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import AuthenticationDataService from "../../services/auth.service";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'fit-content',
    margin: 'auto',
  },
  container: {
    padding: '2rem'
  },
  paper: {
    paddingTop: theme.spacing(8),
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
    color: 'green',
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

  const [errorUsername, setErrorUsername] = React.useState(false);

  const [errorPasswd, setErrorPasswd] = React.useState(false);

  const [failAuth, setFailAuth] = React.useState(false);

  const [username, setUsername] = React.useState("");

  const [passwd, setPasswd] = React.useState("");

  const [loading,setLoading] = React.useState(false);

  const user = AuthenticationDataService.getCurrentUser();

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

  const handleLogin = () => {
    var noErrors = true;
    if(username === ""){
      setErrorUsername(true);
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
        password: passwd
      };
      AuthenticationDataService.login(data.username,data.password)
        .then(response => {
          if(response.accessToken){
            window.location.reload();
          }else{
            setLoading(false);
            setFailAuth(true);
          }
        })
        .catch(e => {
          //console.log(e);
          setLoading(false);
          setFailAuth(true);
        });
    }
  }

  return (
    <div className={Application.containerHome}>
      { user ?
      history.push("/inicio")
      :
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
                          helperText={errorPasswd ? 'La contraseña no puede ser vacía' : failAuth ? 'Correo o contraseña incorrectos' : ' ' }
                      />
                      {/*<FormControlLabel
                          control={<Checkbox value="recuerdame" color="green" />}
                          label="Recuérdame"
                      />*/}
                      <Button
                          fullWidth
                          variant="contained"
                          onClick={handleLogin}
                          className={classes.submit}
                      >
                          Iniciar Sesión
                      </Button>
                      <Grid container>
                          <Grid item xs>
                          <Link href="#" variant="body2" className={classes.link}>
                              Olvidaste la contraseña?
                          </Link>
                          </Grid>
                          <Grid item>
                          <Link href="\signup" variant="body2" className={classes.link}>
                              {"No tienes cuenta? Regístrate"}
                          </Link>
                          </Grid>
                      </Grid>
                  </form>
              </div>
              }
          </CardContent>
        </Card>
      </Container>
      }
    </div>
  );
}