import React, {useContext, useState, useEffect} from 'react'
import { AuthContext } from '../context/Authcontext';
import { match, useHistory } from 'react-router-dom';
import { user } from '../types';
import Axios from 'axios';
import { makeStyles, Avatar, Typography, Grid, Divider, Button, Input, FormLabel } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import {Types} from '../context/auth'
import ConfirmationButton from '../components/ConfimationButton/ConfirmationButton';
import { userInfo } from 'os';
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
    },
    inputGroup: {
        display: 'grid',
        gridTemplateColumns: '60px auto 1fr',
        alignItems: 'center'
    }
}));

type errors = {
    name: boolean
}

interface SettingsProps {

}

const Settings = (props: SettingsProps) => {
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar();
    const {state, dispatch} = useContext(AuthContext)
    const history = useHistory()

    const [name, setName] = useState<string>('')
    const [error, setError] = useState<errors>({
        name: false
    })

    useEffect(()=>{
        setName(state.user.name)
    },[state])

    useEffect(()=>{
        setError({
            name: false
        })
    }, [name])

    const handleDelete = () => {
        Axios({
            method: 'delete',
            url: '/user',
            headers: {authToken: state.token}
        }).then((result) => {
            if(result.status === 200){
                dispatch({
                    type: Types.Delete
                })
            }
        }).catch((err) => {
            
        });
    }

    const handleSubmit =() => {
        if(name === ''){
            setError({...error, name: true})
            enqueueSnackbar('Name cannot be empty', {variant: 'error'})
            return
        }
        Axios({
            method: 'patch',
            url: '/user',
            headers: {authToken: state.token},
            data: {
                name
            }
        }).then((result) => {
            if(result.status === 200){
                enqueueSnackbar('Changes saved', {variant: 'success'})
                dispatch({
                    type: Types.Update,
                    payload: {
                        user: result.data
                    }

                })
            }
        }).catch((err) => {
            enqueueSnackbar('An error occured', {variant: 'error'})
        });
    }

    if(!state.user){
        return <h1>wow</h1>
    }

    return (
        <div className={classes.root}>
            <Typography variant={'h4'}>User Settings</Typography>
            <Grid container direction={'column'} spacing={3}>
                <Divider/>
                <Grid item><Typography variant={'h6'}>Personalisation</Typography></Grid>
                <Grid item className={classes.inputGroup}>
                    <FormLabel>Name</FormLabel> 
                    <Input value={name} error={error.name} onChange={(e)=>{setName(e.target.value)}}/>
                </Grid>
                <Divider/>
                <Grid item><Typography variant={'h6'}>Account</Typography></Grid>
                <Grid item>
                <ConfirmationButton
                 onClick={handleDelete}
                  title={'Delete Account?'} 
                  message={'This will delete your account and all of your data. This cannot be undone'}
                  action={'delete'}
                  >
                    Delete Account</ConfirmationButton>
                </Grid>
                <Grid item><Typography variant={'caption'}>Warning: this cannot be undone</Typography></Grid>
            </Grid>
            <div>
                <Button onClick={handleSubmit} variant={'contained'} color={'secondary'}>Save User Settings</Button>
            </div>
        </div>
    )
}

export default Settings