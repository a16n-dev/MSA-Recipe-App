import React, { MouseEvent, useContext } from 'react'
import { auth, googleAuthProvider, facebookAuthProvider } from '../util/firebase';
import { AuthContext } from '../context/Authcontext';
import { Link } from 'react-router-dom';
import {Types } from '../context/auth'
import axios from 'axios'
import { makeStyles, Grid, Card, CardContent, Typography } from '@material-ui/core';
import { FacebookLoginButton, GoogleLoginButton, MicrosoftLoginButton } from "react-social-login-buttons";


const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        paddingTop: '10%',
        paddingLeft: '10%',
        paddingRight: '10%'
    },
}));

interface homeProps {

}

const Home = (props: homeProps) => {
    const classes = useStyles()

    const { state, dispatch } = useContext(AuthContext)

    const handleGoogleLogin = async () => {
        auth.signInWithPopup(googleAuthProvider).then(async (result) => {
            const { user } = result;
            if (user) {
                const idTokenResult = await user.getIdTokenResult();

                axios({
                    method: 'post',
                    url: '/user',
                    headers: {authToken: idTokenResult.token}
                  }).then((res) => {
                    console.log(res);
                      if(res.status === 201){
                          console.log('successful db entry created!');
                      }
                  }).catch((err) => {
                      console.log('error!');
                  });
                  
                dispatch({
                    type: Types.Login,
                    payload: {
                        email: user.email,
                        token: idTokenResult.token,
                        photoUrl: user.photoURL,
                        name: user.displayName
                    }
                });

            }

        });
    }

    const handleFacebookLogin = async () => {
        auth.signInWithPopup(facebookAuthProvider).then(async (result) => {
            console.log(result);
            const { user } = result;
            if (user) {
                const idTokenResult = await user.getIdTokenResult();

                dispatch({
                    type: Types.Login,
                    payload: { email: user.email, token: idTokenResult.token },
                    photoUrl: user.photoURL,
                    name: user.displayName
                });

                // Post user data to api
            }

        });
    }

    return (
        <Grid container className={classes.root} alignItems='flex-start' justify='space-around'>
            <Grid item xs={12} md={8}>
                <Typography variant='h2'>Recipe app</Typography>
                <Typography variant='body1'>Create and share your favourite recipes. more placeholder text and stuff</Typography>
            </Grid>
            <Grid item  xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Grid container direction='column' spacing={2}>
                        <Typography>Get started today - completely free!</Typography>
                        <GoogleLoginButton onClick={handleGoogleLogin}>Sign in with Google</GoogleLoginButton><br/>
                        <FacebookLoginButton onClick={handleFacebookLogin}>Sign in with Facebook</FacebookLoginButton><br/>
                        <MicrosoftLoginButton onClick={handleFacebookLogin}>Sign in with Microsoft</MicrosoftLoginButton><br/>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Home