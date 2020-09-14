import React, { useState } from 'react'

import { Button, Dialog, DialogContent, DialogActions, DialogTitle } from '@material-ui/core';


interface ConfirmationButtonProps {
    children: React.ReactNode
    onClick: ()=>void
    title: string
    message: string
    action: string
}

const ConfirmationButton = (props: ConfirmationButtonProps) => {

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