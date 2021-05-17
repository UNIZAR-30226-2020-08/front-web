import React from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { fade, makeStyles } from '@material-ui/core/styles';
import Application from "./application.module.scss";

import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Fade from '@material-ui/core/Fade';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import TorneoService from "../services/torneo.service";
import AuthenticationDataService from "../services/auth.service";


  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      marginTop: "6px",
      height: "25vh",
      margin: "auto",
      overflow: "auto"
    },
    root2: {
      width: "100%",
      marginTop: "6px",
      height: "25vh",
      margin: "auto",
      overflow: "auto"
    },
    lista: {
      width: "100%",
      marginTop: "6px",
      height: "25vh",
      margin: "auto",
      overflow: "auto"
    },
    cont: {
      width: "100%",
      height: "100%",
      margin: "auto",
      overflow: "hidden"
    },
    aux: {
      overflow: "auto" 
    },
    pestana: {
      width: '100%',
      overflow: "auto",
      backgroundColor: theme.palette.background.paper,
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
    bar: {
      maxWidth: '100%',
      width: '50vh',
    }
  }));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

function Tournaments() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [torneos,setTorneos] = React.useState([]);
    const [loaded,setLoaded] = React.useState(false);
    const user = AuthenticationDataService.getCurrentUser();

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    
    function AvailableTournaments(tipo,part) {
      var data = {
        username: user.data.username,
        tipo: tipo,
        npart: part,
      };

      if (!loaded){
        setLoaded(true);
        TorneoService.findAll(data).then(response => {
          console.log(response.data)
          setTorneos(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

      return torneos.map((value) => {
        return(
          <ListItem key={value.nombre} className="listItem">
                <ListItemText
                primary={value.nombre}
                secondary={value.jugadores_online+" participantes"}
                />
                <ListItemSecondaryAction>
                <Button edge="end"  variant="outlined" aria-label="Unirse" onClick= {() => {}}>
                    Unirse
                </Button>
                </ListItemSecondaryAction>
            </ListItem>
        )
      })
    }

    return (
      <div className={Application.selectTournament}>
          <AppBar position="static" color="transparent" className={classes.bar}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
          >
            <Tab label="Disponibles" icon={<PhoneIcon />} {...a11yProps(0)} />
            <Tab label="Jugados" icon={<FavoriteIcon />} {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
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
          <List className={classes.lista}>
          {AvailableTournaments(0,8)}
          </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      </div>
    );
}

export default Tournaments;