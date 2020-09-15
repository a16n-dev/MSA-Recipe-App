import React from 'react'
import { makeStyles } from '@material-ui/core';
import ListItem from './ListItem';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    }
}));

interface MethodListProps {
    method: string[]
}

const MethodList = (props: MethodListProps) => {

    const classes = useStyles()

    const { method } = props

    return (
        <div className={classes.root} >
            {method.map((e, i) => (<ListItem value={e} index={i} />))}
        </div>

    )
}

export default MethodList