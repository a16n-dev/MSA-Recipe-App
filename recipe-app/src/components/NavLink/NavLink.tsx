import React from 'react'
import { makeStyles, Button, ButtonProps } from '@material-ui/core';

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

    return (
        <Button className={classes.root} {...props}>{props.children}</Button>
    )
}

export default NavLink