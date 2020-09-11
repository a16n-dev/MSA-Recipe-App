import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/Authcontext';
import Axios from 'axios';
import { recipe } from '../types';
import { makeStyles, Typography, Divider, Grid, TextareaAutosize } from '@material-ui/core';
import EditIngredientForm from '../components/EditIngredientForm/EditIngredientForm';
import EditMethodForm from '../components/EditMethodForm/EditMethodForm';
import NoteBar from '../components/NoteBar/NoteBar';
import RecipeEditForm from '../components/forms/RecipeEditForm';
import RecipeEditView from '../components/RecipeEditView/RecipeEditView';
import RecipeView from '../components/RecipeView/RecipeView';
import Loading from '../components/Loading/Loading';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        display: 'grid',
        gridTemplateRows: 'min-content auto',
        width: '100%',
        padding: theme.spacing(4),
    },
    detailContainer: {
        minHeight: 0,
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
        borderRadius: '5px',
        height: '100%',
        overflowY: 'auto'  
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

    const { state } = useContext(AuthContext)

    // If edit mode is active
    const [edit, setEdit] = useState<boolean>(false)
    const [currentRecipe, setCurrentRecipe] = useState<recipe | undefined>(undefined)
    const [loading, setLoading] = useState(true)

    const recipeID = props.match.params.id

    //if id is 'new' it means creating a new recipe

    // Fetch recipe. 
    useEffect(() => {

        if (recipeID === 'new') {
            setEdit(true)
            setCurrentRecipe({
                _id: '',
                name: '',
                ingredients: [],
                method: [],
                notes: [],
                authorName: '',
                prepTime: 'string',
                servings: 1,
            })
            setLoading(false)
        } else {
            Axios({
                method: 'get',
                url: `/recipe/${recipeID}`,
                headers: { authToken: state.token }
            }).then((result) => {
                console.log(result);
                setCurrentRecipe(result.data)
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                setLoading(false)
            });
        }
    }, [recipeID, state, state.token]);

    const handleSubmitEdits = () => {
        // Send request

        // Set state

        // If use was creating new recipe redirect them to the correct recipe page
    }

    if (loading) {
        return (<Loading/>)
    }
    if (!currentRecipe) { return null }

    //Show recipe view
    return (
        <>
        {edit ? 
        <RecipeEditView currentRecipe={currentRecipe} setCurrentRecipe={setCurrentRecipe} setEdit={setEdit}/>
        : <RecipeView currentRecipe={currentRecipe} setCurrentRecipe={setCurrentRecipe} setEdit={setEdit}></RecipeView>}
        </>
    )
}

export default Recipe