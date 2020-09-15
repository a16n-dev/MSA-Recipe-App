import React from 'react'
import { makeStyles, Typography, Card, CardMedia, CardContent, Tooltip, Grid } from '@material-ui/core';
import { recipe } from '../../types';
import { useHistory } from 'react-router-dom';
import AccessTimeSharpIcon from '@material-ui/icons/AccessTimeSharp';
import PeopleAltSharpIcon from '@material-ui/icons/PeopleAltSharp';
import PublicIcon from '@material-ui/icons/Public';

const useStyles = makeStyles(theme => ({
    root: {
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
    const history = useHistory()
    const { recipe } = props

    const handleClick = () => {
        history.push(`recipes/${recipe._id}`)
    }

    return (
        <Card className={classes.root} onClick={handleClick}>
            <CardContent>
                <Grid container justify={'space-between'}>
                <Typography variant={'h6'}>{recipe.name}</Typography>
                {recipe.isPublic ? <Tooltip title="Public Recipe"><PublicIcon color={'secondary'} /></Tooltip> : ''}
                </Grid>
            </CardContent>
            <CardMedia image={`${process.env.REACT_APP_API_URL}/recipe/${recipe._id}/image?${recipe.updatedAt}`} className={classes.media} />
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