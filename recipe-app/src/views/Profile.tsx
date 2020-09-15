import React, {useContext, useState, useEffect} from 'react'
import { AuthContext } from '../context/Authcontext';
import { user, recipe } from '../types';
import Axios from 'axios';
import { makeStyles, Avatar, Typography, Divider, Grid } from '@material-ui/core';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import PublicRecipeCard from '../components/PublicRecipeCard/PublicRecipeCard';

const useStyles = makeStyles(theme => ({
    root: {
        alignItems: 'center',
        padding: theme.spacing(4)
    },
    img: {
        height: '100px',
        width: '100px',
        marginBottom: theme.spacing(2)
    },
    recipeContainer: {
        // justifyItems: 'center',
        // justifyContent: 'center',
        // rowGap: `${theme.spacing(2)}px`,
        // columnGap: theme.spacing(2),
        // display: 'grid',
        // gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        // [theme.breakpoints.down('xs')]: {
        //     gridTemplateColumns: 'auto',
        // }
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    divider: {
        height: '1px',
        margin: theme.spacing(2)
    },
    title: {
        textAlign: 'center'
    }
}));

interface ProfileProps {
    match: {
        params: {
            id: String
        }
    }
}

const Profile = (props: ProfileProps) => {
    const classes = useStyles()

    const [currentUser, setCurrentUser] = useState<user>()
    const [recipes, setRecipes] = useState<recipe[]>([])
    const {state} = useContext(AuthContext)

    // users id from url
    const userID = props.match.params.id
    console.log(userID);

    // Get user
    useEffect(()=>{
        Axios({
            method: 'get',
            url: `/user/${userID}`,
            headers: {authToken: state.token}
        }).then((result) => {
            console.log(result.data);
            setCurrentUser(result.data.user)
            setRecipes(result.data.recipes)
        }).catch((err) => {
            
        });
    },[state.token, userID])
    
    // If username matches currently authenicated user show controls

    if(currentUser === undefined){
        return <h1>404</h1>
    }

    return (
        <Grid container className={classes.root} direction={'column'} alignItems={'stretch'}>
            <Grid item>
            <Avatar className={classes.img} src={currentUser.profileUrl} />
            </Grid>
            <Grid item>
            <Typography variant={'h3'} className={classes.title}>{currentUser.name}</Typography>
            </Grid>
            <Grid item>
            <Typography>{recipes.length > 0 ? recipes.length : 'User has no'} public recipe{recipes.length > 1 ? 's' : ''}</Typography>
            </Grid>
            <Divider flexItem className={classes.divider} />
            <Grid item>
            <Typography variant={'h5'}>{currentUser.name}'s recipes</Typography>
            </Grid>
            <Grid item>
            <div className={classes.recipeContainer}>
                {recipes.map((e,i) => (
                    <PublicRecipeCard key={i} recipe={e}/>
                ))}
            </div>
            </Grid>
        </Grid>
    )
}

export default Profile