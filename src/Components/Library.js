import React , { useState, useEffect }from 'react';
import Grid from '@material-ui/core/Grid';
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

    useEffect(() => {
        let url = 'http://localhost:8000/library';
        fetch(url).then(res => res.json()).then(data=> setLibrary(data))
    }, [changed]);    

    return (
        <div > {/*console.log(library)*/}
            {library.length !== 0 && 
            <Grid container justify="center" style={styles.mainContainer}>
                {library.map((e) => { 
                    return <div> 
                        <Grid>
                            <Card variant='outlined' margin='5%' style={styles.containerStyle}>
                                <p>{e.title}</p>
                                <p>{e.author}</p>
                            </Card>
                        </Grid>
                        <Button variant="contained" color="primary" value={e.id} onClick={(ele) => {    
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
            }
            {library.length === 0 && 
                <Card variant='outlined' margin='5%' style={styles.containerStyle}>
                    Accessing your Library...
                </Card>
            }
        </div>
    );
}

export default Library;