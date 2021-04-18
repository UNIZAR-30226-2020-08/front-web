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
import { Link } from 'react-router-dom';
import AuthenticationDataService from "../../services/auth.service";
import { useHistory } from "react-router-dom";



import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';

import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';


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
    },
    media1: {
      maxWidth: 345,
    },
    media2: {
      height: 140,
    }
  }));

  export default function Profile() {
    const classes = useStyles();
    const history = useHistory();

    const user = AuthenticationDataService.getCurrentUser();
  
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
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  variant="outlined"
                                  fullWidth
                                  id="firsttName"
                                  label="Nombre"
                                  name="firstName"
                                  autoComplete="fname"
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
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
                                  fullWidth
                                  name="password"
                                  label="Contraseña"
                                  type="password"
                                  id="password"
                                  autoComplete="current-password"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="copes"
                                label="Copas"
                                name="copes"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                             <TextField
                                variant="outlined"
                                fullWidth
                                id="playedgames"
                                label="Partidas Jugadas"
                                name="playedgames"
                              />
                            </Grid>
                          </Grid>
                          <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                          <Card className={classes.media1}>
                                <CardActionArea>
                                  <CardMedia
                                    className={classes.media2}
                                    image="images/tapete1.jpg"
                                    title="As Oros"
                                  />
                                  <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                      Tapete 1
                                    </Typography>
                                  
                                  </CardContent>
                                </CardActionArea>
                                  <Button size="small" color="primary">
                                    Cambiar
                                  </Button>

                              </Card>                            
                              </Grid>
                              <Grid item xs={12} sm={6}>                             
                              <Card className={classes.media1}>
                                <CardActionArea>
                                  <CardMedia
                                    className={classes.media2}
                                    image="images/baraja1/asoros.jpg"
                                    title="As Oros"
                                  />
                                  <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                      Cartas 1
                                    </Typography>
                                  
                                  </CardContent>
                                </CardActionArea>
                               
                                  <Button size="small" color="primary">
                                    Cambiar
                                  </Button>
                        
                              </Card>
                              </Grid>
                              </Grid>
                          <Link to="/EditProfile" color="inherit">
                          <Button
                              type="customizar"
                              fullWidth
                              variant="contained"
                              color="primary"
                              className={classes.cambiarperfil}
                          >
                              Cambiar Perfil
                          </Button>
                          </Link>
                          <Button
                              type="ultimasPartidas"
                              fullWidth
                              variant="contained"
                              color="primary"
                              className={classes.ultimasPartidas}
                          >
                              Últimas Partidas
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