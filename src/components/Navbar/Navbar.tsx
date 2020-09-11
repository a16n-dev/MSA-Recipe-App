import React, { useContext, MouseEvent, Fragment, useState } from 'react'
import { AuthContext } from '../../context/Authcontext';
import { auth } from '../../util/firebase';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Avatar, IconButton, Hidden, Drawer } from '@material-ui/core'
import { makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        zIndex: 3000
    },
    leftButtonGroup: {
        flexGrow: 1
    }
}));

interface NavbarProps {

}

const Navbar = (props: NavbarProps) => {
    const classes = useStyles()
    const history = useHistory()
    const { state, dispatch } = useContext(AuthContext)

    const [drawer, setDrawer] = useState<boolean>(false)

    const handleLogout = async (e: MouseEvent) => {
        console.log(e);

        // Logout
        auth.signOut();
        dispatch({
            type: 'CLEAR_USER',
            payload: null
        });
    }

    const redirectHome = () => {
        history.push('/dashboard')
    }

    const redirectNewRecipe = () => {
        history.push('/recipes/new')
    }

    const redirectRecipeList = () => {
        history.push('/recipes')
    }

    let navContent;

    if (state.loading) {
        navContent = ''
    } else if (state.user) {
        // Buttons to show to authenticated user
        navContent = (
            <Hidden xsDown>
                <div className={classes.leftButtonGroup}>
                <Button variant={'text'} onClick={redirectHome}>Home</Button>
                <Button variant={'text'} onClick={redirectRecipeList}>My Recipes</Button>
                <Button variant={'text'} onClick={redirectNewRecipe}>Create New Recipe</Button>
                </div>
                <Button variant={'text'}>My Profile</Button>
                <Button variant={'outlined'} onClick={handleLogout}>Logout</Button>

                <Avatar src={state.user.photoUrl}></Avatar>
                </Hidden>
        )
    } else {
        // Buttons to show to unauthenticated user
    }

    return (
        <Fragment>
        <AppBar position="static" className={classes.root} color={'secondary'}>
            <Toolbar>
                <Hidden smUp>
                <IconButton onClick={()=>setDrawer(!drawer)}>
                    <MenuIcon/>
                </IconButton>
                </Hidden>
                <Typography variant="h6">
                    Recipe App
                </Typography>
                {navContent}
            </Toolbar>
        </AppBar>
        <Hidden smUp>
        <Drawer 
      open={drawer}
        anchor={"top"}
        PaperProps={{ style: { position: 'absolute', bottom: '0' } }}
        BackdropProps={{ style: { position: 'absolute' } }}
        ModalProps={{
          container: document.getElementById('page-container'),
          style: { position: 'absolute' }
        }}
        >
            {navContent}
          </Drawer>
          </Hidden>
        </Fragment>
    )
}

export default Navbar