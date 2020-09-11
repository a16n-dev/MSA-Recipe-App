import React, { useContext, useState, ChangeEvent, useEffect } from 'react'
import { makeStyles, Button } from '@material-ui/core';
import ListItem from './ListItem';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    }
}));

interface IngredientListProps {
    ingredients: string[]
}

const IngredientList = (props: IngredientListProps) => {

    const classes = useStyles()

    const { ingredients } = props

    return (
        <div className={classes.root} >
            {ingredients.map((e, i) => (<ListItem text={e} alt={i % 2 === 1}/>))}
        </div>

    )
}

export default IngredientList