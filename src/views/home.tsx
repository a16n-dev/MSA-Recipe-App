import React, {MouseEvent, useContext} from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import { auth, googleAuthProvider, facebookAuthProvider } from '../util/firebase';
import { AuthContext } from '../context/Authcontext';

const useStyles = createUseStyles(theme => ({
    root: {

    }
}));

interface homeProps {

}

const Home = (props: homeProps) => {
    const theme = useTheme()
    const classes = useStyles({ ...props, theme })

    const {state, dispatch} = useContext(AuthContext)

    const handleGoogleLogin = async (e: MouseEvent) => {
        auth.signInWithPopup(googleAuthProvider).then(async (result) => {
            const { user } = result;
            if(user){
                const idTokenResult = await user.getIdTokenResult();

                dispatch({
                    type: 'LOG_IN_USER',
                    payload: { email: user.email, token: idTokenResult.token }
                });
    
                // Post user data to api
            }
           
        });
    }

    const handleFacebookLogin = async (e: MouseEvent) => {
        auth.signInWithPopup(facebookAuthProvider).then(async (result) => {
            console.log(result);
            const { user } = result;
            if(user){
                const idTokenResult = await user.getIdTokenResult();

                dispatch({
                    type: 'LOG_IN_USER',
                    payload: { email: user.email, token: idTokenResult.token }
                });
    
                // Post user data to api
            }
           
        });
    }

    const handleLogout = async (e: MouseEvent) => {
        console.log(e);

        // Logout
        auth.signOut();
        dispatch({
            type: 'CLEAR_USER',
            payload: null
        });
    }

    return (
        <div className={classes.root}>
            <button onClick={handleGoogleLogin}>Sign in with google!</button>
            <button onClick={handleFacebookLogin}>Sign in with facebook!</button>
            <button onClick={handleLogout}>Logout!</button>
            {JSON.stringify(state.user)}
        </div>
    )
}

export default Home