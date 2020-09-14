import React, { useState } from 'react'

import { makeStyles, IconButton, TextareaAutosize, Typography, Button, MenuItem, Menu, Input, Tooltip } from '@material-ui/core';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: '36px',
        alignItems: 'stretch',
        boxShadow: theme.shadows['2']
    },
    input: {
        outline: 'none',
        // border: `1px solid ${theme.palette.secondary.main}`,
        border: 'none',
        boxSizing: 'border-box',
        padding: theme.spacing(1),
    },
    button: {
        height: '36px',
        width: '36px'
    }
}));

interface SearchBarProps {
    query: string,
    setQuery: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar = (props: SearchBarProps) => {

    const classes = useStyles()

    const {query, setQuery} = props

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    return (
        <div className={classes.root}>
            <input type={'text'} placeholder={'Search recipes...'} value={query} className={classes.input} onChange={handleChange} aria-controls="search-bar" aria-haspopup="true"/>
            <Tooltip title={query === '' ? 'Search Recipes' : 'Clear Search'}>
            <IconButton color={'secondary'} size={'small'} className={classes.button} onClick={()=>{setQuery('')}}>
                {query.length > 0 ? <ClearSharpIcon/> : <SearchSharpIcon />}
            </IconButton>
            </Tooltip>
        </div>
    )
}

export default SearchBar