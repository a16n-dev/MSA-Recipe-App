import React from 'react'
import { ButtonProps, Typography } from '@material-ui/core'

import { auth, googleAuthProvider } from '../../util/firebase';

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