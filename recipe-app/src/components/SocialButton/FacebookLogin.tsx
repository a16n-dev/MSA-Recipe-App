import React from 'react'
import { makeStyles, withStyles, Button, ButtonProps, Typography } from '@material-ui/core'
import { BaseProps } from '@material-ui/core/OverridableComponent'
import { auth, facebookAuthProvider } from '../../util/firebase';
import googleLogo from '../../resource/img/google.png'
import { GoogleLoginButton, FacebookLoginButton } from 'react-social-login-buttons';

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