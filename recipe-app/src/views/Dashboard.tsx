import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/Authcontext';
import axios from 'axios';
import { recipe } from '../types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Loading from '../components/Loading/Loading';

const useStyles = makeStyles(theme => ({
    root: {

    }
}));

interface dashboardProps {

}

const Dashboard = (props: dashboardProps) => {
    const classes = useStyles()

    const { state } = useContext(AuthContext)

    const [recipes, setRecipes] = useState<recipe[]>([])
    const [loading, setLoading] = useState<boolean>(true)

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
        }).finally(()=>{
            setLoading(false)
        });
    }, [state.token])

    if(loading){
        return (<Loading/>)
    }

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