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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Loading from '../Loading'
import Application from "../application.module.scss"
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

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
  //const [mail,setMail] = React.useState();
  //const [password,setPassword] = React.useState();
  const [loading,setLoading] = React.useState(false);

  function handleLogin() {
    setLoading(true);
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
                      />
                      <FormControlLabel
                          control={<Checkbox value="recuerdame" color="green" />}
                          label="Recuérdame"
                      />
                      <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          className={classes.submit}
                          onClick={handleLogin}
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
                          <Link href="#" variant="body2" className={classes.link}>
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
    </div>
  );
}