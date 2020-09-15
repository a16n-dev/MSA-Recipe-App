import React, { useState } from 'react'

import { makeStyles, Typography } from '@material-ui/core';

import clsx from 'clsx'
const useStyles = makeStyles(theme => ({
    root: {
        lineHeight: '40px',
        cursor: 'pointer',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    alt: {
        background: theme.palette.grey['100']
    },
    used: {
        color: theme.palette.grey['400']
    }
}));

interface ListItemProps {
    text: string
    alt: boolean

}

const ListItem = (props: ListItemProps) => {

    const classes = useStyles()
    const [used, setUsed] = useState<boolean>(false)

    const { text, alt } = props

    return (
        <Typography
         className={clsx(classes.root, alt && classes.alt, used && classes.used)}
         onClick={()=>{setUsed(!used)}}
         >{text}</Typography>

    )
}

export default ListItem