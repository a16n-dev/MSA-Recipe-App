import React from 'react'
import { makeStyles, withStyles, Button, ButtonProps, Typography } from '@material-ui/core'
import { BaseProps } from '@material-ui/core/OverridableComponent'
import { auth, googleAuthProvider } from '../../util/firebase';
import googleLogo from '../../resource/img/google.png'
import { GoogleLoginButton } from 'react-social-login-buttons';

const GoogleLogin = (props: ButtonProps) => {

    const handleGoogleLogin = async () => {
        auth.signInWithRedirect(googleAuthProvider)
    }

    return (
        <GoogleLoginButton

          onClick={handleGoogleLogin}

            ><Typography>Sign in with Google</Typography></GoogleLoginButton>

    )
}

export default GoogleLogin