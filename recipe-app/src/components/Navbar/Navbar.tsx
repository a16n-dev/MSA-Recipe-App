import React, { useContext, MouseEvent, Fragment, useState } from 'react'
import { AuthContext } from '../../context/Authcontext';
import { auth } from '../../util/firebase';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Avatar, IconButton, Hidden, Drawer, List, ListItem, Divider, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import NavLink from '../NavLink/NavLink';
import SettingsIcon from '@material-ui/icons/Settings';
import { Types } from '../../context/auth';
import Logo from '../Logo/Logo';
import Spacer from '../Spacer';
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        zIndex: 3000,
        color: theme.palette.background.default,

    },
    toolbar: {
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 0
        }
    },
    logo: {
        marginRight: theme.spacing(2),
        width: '128px',
        [theme.breakpoints.down('xs')]: {
            margin: 'auto'
        }
    },
    avatar: {
        marginLeft: theme.spacing(2)
    },
    leftButtonGroup: {
        display: 'flex',
        flexGrow: 1,
        overflowX: 'hidden',
        flexWrap: 'nowrap'
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
    },
    button:{
        color: theme.palette.background.default
    },
}));

interface NavbarProps {

}

const Navbar = (props: NavbarProps) => {
    const classes = useStyles()
    const history = useHistory()
    const { state, dispatch } = useContext(AuthContext)

    const [drawer, setDrawer] = useState<boolean>(false)
    // For modal
    const [open, setOpen] = useState<boolean>(false)
    const [redirUrl, setRedirUrl] = useState<string>('')

    const handleClose = () => {
        setOpen(false)
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

    const redirectHome = () => {
        redirect('/recipes')
    }

    const redirectNewRecipe = () => {
        redirect('/recipes/new')
    }

    const redirectRecipeList = () => {
        redirect('/recipes')
    }

    const redirectRecipeListSaved = () => {
        redirect('/explore/saved')
    }

    const redirectProfile = () => {
        redirect(`/user/${state.user._id}`)
    }

    const redirectSettings = () => {
        redirect('/settings')
    }

    const redirect = (url: string) => {
        if(state.stay){
            setRedirUrl(url)
            setOpen(true)
        } else {
            history.push(url)
        }

    }

    let navContent;

    if (state.loading) {
        navContent = ''
    } else if (state.user) {
        // Buttons to show to authenticated user
        navContent = (
            <Hidden xsDown>
                <div className={classes.leftButtonGroup}>
                    {/* <NavLink onClick={redirectHome}>Home</NavLink> */}
                    <NavLink onClick={redirectRecipeList}>My Recipes</NavLink>
                    <NavLink onClick={redirectRecipeListSaved}>Saved Recipes</NavLink>
                    <NavLink onClick={redirectNewRecipe}>Create New Recipe</NavLink>
                </div>
                <NavLink onClick={redirectProfile}>My Profile</NavLink>
                <NavLink variant={'outlined'} onClick={handleLogout}>Logout</NavLink>
                <Tooltip title={'Settings'}>
                <IconButton onClick={redirectSettings} className={classes.button}><SettingsIcon/></IconButton>
                </Tooltip>
                <Avatar className={classes.avatar} src={state.user.profileUrl}></Avatar>
                </Hidden>
        )
    } else {
        // Buttons to show to unauthenticated user
        // return (<></>)
        navContent = (
            <Hidden xsDown>
                <div className={classes.leftButtonGroup}></div>
                <NavLink variant={'outlined'} onClick={redirectHome}>Login</NavLink>
                <Avatar className={classes.avatar} src={state.user? state.user.profileUrl: '' }></Avatar>
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
                <div className={classes.logo}>
                <Logo/>
                </div>
                
                <Spacer gap={3}/>
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
                    {/* <ListItem button={true} onClick={() => {setDrawer(false)}}><NavLink onClick={redirectHome}>Home</NavLink></ListItem> */}
                    <ListItem button={true} onClick={() => {redirectRecipeListSaved(); setDrawer(false)}}><NavLink onClick={redirectRecipeListSaved}>Saved Recipes</NavLink></ListItem>
                    <ListItem button={true} onClick={() => {redirectRecipeList(); setDrawer(false)}}><NavLink onClick={redirectRecipeList}>My Recipes</NavLink></ListItem>
                    <ListItem button={true} onClick={() => {redirectNewRecipe(); setDrawer(false)}}><NavLink onClick={redirectNewRecipe}>Create New Recipe</NavLink></ListItem>
                    <Divider className={classes.spacer} />
                    <ListItem button={true}><Avatar  src={state.user? state.user.profileUrl: '' }></Avatar></ListItem>
                    <ListItem button={true} onClick={() => {setDrawer(false)}}><NavLink >My Profile</NavLink></ListItem>
                    <ListItem button={true} onClick={() => {setDrawer(false)}}><NavLink variant={'outlined'} onClick={handleLogout}>Logout</NavLink></ListItem>
            </>: 
            <>
            <Divider className={classes.spacer} />
            <ListItem button={true}><Avatar  src={state.user? state.user.profileUrl: '' }></Avatar></ListItem>
            <ListItem button={true} onClick={() => {setDrawer(false)}}><NavLink variant={'outlined'} onClick={redirectHome}>Login</NavLink></ListItem>
            </>}
                
            </List>
          </Drawer>
          </Hidden>
          <Dialog onClose={handleClose} aria-labelledby="confirmation-dialog" open={open}>
                <DialogTitle>
                    Unsaved Changes
                </DialogTitle>
                <DialogContent dividers>
                You have unsaved changes, are you sure you want to leave?
                </DialogContent>
                <DialogActions>
                    <Button autoFocus color="secondary" variant={'contained'} onClick={handleClose}>
                        No
                    </Button>
                    <Button autoFocus color="secondary" variant={'contained'} onClick={()=>{handleClose();dispatch({type: Types.DontStay});history.push(redirUrl)}}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default Navbar