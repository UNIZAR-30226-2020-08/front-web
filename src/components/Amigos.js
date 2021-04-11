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
  }
}));

function Friends() {
    const classes = useStyles();

    function AvailableRooms() {
        return exampleFriends.map((value) => {
          return(
            <ListItem className="listItem">
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
        <List className={classes.root}>
          {AvailableRooms()}
        </List>
      </div>
    );
}

export default Friends;