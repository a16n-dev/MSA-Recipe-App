import React from 'react'
import { makeStyles, Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
        root: {
            height: '100%',
            padding: theme.spacing(4),
            textAlign: 'center'
        },
}));

interface NotFoundProps {
    message: string
}

const NotFound = (props: NotFoundProps) => {

    const classes: any = useStyles()

    return (
        <Grid container className={classes.root} justify={'center'} alignItems={'center'} direction={'column'} spacing={8}>
            <Grid item>
            <Typography variant={'h1'}>404</Typography>
            <Typography variant={'h6'}>Page not found</Typography>
            </Grid>
            <Grid item>
            <Typography variant={'h5'}>{props.message}</Typography>
            </Grid>
        </Grid>
    )
}

export default NotFound