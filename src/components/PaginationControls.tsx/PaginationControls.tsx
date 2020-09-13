import React, { useState, useEffect } from 'react'

import { makeStyles, Typography, IconButton } from '@material-ui/core';
import FirstPageSharpIcon from '@material-ui/icons/FirstPageSharp';
import LastPageSharpIcon from '@material-ui/icons/LastPageSharp';
import NavigateNextSharpIcon from '@material-ui/icons/NavigateNextSharp';
import NavigateBeforeSharpIcon from '@material-ui/icons/NavigateBeforeSharp';
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            alignItems: 'center'
        }
    },
    button: {
        minWidth: '30px'
    },
    buttonBar: {
        display: 'flex',
    },
}));

interface PaginationControlsProps {
    startIndex: number
    pageCount: number
    totalCount: number
    setStartIndex: React.Dispatch<React.SetStateAction<number>>
}

const PaginationControls = (props: PaginationControlsProps) => {

    const classes = useStyles()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [page, setPage] = useState<number>(0)

    const { startIndex, pageCount, totalCount, setStartIndex } = props

    const getMessage = () => {
        const start = startIndex + 1
        let end = startIndex + pageCount
        if (end > totalCount) {
            end = totalCount
        }
        return (
            <Typography>
                Showing results {totalCount === 0 ? 0 : start} - {end} of {totalCount}
            </Typography>
        )
    }

    useEffect(() => {
        setPage(Math.floor(startIndex / pageCount) + 1)
    }, [pageCount, startIndex])

    // const goToPage = ()

    const getButtons = () => {
        const pages = Math.ceil(totalCount / pageCount)
        console.log(`pages: ${pages}`);
        return (
            <div className={classes.buttonBar}>

                <IconButton disabled={page === 1} onClick={() => setStartIndex(0)} size={'small'} className={classes.button}>
                    <FirstPageSharpIcon />
                </IconButton>
                <IconButton disabled={page === 1} onClick={() => setStartIndex(startIndex - pageCount)} size={'small'} className={classes.button}>
                    <NavigateBeforeSharpIcon />
                </IconButton>
                {page > 2 ? <IconButton size={'small'} className={classes.button} onClick={() => setStartIndex(startIndex - pageCount * 2)}>{page - 2}</IconButton> : ''}
                {page > 1 ? <IconButton size={'small'} className={classes.button} onClick={() => setStartIndex(startIndex - pageCount)}>{page - 1}</IconButton> : ''}

                <IconButton color={'secondary'} size={'small'} className={classes.button}>
                    {page}
                </IconButton>

                {page < pages ? <IconButton className={classes.button} size={'small'} onClick={() => setStartIndex(startIndex + pageCount)}>{page + 1}</IconButton> : ''}
                {page < pages - 1 ? <IconButton className={classes.button} size={'small'} onClick={() => setStartIndex(startIndex + pageCount * 2)}>{page + 2}</IconButton> : ''}
                <IconButton disabled={page === pages} className={classes.button} onClick={() => setStartIndex(startIndex + pageCount)} size={'small'}>
                    <NavigateNextSharpIcon />
                </IconButton>
                <IconButton disabled={page === pages} className={classes.button} onClick={() => setStartIndex((pages - 1) * pageCount)} size={'small'}>
                    <LastPageSharpIcon />
                </IconButton>
                </div>
        )
    }

    return (
        <div className={classes.root}>
            {getMessage()}
            {getButtons()}
        </div>
    )
}

export default PaginationControls