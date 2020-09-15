import React, { useState } from 'react'

import { makeStyles, Typography } from '@material-ui/core';

import clsx from 'clsx'
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(0),
        }
    },
    number: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            marginRight: theme.spacing(1),
            position: 'absolute',
            left: '32px'
        }
    },
    text: {
        whiteSpace: 'pre-wrap',
        marginRight: theme.spacing(4),
        [theme.breakpoints.down('xs')]: {
            marginRight: theme.spacing(1),
        }
    }
}));

interface ListItemProps {
    value: string
    index: number
}

const ListItem = (props: ListItemProps) => {

    const classes = useStyles()
    const [used, setUsed] = useState<boolean>(false)

    const {value, index} = props

    return (
        <div className={classes.root}>
            <div className={classes.number}><Typography>{index+1}.</Typography></div>
            <Typography className={classes.text}>{value}</Typography>
        </div>

    )
}

export default ListItem