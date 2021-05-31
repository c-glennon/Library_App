import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Result from './Result';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '50ch',
        input: {
          color: 'white'
        }
      },
    },
  }));

const SearchBar = () => {  

    const [temp, setTemp] = useState("");
    const [title, setTitle] = useState("");
    
    const classes = useStyles();

    const onSubmit = (e) => {
        e.preventDefault();
        if(temp !== ""){
            setTitle(temp)
            console.log(temp);
        }
    }

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit} >
            <TextField id="filled-basic" label="Add books to your library" variant="filled"
                onChange={(e) => {
                    const { value } = e.target;
                    setTemp(value);
                }}
             />
           </form>
           <Result title={title} />
        </div>
    );
}

export default SearchBar;