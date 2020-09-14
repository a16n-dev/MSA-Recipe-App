import React, { useContext, useState, ChangeEvent } from 'react'
import { AuthContext } from '../../context/Authcontext';
import { makeStyles, IconButton, TextareaAutosize, Typography, Button, Dialog, DialogContent, DialogActions, DialogTitle } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd'
import CloseIcon from '@material-ui/icons/Close';
import { note } from '../../types';
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        userSelect: 'none',
        background: 'white',
        minHeight: '50px',
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        border: '1px solid grey',
        borderRadius: '4px'
    },
    dragHandle: {
        width: '40px',
        padding: '8px',
        // background: 'black',
    }

}));

interface ConfirmationButtonProps {
    children: React.ReactNode
    onClick: ()=>void
    title: string
    message: string
    action: string
}

const ConfirmationButton = (props: ConfirmationButtonProps) => {

    const classes = useStyles()

    const [open, setOpen] = useState<boolean>(false)

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Button variant={'contained'} color={'secondary'} onClick={()=>{setOpen(true)}}>
                {props.children}
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="confirmation-dialog" open={open}>
                <DialogTitle>
                    {props.title}
                </DialogTitle>
                <DialogContent dividers>
                {props.message}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus color="secondary" variant={'contained'} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button autoFocus color="secondary" variant={'contained'} onClick={() =>{props.onClick(); handleClose()}}>
                        {props.action}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ConfirmationButton