import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/Authcontext';
import Axios from 'axios';
import { recipe } from '../types';
import Loading from '../components/Loading/Loading';
import RecipePublicView from '../components/RecipePublicView/RecipePublicView';
import NotFound from '../components/NotFound/NotFound';

interface PublicRecipeProps {
    match: {
        params: {
            id: String
        }
    }
}

const PublicRecipe = (props: PublicRecipeProps) => {
    const { state} = useContext(AuthContext)
    const [currentRecipe, setCurrentRecipe] = useState<recipe | undefined>(undefined)
    const [loading, setLoading] = useState(true)

    const recipeID = props.match.params.id

    // Fetch recipe. 
    useEffect(() => {
            Axios({
                method: 'get',
                url: `/recipe/public/${recipeID}`,
            }).then((result) => {
                console.log(result);
                setCurrentRecipe(result.data)
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                setLoading(false)
            });
    }, [recipeID, state, state.token]);

    if (loading) {
        return (<Loading/>)
    }
    if (!currentRecipe) { 
        return <NotFound message={'This recipe does not exist or is private.'}/>
     }

    //Show recipe view
    return (
        <RecipePublicView currentRecipe={currentRecipe}/>
    )
}

export default PublicRecipe