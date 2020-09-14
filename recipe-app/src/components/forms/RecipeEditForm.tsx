import React, {useContext} from 'react'
import { AuthContext } from '../../context/Authcontext';
import { recipe } from '../../types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {

    }
}));

interface RecipeEditFormProps {
    setRecipe: React.Dispatch<React.SetStateAction<recipe | undefined>>
}

const RecipeEditForm = (props: RecipeEditFormProps) => {
    const classes = useStyles()

    const {state, dispatch} = useContext(AuthContext)

    const handleSubmit = () => {
        
    }

    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit}>

            </form>
        </div>
    )
}

export default RecipeEditForm