import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

const Result = (props) => {

    const styles ={
        mainContainer: {
              flex: 1,
              flexWrap: 'wrap',
              flexDirection: 'row'
        },
        containerStyle: {
              padding: 10,
              backgroundColor: 'white',
              borderWidth:0,
              marginBottom:10,
              marginLeft:10,
              marginRight:10,
              marginTop:50,
              elevation: 10
          }
      }

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
            <Grid container justify='center' style={styles.mainContainer}>
        {books.map((e, index) => {
           return <div>
                <Grid item alignItems='center' >
                    <Card variant='outlined' margin='5%' style={styles.containerStyle}> 
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