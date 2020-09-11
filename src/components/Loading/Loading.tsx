import React from 'react'

import { makeStyles, Typography, LinearProgress } from '@material-ui/core';

import clsx from 'clsx'
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%'
    }
}));

interface LoadingProps {
}

const Loading = (props: LoadingProps) => {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <LinearProgress/>
        </div>

    )
}

export default Loading