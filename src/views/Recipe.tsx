import React, { useContext, useState, useEffect, MouseEvent } from 'react'
import { AuthContext } from '../context/Authcontext';
import Axios from 'axios';
import { recipe } from '../types';
import { makeStyles, Typography, Divider, Grid } from '@material-ui/core';
import clsx from 'clsx'
const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100%'
    },
    header: {
        height: '100px',
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center'
        }
    },
    gridItem: {
        padding: theme.spacing(1),
        border: '1px solid #ddd',
        borderRadius: '5px'
    }
}));

interface RecipeProps {
    match: {
        params: {
            id: String
        }
    }
}

const Recipe = (props: RecipeProps) => {
    const classes = useStyles()

    const { state, dispatch } = useContext(AuthContext)

    // If edit mode is active
    const [edit, setEdit] = useState<Boolean>(false)
    const [recipe, setRecipe] = useState<recipe | undefined>(undefined)
    const [loading, setLoading] = useState(true)

    const recipeID = props.match.params.id

    //if id is 'new' it means creating a new recipe


    // Fetch recipe. 
    useEffect(() => {

        if (recipeID === 'new') {
            setEdit(true)
            setRecipe({
                _id: '',
                name: '',
                ingredients: [],
                method: [],
                notes: ''
            })
            setLoading(false)
        } else {
            Axios({
                method: 'get',
                url: `/recipe/${recipeID}`,
                headers: { authToken: state.token }
            }).then((result) => {
                console.log(result);
                setRecipe(result.data)
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                setLoading(false)
            });
        }
    }, [recipeID, state, state.token]);

    const handleSubmitEdits = (e: any) => {
        e.preventDefault()
        console.log(e);
        console.log(e.target.elements);
        // Get data from form

        // Send request

        // Set state

        // If use was creating new recipe redirect them to the correct recipe page
    }

    if (loading) {
        return (<p>loading...</p>)
    }
    if (!recipe) { return null }

    const { name, ingredients, method, notes } = recipe

    //Show edit form
    if (edit) {
        return (
            <form onSubmit={handleSubmitEdits}>
                <h1>Editing:</h1>
                <label>Name</label><br/>
                <input type={'text'} name='name'></input><br/>
                <label>Ingredients</label><br/>
                <textarea name='ingredients'></textarea ><br/>
                <label>Method</label><br/>
                <textarea name='method' ></textarea ><br/>
                <label>Notes</label><br/>
                <textarea name='notes' ></textarea ><br/>
                <button >{recipeID === 'new'? 'Create recipe' : 'Save Changes'}</button>
            </form>
        )
    }


    //Show recipe view
    return (

            <Grid container alignContent={'flex-start'} spacing={2} className={classes.root}>
                <Grid item xs={12} className={classes.header}>
                    <Typography variant={'h3'}>{recipe.name}</Typography>
                    <Typography variant={'h4'}>owners name</Typography>
                    <Divider/>
                </Grid>

            {/* <button onClick={() => setEdit(true)}>Edit</button>
            <button onClick={() => setEdit(true)}>Duplicate</button>
            <button onClick={() => setEdit(true)}>Delete</button>
            <br />
            <button onClick={() => setEdit(true)}>Share via email</button>
            <button onClick={() => setEdit(true)}>Share via facebook</button>
            <button onClick={() => setEdit(true)}>Share via messenger</button> */}
            <Grid item xs={12} sm={3} md={2}>
                <div className={classes.gridItem}>
                    <h2>Ingredients</h2>
                    {recipe.ingredients.map(e => <p>{e}</p>)}
                </div>
            </Grid>
            <Grid item xs={12} sm={9} md={10} lg={8}>
                <div className={classes.gridItem}>
                    <h2>Method</h2>
                    {recipe.method.map(e => <p>{e}</p>)}
                </div>
            </Grid>
            <Grid item xs={12} lg={2} >
                <div className={classes.gridItem}>
                    <h2>Notes</h2>
                    {recipe.notes}
                </div>
            </Grid>
            </Grid>

    )
}

export default Recipe