import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      backgroundColor: '#e0564c',
    },
  },
}));

const NavBar = () => {

    const classes = useStyles();
    const history = useHistory();

    return(
        <div style={{ textAlign: "center" }} className={classes.root}>
            <Button variant="contained" color="primary" onClick={()=>
                history.push("/")
            }>Add books</Button>
            <Button variant="contained" color="primary" onClick={()=>
                history.push("/library")
            }>Library</Button>
        </div>
    );
}

export default NavBar;