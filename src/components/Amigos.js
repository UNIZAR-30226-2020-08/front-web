import React from 'react';
//import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
//import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Application from "./application.module.scss";


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

const exampleFriends = [
    {
      name: 'Amigo 1',
      copas: '912'
    },
    {
      name: 'Amigo 2',
      copas: '31'
    },
    {
      name: 'Amigo 3',
      copas: '300'
    },
    {
      name: 'Amigo 4',
      copas: '333'
    },
    {
      name: 'Amigo 5',
      copas: '432'
    },
    {
      name: 'Amigo 6',
      copas: '651'
    },
    {
      name: 'Amigo 7',
      copas: '721'
    },
    {
      name: 'Amigo 8',
      copas: '389'
    },
    {
      name: 'Amigo 9',
      copas: '325'
    },
    {
      name: 'Amigo 10',
      copas: '121'
    },
    {
      name: 'Amigo 11',
      copas: '221'
    }
  ]

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "6px",
    height: "32vh",
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
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
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

function Friends() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    function AvailableRooms() {
        return exampleFriends.map((value) => {
          return(
            <ListItem key={value.name} className="listItem">
                <ListItemText
                primary={value.name}
                secondary={value.copas+"🏆"}
                />
                <ListItemSecondaryAction>
                <Button edge="end"  variant="outlined" aria-label="Unirse" onClick= {() => {}}>
                    Invitar
                </Button>
                </ListItemSecondaryAction>
            </ListItem>
          )
        })
    }  

    return (

     <div className={Application.selectFriends}>
      {/*<AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Amigos" icon={<PhoneIcon />} {...a11yProps(0)} />
          <Tab label="Solicitudes" icon={<FavoriteIcon />} {...a11yProps(1)} />
          <Tab label="Ranking" icon={<PersonPinIcon />} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
    <TabPanel value={value} index={0}>*/}
        <List className={classes.root}>
          {AvailableRooms()}
        </List>{/*}
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>*/}
  </div>
    );
}

export default Friends;