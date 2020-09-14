import React, {useContext, useState, useEffect} from 'react'
import { AuthContext } from '../context/Authcontext';
import { user } from '../types';
import Axios from 'axios';
import { makeStyles, Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        margin: '0 5%',
        alignItems: 'center',
        padding: theme.spacing(4)
    },
    img: {
        height: '100px',
        width: '100px',
        marginBottom: theme.spacing(2)
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
            setCurrentUser(result.data)
        }).catch((err) => {
            
        });
    },[state.token, userID])
    
    // If username matches currently authenicated user show controls

    if(currentUser === undefined){
        return <h1>404</h1>
    }

    return (
        <div className={classes.root}>
            <Avatar className={classes.img} src={currentUser.profileUrl} />
            <Typography variant={'h3'}>{currentUser.name}</Typography>
        </div>
    )
}

export default Profile