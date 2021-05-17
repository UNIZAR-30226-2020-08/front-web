import React from 'react';
//import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
//import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { fade,makeStyles } from '@material-ui/core/styles';
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

import AmigoService from "../services/amigo.service";
import AuthenticationDataService from "../services/auth.service";



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
    width: '100%',
  },
  lista: {
    width: "100%",
    marginTop: "6px",
    maxHeight: "100%",
    height: "100%",
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
    width: "100%",
    height: "100%",
    margin: "auto",
  },
  pestana2: {
    width: "100%",
    height: "100%",
    margin: "auto",
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

const getFriends = () => {
  var exampleFriends = [
    {}
  ];
};

const getSolicitudes = () => {
  var exampleFriends = {

  };
};

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

function Friends() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [value2, setValue2] = React.useState(0);
    const [amigs,setAmigs] = React.useState([]);
    const [solicitudes,setSolicitudes] = React.useState([]);
    const [loaded,setLoaded] = React.useState(false);
    const [loaded2,setLoaded2] = React.useState(false);
    const [bien,setBien] = React.useState(false);
    const user = AuthenticationDataService.getCurrentUser();


    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleAceptar = () => {
      
      
        var data = {
          username: user.data.username,
          amigoname: "juanw",
        };
        AmigoService.aceptar(data)
          .then(response => {
          })
          .catch(e => {
            console.log(e);
          });
      }
    

    function AvailableFriends() {
      var data = {
        username: user.data.username,
      };

      if (!loaded){
        setLoaded(true);
        AmigoService.findAll(data).then(response => {
          console.log(response.data)
          setAmigs(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

      return amigs.map((value) => {
        return(
          <ListItem key={value} className="listItem">
          <ListItemText
          primary={value.username}
          secondary={value.copas+"🏆"}
          />
          <ListItemSecondaryAction>
          <Button edge="end"  variant="outlined" aria-label="Unirse">
              Invitar
          </Button>
          </ListItemSecondaryAction>
      </ListItem>
        )
      })
    }

    function AvailableSolicitudes() {
      var data = {
        username: user.data.username,
      };

      if (!loaded2){
        setLoaded2(true);
        AmigoService.listarSolicitudes(data).then(response => {
          if(response.data.message == 'No se ha encontrado ninguna solicitud de amistad'){
            setBien(false);
          }else{
            setSolicitudes(response.data);
            setBien(true);
          }
          
        })
        .catch(e => {
          setBien(false);
          console.log(e);
        });
    }
      
        if(bien){
        return solicitudes.map((value) => {
          return(
            <ListItem key={value} className="listItem">
            <ListItemText
            primary={value.usuario}
            />
            <ListItemSecondaryAction>
            <Button edge="end"  variant="outlined" aria-label="Aceptar">
                Aceptar
            </Button>
            </ListItemSecondaryAction>
        </ListItem>
          )
        })}
    }


    return (
     <div className={classes.root}>
       <AppBar position="static" color="transparent" className={classes.bar}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        indicatorColor="primary"
        textColor="primary"
        aria-label="scrollable force tabs example"
        className={classes.pestana}
        
      >
        <Tab label="Amigos" icon={<PhoneIcon />} {...a11yProps(0)} />
        {<Tab label="Solicitudes" icon={<FavoriteIcon />} {...a11yProps(1)} />}
        {<Tab label="Ranking" icon={<PersonPinIcon />} {...a11yProps(2)} />}
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
          {AvailableFriends()}
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List className={classes.lista}>
          {AvailableSolicitudes()}
        </List>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <List className={classes.lista}>
            {AvailableFriends()}
          </List>
      </TabPanel>
  </div>
    );
}

export default Friends;