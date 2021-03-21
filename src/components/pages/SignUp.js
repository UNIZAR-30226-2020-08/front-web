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
  //const [mail,setMail] = React.useState();
  //const [password,setPassword] = React.useState();

  return (
    <div className={Application.containerHome}>
        <Container component="main" maxWidth="xs" className={classes.container}>
            <CssBaseline />
                <Card className={classes.root}>
                    <CardContent>
                    <img src="images/LOGO.png" alt="logo las10ultimas" className={Application.icon}/>
                    <div className={classes.paper}>
                        <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Nombre"
                                autoFocus
                            />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Apellidos"
                                name="lastName"
                                autoComplete="lname"
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                            <Link href="#" variant="body2" className={classes.link}>
                                Tienes ya una cuenta? Inicia Sesión
                            </Link>
                            </Grid>
                        </Grid>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </Container>
    </div>
  );
}