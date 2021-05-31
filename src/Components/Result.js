import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    card: {
        margin: '5%',
    }
  });

const Result = (props) => {

    const classes = useStyles();

    const [books, setBooks] = useState([]);

    useEffect(() => {
        if(props.title !== ''){
            let s = encodeURIComponent(props.title);
            let url = 'http://localhost:8000/book?title=' + s;
            //console.log(url);
            axios.get(url)
              .then((res) => {
                console.log(res);
                if(res.data !== []){
                    console.log(res.data);
                    setBooks(res.data);
                } 
                else 
                    setBooks([{author: 'No books found', title: '', id: ''}]);
              })
            }
    }, [props.title]); 

    return (
        <div>
            <Grid container justify='center' xs={12}>
        {books.map((e, index) => {
           return <div>
                <Grid item alignItems='center' xs={12}>
                    <Card className={classes.card} variant='outlined'> 
                        <p>{e.title}</p>
                        <p>{e.author}</p>
                    </Card>
                </Grid> 
                <Button variant="contained" color="primary" onClick={(ele) => {
                    if(books[index].title !== "" && books[index].author !== ""){
                        let url = 'http://localhost:8000/library';
                        const a = {
                            author: e.author,
                            title: e.title,
                            id: e.id,
                        }
                        axios.post(url, a).then((res) => {
                            console.log(res);
                        }, (error) => {
                                console.log(error);
                        });
                    }
                }}>
                    Add to your library
                </Button>
            </div>
        })}
            </Grid>
        </div>
        )
}

export default Result;