import React, { useContext } from 'react'
import { auth, googleAuthProvider, facebookAuthProvider, microsoftAuthProvider } from '../util/firebase';
import { AuthContext } from '../context/Authcontext';
import {Types } from '../context/auth'
import axios from 'axios'
import { makeStyles, Grid, Card, CardContent, Typography } from '@material-ui/core';
import { FacebookLoginButton, GoogleLoginButton, MicrosoftLoginButton } from "react-social-login-buttons";
import bgImg from '../resource/img/background.jpg'

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        paddingTop: '10%',
        paddingLeft: '10%',
        paddingRight: '10%',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: -100,
        background: `url(${bgImg})`,
        backgroundSize: 'cover',
        filter: 'brightness(0.4)',
        transform: 'scale(1.1)'
    },
    titleBox: {
        color: 'white',
        maxWidth: '30vw',
        [theme.breakpoints.down('sm')]: {
            maxWidth: 'initial',
        }
    }
}));

interface homeProps {

}

const Home = (props: homeProps) => {
    const classes = useStyles()

    const { dispatch } = useContext(AuthContext)

    const handleGoogleLogin = async () => {
        auth.signInWithRedirect(googleAuthProvider)
    }

    const handleFacebookLogin = async () => {
        auth.signInWithRedirect(facebookAuthProvider);
    }

    const handleMicrosoftLogin = async () => {
        auth.signInWithRedirect(microsoftAuthProvider);
    }

    return (
        <Grid container className={classes.root} alignItems='flex-start' justify='space-around'>
            <div className={classes.backgroundImage}></div>
            <Grid item xs={12} md={8}>
                <div className={classes.titleBox}>
                <Typography variant='h2'><b>Recipe app</b></Typography>
                <Typography variant='body1'>Create and share your favourite recipes. more placeholder text and stuff</Typography>
                </div>
            </Grid>
            <Grid item  xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Grid container direction='column' spacing={2}>
                        <Typography>Get started today - completely free!</Typography>
                        <GoogleLoginButton onClick={handleGoogleLogin}>Sign in with Google</GoogleLoginButton><br/>
                        <FacebookLoginButton onClick={handleFacebookLogin}>Sign in with Facebook</FacebookLoginButton><br/>
                        <MicrosoftLoginButton onClick={handleMicrosoftLogin}>Sign in with Microsoft</MicrosoftLoginButton><br/>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Home