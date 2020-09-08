import React, { useContext, useState, useEffect } from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import { AuthContext } from '../context/Authcontext';
import axios from 'axios';
import { recipe } from '../types';

const useStyles = createUseStyles(theme => ({
    root: {

    }
}));

interface dashboardProps {

}

const Dashboard = (props: dashboardProps) => {
    const theme = useTheme()
    const classes = useStyles({ ...props, theme })

    const { state, dispatch } = useContext(AuthContext)

    const [recipes, setRecipes] = useState<recipe[]>([])

    useEffect(() => {
        axios({
            method: 'get',
            url: '/recipe',
            headers: { authToken: state.user.token }
        }).then(({ data, ...rest }) => {
            console.log(data);
            setRecipes(data)
        }).catch((err) => {
            console.log('error!');
        });
    }, [state.user.token])



    return (
        <div className={classes.root}>
            {recipes.map(e => (<p>{e.name}</p>))}
        </div>
    )
}

export default Dashboard