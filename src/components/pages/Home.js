/*Proyecto:     Las10últimas
//Fecha:        marzo-2021
//Autor:        WBDevelopment
//Módulo:       Front-end del sistema Las10últimas
//Fichero:      Home.js
//Descripción:  Pagina de inicio del sistema Las10últimas*/

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Loading from '../Loading'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "green",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "green",
    color: "white"
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
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        { loading ?
        <div className={classes.paper}>
            < Loading className="check" margin="auto"/>
        </div>
        :
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Iniciar Sesión
            </Typography>
            <form className={classes.form} noValidate>
                <TextField
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
    </Container>
  );
}