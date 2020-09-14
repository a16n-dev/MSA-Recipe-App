import React from 'react'
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(theme => {
    let styles: any = {
        root: {
            height: '100%'
        },
        expand: {
            flexGrow: 1
        }
    }
    for(let x = 0; x <= 10; x++){
        styles[`spacer${x}`] = {
            width: theme.spacing(x)
        }
    }
    return styles
});

interface SpacerProps {
    gap?: number
    expand?: boolean
}

const Spacer = (props: SpacerProps) => {

    const classes: any = useStyles()

    const {gap, expand = false} = props

    return (
        <div className={clsx(gap && classes[`spacer${gap}`], expand && classes.expand)}/>
    )
}

export default Spacer