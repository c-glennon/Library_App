import React , { useState, useEffect }from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Card from '@material-ui/core/Card';

const Library = () => {

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

    const [library, setLibrary] = useState([]);
    const [changed, setChanged] = useState(true);
    //const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        let url = 'http://localhost:8000/library';
        fetch(url).then(res => res.json()).then(data=> setLibrary(data))
       // setRefreshing(false);
    }, [changed]);
    
    let refreshing = false;

    return (
        <div className="Library"> {console.log(library)}
            <Grid container alignItems="center" justify="center" style={styles.mainContainer}>
                {library.map((e) => { 
                    return <div> 
                        
                            <Card variant='outlined' margin='5%' style={styles.containerStyle}>
                                <p>{e.title}</p>
                                <p>{e.author}</p>
                            </Card>
                        
                        <Button variant="contained" color="primary" value={e.id} onClick={(ele) => {    
                            console.log(e.id);
                            let url = 'http://localhost:8000/library';
                            axios.delete(url, {data: {id: e.id}}).then((res) => console.log(res));
                            setChanged(!changed);
                        }}>
                            Delete from Library
                        </Button>
                    </div>
                })
                }
            </Grid>
        </div>
    );
}

export default Library;