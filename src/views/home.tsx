import React, { MouseEvent, useContext } from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import { auth, googleAuthProvider, facebookAuthProvider } from '../util/firebase';
import { AuthContext } from '../context/Authcontext';
import { Link } from 'react-router-dom';
import {Types } from '../context/auth'
import axios from 'axios'

const useStyles = createUseStyles(theme => ({
    root: {

    }
}));

interface homeProps {

}

const Home = (props: homeProps) => {
    const theme = useTheme()
    const classes = useStyles({ ...props, theme })

    const { state, dispatch } = useContext(AuthContext)

    const handleGoogleLogin = async (e: MouseEvent) => {
        auth.signInWithPopup(googleAuthProvider).then(async (result) => {
            const { user } = result;
            console.log(user);
            if (user) {
                const idTokenResult = await user.getIdTokenResult();
                console.log(idTokenResult);
                console.log('sending req!');
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

                // Post user data to api
            }

        });
    }

    const handleFacebookLogin = async (e: MouseEvent) => {
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
        <div className={classes.root}>
            <button onClick={handleGoogleLogin}>Sign in with google!</button>
            <button onClick={handleFacebookLogin}>Sign in with facebook!</button>
        </div>
    )
}

export default Home