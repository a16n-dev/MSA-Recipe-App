import React, { useContext, useState, ChangeEvent, useEffect } from 'react'
import { AuthContext } from '../../context/Authcontext';
import { makeStyles, Input } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        fontSize: theme.typography.h3.fontSize,
        lineHeight: theme.typography.h3.lineHeight,
        fontWeight: theme.typography.h3.fontWeight,
        letterSpacing: theme.typography.h3.letterSpacing,
        // background: 'blue',
    }
}));

interface EditTitleFormProps {
    title: string
    setTitle: React.Dispatch<React.SetStateAction<string>>
    error: boolean
}

const EditTitleForm = (props: EditTitleFormProps) => {

    const classes = useStyles()

    const { state, dispatch } = useContext(AuthContext)

    const {title, setTitle,error} = props

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    return (
        <Input className={classes.root} error={error} value={title} onChange={handleChange}></Input>
    )
}

export default EditTitleForm