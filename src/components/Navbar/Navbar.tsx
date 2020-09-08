import React, {useContext,MouseEvent} from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import { AuthContext } from '../../context/Authcontext';
import { auth } from '../../util/firebase';

const useStyles = createUseStyles(theme => ({
    root: {
        display: 'flex',
    }
}));

interface NavbarProps {

}

const Navbar = (props: NavbarProps) => {
    const theme = useTheme()
    const classes = useStyles({ ...props, theme })

    const {state, dispatch} = useContext(AuthContext)

    const handleLogout = async (e: MouseEvent) => {
        console.log(e);

        // Logout
        auth.signOut();
        dispatch({
            type: 'CLEAR_USER',
            payload: null
        });
    }

    let contextNav;

    if(state.loading){
        contextNav = null
    }else if (state.user) {
        // Buttons to show to authenticated user
        contextNav = (
            <>
            <button>Home</button>
            <button>Create Recipe</button>
            <button>My profile</button>
            <button onClick={handleLogout}>Logout</button>
            <img src={state.user.photoUrl} style={{height: '80px'}}/>
            </>
        )
    } else {
        // Buttons to show to unauthenticated user
    }

    return (
        <div className={classes.root}>
            <h3>Recipe App</h3>
            {contextNav}
        </div>
    )
}

export default Navbar