import React from 'react'
import {  ButtonProps, Typography } from '@material-ui/core'

import { auth, facebookAuthProvider } from '../../util/firebase';

import {FacebookLoginButton } from 'react-social-login-buttons';

const FacebookLogin = (props: ButtonProps) => {


    const handleFacebookLogin = async () => {
        auth.signInWithRedirect(facebookAuthProvider);
    }

    return (
        <FacebookLoginButton

          onClick={handleFacebookLogin}

            ><Typography>Sign in with Facebook</Typography></FacebookLoginButton>

    )
}

export default FacebookLogin