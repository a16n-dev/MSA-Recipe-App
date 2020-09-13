import React, {useContext, useState, useEffect} from 'react'
import { AuthContext } from '../context/Authcontext';
import { match } from 'react-router-dom';
import { user } from '../types';
import Axios from 'axios';
import { makeStyles, Avatar, Typography, Grid, Divider, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100%',
        width: '90%',
        margin: '0 5%',
        display: 'grid',
        gridTemplateRows: 'minmax(0, min-content) auto minmax(0, min-content)',
        padding: theme.spacing(4),
        rowGap: `${theme.spacing(2)}px`,
    },
    redButton: {
        backgroundColor: theme.palette.error.main,
        '&:hover':{
            backgroundColor: theme.palette.error.light,
        },
    }
}));

interface SettingsProps {

}

const Settings = (props: SettingsProps) => {
    const classes = useStyles()

    const {state, dispatch} = useContext(AuthContext)

    // users id from url

    if(!state.user){
        return <h1>wow</h1>
    }

    return (
        <div className={classes.root}>
            <Typography variant={'h4'}>User Settings</Typography>
            <Grid container direction={'column'}>
                <Divider/>
                <Grid item><Typography variant={'h6'}>Privacy</Typography></Grid>
                <Divider/>
                <Grid item><Typography variant={'h6'}>Account</Typography></Grid>
                <Grid item>
                <Button className={classes.redButton} variant={'contained'}>Delete Account</Button>
                </Grid>
                <Grid item><Typography variant={'caption'}>Warning: this cannot be undone</Typography></Grid>
            </Grid>
            <div>
                <Button  variant={'contained'} color={'secondary'}>test</Button>
            </div>
        </div>
    )
}

export default Settings