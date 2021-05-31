import React , { useState, useEffect }from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const Library = () => {

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
            <Grid container alignItems="center" justify="center">
                {library.map((e) => { 
                    return <div> 
                        <Grid>
                            <Paper>
                                <p>{e.title}</p>
                                <p>{e.author}</p>
                            </Paper>
                        </Grid>
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