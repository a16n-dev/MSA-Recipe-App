import React from 'react'
import { makeStyles, withStyles, Button, ButtonProps, Typography } from '@material-ui/core'
import { BaseProps } from '@material-ui/core/OverridableComponent'
import { auth, microsoftAuthProvider } from '../../util/firebase';
import googleLogo from '../../resource/img/google.png'
import { GoogleLoginButton, FacebookLoginButton, MicrosoftLoginButton } from 'react-social-login-buttons';

const MicrosoftLogin = (props: ButtonProps) => {


    const handleMicrosoftLogin = async () => {
        auth.signInWithRedirect(microsoftAuthProvider);
    }
    return (
        <MicrosoftLoginButton

          onClick={handleMicrosoftLogin}

            ><Typography>Sign in with Microsoft</Typography></MicrosoftLoginButton>

    )
}

export default MicrosoftLogin