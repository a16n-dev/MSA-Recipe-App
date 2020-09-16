import React from 'react'
import { makeStyles, Typography, Card, CardMedia, CardContent } from '@material-ui/core';
import { recipe } from '../../types';
import { useHistory } from 'react-router-dom';
import AccessTimeSharpIcon from '@material-ui/icons/AccessTimeSharp';
import PeopleAltSharpIcon from '@material-ui/icons/PeopleAltSharp';

const useStyles = makeStyles(theme => ({
    root: {
        width: '300px',
        cursor: 'pointer',
        userSelect: 'none',
        margin: theme.spacing(2),
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
        alignItems: 'center',
        marginTop: '4px'
    },
}));

interface PublicRecipeCardProps {
    recipe: recipe
}

const PublicRecipeCard = (props: PublicRecipeCardProps) => {

    const classes = useStyles()
    const history = useHistory()
    const { recipe } = props

    const handleClick = () => {
        history.push(`/explore/recipes/${recipe._id}`)
    }

    return (
        <Card className={classes.root} onClick={handleClick}>
            <CardContent>
                <Typography variant={'h6'}>{recipe.name}</Typography>
            </CardContent>
            <CardMedia image={`${process.env.REACT_APP_API_URL}/recipe/${recipe._id}/image?${recipe.updatedAt}`} className={classes.media} />
            <CardContent>
                <div className={classes.infoBox}>
                <div className={classes.infoItem}>
                        <Typography> {recipe.authorName}</Typography>
                    </div>
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

export default PublicRecipeCard