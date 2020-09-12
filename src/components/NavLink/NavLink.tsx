import React, { useContext, useState, ChangeEvent } from 'react'
import { AuthContext } from '../../context/Authcontext';
import { makeStyles, IconButton, TextareaAutosize, Typography, Button, ButtonProps } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd'
import CloseIcon from '@material-ui/icons/Close';
import { note } from '../../types';
const useStyles = makeStyles(theme => ({
    root: {
        '&:hover': {
            borderBottom: `1px solid ${theme.palette.grey['500']}`,
            // backgroundColor: theme.palette.secondary.light,

        },
        '& > .MuiButton-label':{
            color: theme.palette.background.default,
        }
        
    }

}));

interface NavLinkProps extends ButtonProps {

}

const NavLink = (props: NavLinkProps) => {

    const classes = useStyles()
    const { state, dispatch } = useContext(AuthContext)
    const [hover, setHover] = useState<boolean>(false)

    return (
        <Button className={classes.root} {...props}>{props.children}</Button>
    )
}

export default NavLink