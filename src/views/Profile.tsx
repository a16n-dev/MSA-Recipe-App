import React, {useContext, useState} from 'react'
import { AuthContext } from '../context/Authcontext';
import { match } from 'react-router-dom';
import { user } from '../types';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {

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

    const [user, setUser] = useState<user>()

    // users id from url
    const userID = props.match.params.id
    console.log(userID);
    Axios({
        method: 'get',
        url: `/user/${userID}`
    }).then((result) => {
        
    }).catch((err) => {
        
    });
    // If username matches currently authenicated user show controls

    const {state, dispatch} = useContext(AuthContext)

    return (
        <div className={classes.root}>
        </div>
    )
}

export default Profile