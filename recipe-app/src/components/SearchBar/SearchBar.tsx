import React, { useState } from 'react'
import { makeStyles, IconButton, Tooltip, Modal, Dialog, DialogTitle, DialogContent, Typography, List, ListItem, Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import HelpIcon from '@material-ui/icons/Help';
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: '36px',
        alignItems: 'stretch',

    },
    inputContainer: {
        boxShadow: theme.shadows['2'],
        width: '221px'
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
    },
    help: {
        color: theme.palette.grey['500'],
        margin: theme.spacing(1)
    }
}));

interface SearchBarProps {
    query: string,
    setQuery: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar = (props: SearchBarProps) => {

    const classes = useStyles()

    const { query, setQuery } = props
    const [modal, setModal] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    const closeModal = () => {
        setModal(false)
    }

    return (
        <div className={classes.root}>
            <Dialog open={modal} onClose={closeModal}>
                <DialogTitle>
                    Advanced Search
            </DialogTitle>
                <DialogContent dividers>
                    <Typography>By default the search will return recipes where the search term is included in the name.</Typography>
                    <Typography>To search by other parameters you can prefix your search with an '@'. Below are some useful search queries:</Typography>
                    <br />
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Search</TableCell>
                                <TableCell align="left">Returns</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="left">@public</TableCell>
                                <TableCell align="left">Returns all public recipes</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">@private</TableCell>
                                <TableCell align="left">Returns all private recipes</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">@ingredient:flour</TableCell>
                                <TableCell align="left">Returns all recipes which contain the specified ingredient</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </DialogContent>
            </Dialog>
            <div className={classes.inputContainer}>
                <input type={'text'} placeholder={'Search recipes...'} value={query} className={classes.input} onChange={handleChange} aria-controls="search-bar" aria-haspopup="true" />
                <Tooltip title={query === '' ? 'Search Recipes' : 'Clear Search'}>
                    <IconButton color={'secondary'} size={'small'} className={classes.button} onClick={() => { setQuery('') }}>
                        {query.length > 0 ? <ClearSharpIcon /> : <SearchSharpIcon />}
                    </IconButton>
                </Tooltip>
            </div>
            <HelpIcon onClick={() => setModal(true)} className={classes.help} />
        </div>

    )
}

export default SearchBar