import React from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Application from "./application.module.scss";

const exampleTournaments = [
    {
      name: 'Torneo 1',
      participants: '32'
    },
    {
      name: 'Torneo 3',
      participants: '35'
    },
    {
      name: 'Torneo 5',
      participants: '5'
    },
    {
      name: 'Torneo 7',
      participants: '8'
    },
    {
      name: 'Torneo 8',
      participants: '108'
    },
    {
      name: 'Torneo 10',
      participants: '23'
    },
    {
      name: 'Torneo 11',
      participants: '46'
    },
    {
      name: 'Torneo 14',
      participants: '86'
    },
    {
      name: 'Torneo 18',
      participants: '2'
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
  }
}));

function Tournaments() {
    const classes = useStyles();

    function AvailableTournaments() {
        return exampleTournaments.map((value) => {
          return(
            <ListItem key={value.name} className="listItem">
                <ListItemText
                primary={value.name}
                secondary={value.participants+" participantes"}
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
        <List className={classes.root}>
          {AvailableTournaments()}
        </List>
      </div>
    );
}

export default Tournaments;