import React from 'react'
import { ButtonProps, Typography } from '@material-ui/core'

import { auth, microsoftAuthProvider } from '../../util/firebase';

import {  MicrosoftLoginButton } from 'react-social-login-buttons';

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