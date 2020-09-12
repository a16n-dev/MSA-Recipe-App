import React, { useContext, useState, ChangeEvent } from 'react'
import { AuthContext } from '../../context/Authcontext';
import { makeStyles, IconButton, TextareaAutosize, Typography, Button, ButtonProps, Card, CardHeader, CardMedia, CardContent } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd'
import CloseIcon from '@material-ui/icons/Close';
import { note, recipe } from '../../types';
import { Link, useHistory } from 'react-router-dom';
import AccessTimeSharpIcon from '@material-ui/icons/AccessTimeSharp';
import PeopleAltSharpIcon from '@material-ui/icons/PeopleAltSharp';

const useStyles = makeStyles(theme => ({
    root: {
        // borderTop: `2px solid ${theme.palette.secondary.main}`,
        width: '300px',
        cursor: 'pointer',
        userSelect: 'none',
        [theme.breakpoints.down('xs')]: {
            width: '95%'
        }
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    infoBox: {
        display: 'flex',
        flexDirection: 'column',
        gridRow: '2 / 3',
        gridColumn: '2 / 3',
        [theme.breakpoints.down('xs')]: {
            gridRow: '3 / 4',
            gridColumn: '1 / 2',
        },
    },
    infoItem: {
        display: 'flex',
        width: '120px',
        alignItems: 'center',
        marginTop: '4px'
    },
}));

interface RecipeCardProps {
    recipe: recipe
}

const RecipeCard = (props: RecipeCardProps) => {

    const classes = useStyles()
    const { state, dispatch } = useContext(AuthContext)
    const history = useHistory()
    const { recipe } = props

    const handleClick = () => {
        history.push(`recipes/${recipe._id}`)
    }

    return (
        <Card className={classes.root} onClick={handleClick}>
            <CardContent>
                <Typography variant={'h6'}>{recipe.name}</Typography>
            </CardContent>
            <CardMedia image={`http://localhost:8000/recipe/${recipe._id}/image`} className={classes.media} />
            <CardContent>
                <div className={classes.infoBox}>
                    <div className={classes.infoItem}>
                        <Typography><AccessTimeSharpIcon fontSize={'inherit'} /> {recipe.prepTime}</Typography>
                    </div>
                    <div className={classes.infoItem}>
                        <Typography><PeopleAltSharpIcon fontSize={'inherit'} /> {recipe.servings} Serving{+recipe.servings > 1 ? 's' : ''}</Typography>
                    </div>
                </div>
            </CardContent>

        </Card>
    )
}

export default RecipeCard