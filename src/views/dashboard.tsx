import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/Authcontext';
import axios from 'axios';
import { recipe } from '../types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {

    }
}));

interface dashboardProps {

}

const Dashboard = (props: dashboardProps) => {
    const classes = useStyles()

    const { state, dispatch } = useContext(AuthContext)

    const [recipes, setRecipes] = useState<recipe[]>([])

    useEffect(() => {
        axios({
            method: 'get',
            url: '/recipe',
            headers: { authToken: state.token }
        }).then(({ data, ...rest }) => {
            console.log(data);
            setRecipes(data)
        }).catch((err) => {
            console.log('error!');
        });
    }, [state.token])



    return (
        <div className={classes.root}>
            Recently added
            {recipes.map(e => (
                <Link key={e._id} to={`recipes/${e._id}`}>
                    <p>{e.name}</p>
                </Link>
            ))}
            Explore
        </div>
    )
}

export default Dashboard