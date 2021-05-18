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


import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { Bracket, RoundProps } from 'react-brackets';

import GroupIcon from '@material-ui/icons/Group';

import PersonIcon from '@material-ui/icons/Person';



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
    },
    root5: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton5: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
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

const DialogTitle = withStyles(useStyles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

function Tournaments() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [value2, setValue2] = React.useState(0);
    const [torneos,setTorneos] = React.useState([]);
    const [loaded,setLoaded] = React.useState(false);
    const [nombreTorneo,setnombreTorneo] = React.useState("");
    const user = AuthenticationDataService.getCurrentUser() ? AuthenticationDataService.getCurrentUser() : {data:{username:'anonimo'}};
    const [open5, setOpen5] = React.useState(false);

    const rounds = [
      {
        title: 'Primera Ronda',
        seeds: [
          {
            id: 1,
            date: new Date().toDateString(),
            teams: [{ name: 'Team A' }, { name: 'Team B' }],
          },
          {
            id: 2,
            date: new Date().toDateString(),
            teams: [{ name: 'Team C' }, { name: 'Team D' }],
          },
        ],
      },
      {
        title: 'Segunda Ronda',
        seeds: [
          {
            id: 3,
            date: new Date().toDateString(),
            teams: [{ name: 'Team A' }, { name: 'Team C' }],
          },
        ],
      },
    ];

    const ElBrack = () => {
      //....
      return (
        <Bracket
          rounds={rounds}
          renderTitleComponent={(title, roundIndex) => {
            return <div style={{ textAlign: 'center', color: 'red' }}>{title}</div>;
          }}
        />
      );
    };
    
    


    const handleChange = (event, newValue) => {
      setValue(newValue);
      setLoaded(false);
    };

    const handleClickOpen5 = (namee) => {
      setnombreTorneo(namee);
      setOpen5(true);
      
    };
    const handleClose5 = () => {
      setOpen5(false);
    };


    
    function AvailableTournaments(tip,part) {
      var data = {
        username: user.data.username,
        tipo: tip,
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
                <Button edge="end"  variant="outlined" aria-label="Unirse" onClick= {() => {handleClickOpen5(value.nombre)}}>
                    Unirse
                </Button>
                  <Dialog onClose={handleClose5} aria-labelledby="customized-dialog-title" open={open5}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose5}>
                      Torneo {nombreTorneo}
                    </DialogTitle>
                    <div>
                    {ElBrack()}
                    </div>
                    <Button edge="end"  variant="outlined" aria-label="Unirse" marginTop="15" onClick= {() => {}}>
                      Jugar
                    </Button>
                  </Dialog>
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
            <Tab label="Individuales 8 equipos" icon={<PersonIcon />} {...a11yProps(0)} />
            <Tab label="Por Parejas 8 equipos" icon={<GroupIcon />} {...a11yProps(1)} />
            <Tab label="Individuales 16 equipos" icon={<PersonIcon />} {...a11yProps(2)}  />
            <Tab label="Por Parejas 16 equipos" icon={<GroupIcon />} {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
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
          <List className={classes.lista}>
          {value === 0? AvailableTournaments(0,8): <></>}
          </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
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
          <List className={classes.lista}>
          {value === 1? AvailableTournaments(1,8): <></>}
          </List>
      </TabPanel>
      <TabPanel value={value} index={2}>
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
          <List className={classes.lista}>
          {value === 2? AvailableTournaments(0,16): <></>}
          </List>
      </TabPanel>
      <TabPanel value={value} index={3}>
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
          <List className={classes.lista}>
          {value === 3? AvailableTournaments(1,16): <></>}
          </List>
      </TabPanel>
      </div>
    );
}

export default Tournaments;