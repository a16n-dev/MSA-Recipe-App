import React, { useContext, MouseEvent, Fragment, useState } from 'react'
import { AuthContext } from '../../context/Authcontext';
import { auth } from '../../util/firebase';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Avatar, IconButton, Hidden, Drawer, List, ListItem, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import NavLink from '../NavLink/NavLink';
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        zIndex: 3000,

    },
    toolbar: {
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 0
        }
    },
    logo: {
        marginRight: theme.spacing(2)
    },
    avatar: {
        marginLeft: theme.spacing(2)
    },
    leftButtonGroup: {
        flexGrow: 1
    },
    divider: {
        backgroundColor: theme.palette.grey['700']
    },
    icon: {
        color: theme.palette.background.default,
    },
    spacer: {
        backgroundColor: theme.palette.grey['700'],
        marginBottom: theme.spacing(8)
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
                    <NavLink onClick={redirectHome}>Home</NavLink>
                    <NavLink onClick={redirectRecipeList}>My Recipes</NavLink>
                    <NavLink onClick={redirectNewRecipe}>Create New Recipe</NavLink>
                </div>
                <NavLink >My Profile</NavLink>
                <NavLink variant={'outlined'} onClick={handleLogout}>Logout</NavLink>

                <Avatar className={classes.avatar} src={state.user.photoUrl}></Avatar>
                </Hidden>
        )
    } else {
        // Buttons to show to unauthenticated user
        navContent = (
            <Hidden xsDown>
                <div className={classes.leftButtonGroup}></div>
                <NavLink variant={'outlined'} onClick={redirectHome}>Login</NavLink>
                <Avatar className={classes.avatar} src={state.user? state.user.photoUrl: '' }></Avatar>
            </Hidden>
        )
    }

    return (
        <Fragment>
        <AppBar position="static" className={classes.root} color={'secondary'}>
            <Toolbar className={classes.toolbar}>
                <Hidden smUp>
                <IconButton className={classes.icon} onClick={()=>setDrawer(!drawer)}>
                    {drawer? <MenuOpenIcon/> : <MenuIcon />}
                </IconButton>
                </Hidden>
                <Typography variant="h6" className={classes.logo}>
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
            <List>
            {state.user?
            <>
                <Divider className={classes.divider} />
                    <ListItem button={true} onClick={() => {setDrawer(false)}}><NavLink onClick={redirectHome}>Home</NavLink></ListItem>
                    <ListItem button={true} onClick={() => {redirectRecipeList(); setDrawer(false)}}><NavLink onClick={redirectRecipeList}>My Recipes</NavLink></ListItem>
                    <ListItem button={true} onClick={() => {redirectNewRecipe(); setDrawer(false)}}><NavLink onClick={redirectNewRecipe}>Create New Recipe</NavLink></ListItem>
                    <Divider className={classes.spacer} />
                    <ListItem button={true}><Avatar  src={state.user? state.user.photoUrl: '' }></Avatar></ListItem>
                    <ListItem button={true} onClick={() => {setDrawer(false)}}><NavLink >My Profile</NavLink></ListItem>
                    <ListItem button={true} onClick={() => {setDrawer(false)}}><NavLink variant={'outlined'} onClick={handleLogout}>Logout</NavLink></ListItem>
            </>: 
            <>
            <Divider className={classes.spacer} />
            <ListItem button={true}><Avatar  src={state.user? state.user.photoUrl: '' }></Avatar></ListItem>
            <ListItem button={true} onClick={() => {setDrawer(false)}}><NavLink variant={'outlined'} onClick={redirectHome}>Login</NavLink></ListItem>
            </>}
                
            </List>
          </Drawer>
          </Hidden>
        </Fragment>
    )
}

export default Navbar