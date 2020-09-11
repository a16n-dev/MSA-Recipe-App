import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/Authcontext';
import { recipe } from '../types';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { makeStyles, Card, Grid, CardContent } from '@material-ui/core';
import Loading from '../components/Loading/Loading';

const useStyles = makeStyles(theme => ({
    root: {

    }
}));

interface RecipeListProps {

}

const RecipeList = (props: RecipeListProps) => {

    const classes = useStyles()

    const {state} = useContext(AuthContext)

    const [recipes, setRecipes] = useState<recipe[]>([])
    const [loading, setLoading] = useState<boolean>(true)

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
        }).finally(()=>{
            setLoading(false)
        });
    }, [state.token])

    if(loading){
        return (<Loading/>)
    }

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