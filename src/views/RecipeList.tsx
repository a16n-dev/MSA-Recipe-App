import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/Authcontext';
import { recipe } from '../types';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { makeStyles, Card, Grid, CardHeader, CardContent } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {

    }
}));

interface RecipeListProps {

}

const RecipeList = (props: RecipeListProps) => {

    const classes = useStyles()

    const {state, dispatch} = useContext(AuthContext)

    const [recipes, setRecipes] = useState<recipe[]>([])

    useEffect(()=>{
        // Fetch users recipesv
        console.log(axios.defaults.baseURL);
        axios({
            method: 'get',
            url: '/recipe',
            headers: { authToken: state.token }
        }).then(({ data, ...rest }) => {
            console.log(data);
            setRecipes(data)
        }).catch((err) => {
            console.log('error!');
        });
    }, [state.token])

    if(recipes.length === 0) {
        return (<h1>No recipes found</h1>)
    }

    return (
        <Grid container className={classes.root}>
            {recipes.map(e => (
                <Link key={e._id} to={`recipes/${e._id}`}>
                    <Card>
                        <CardContent>{e.name}</CardContent>
                    </Card>
                </Link>
            ))}
        </Grid>
    )
}

export default RecipeList