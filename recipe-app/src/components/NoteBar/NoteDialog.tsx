import React, { useState, ChangeEvent, useEffect } from 'react'

import { makeStyles, Dialog, DialogContent, TextareaAutosize, Button, DialogActions } from '@material-ui/core';
import { note } from '../../types';

const useStyles = makeStyles(theme => ({
    root: {

    },
    input: {
        flexGrow: 1,
        outline: 'none',
        resize: 'none',
        height: 0,
        fontFamily: theme.typography.fontFamily,
        width: '100%',
        border: "none"
    },
    inputTitle: {
        outline: 'none',
        resize: 'none',
        height: 0,
        fontFamily: theme.typography.fontFamily,
        width: '100%',
        border: "none",
        marginBottom: theme.spacing(1),
        fontSize: theme.typography.h6.fontSize
    }
}));

interface NoteDialogProps {
    currentNote: note
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    open: boolean
    setNote: (currentNote: note) => void
    deleteNote: () => void
}

const NoteDialog = (props: NoteDialogProps) => {

    const classes = useStyles()

    const [editNote, setEditNote] = useState<note>({
        title: '',
        body: '',
        id: ''
    })

    const {currentNote, open, setOpen, setNote, deleteNote } = props

    useEffect(()=>{
        setEditNote(currentNote)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentNote])

    const handleClose = () => {
        setOpen(false)
        setNote(editNote)
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>, body: boolean) => {

        if (body) {
            setEditNote({
                ...editNote, 
                body: e.target.value
            })
        } else {
            setEditNote({
                ...editNote, 
                title: e.target.value
            })        
        }
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogContent dividers>
            <TextareaAutosize className={classes.inputTitle} value={editNote.title} placeholder={'Note Title'} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => { handleChange(e, false) }}></TextareaAutosize>
            <TextareaAutosize className={classes.input} value={editNote.body} placeholder={'notes here'} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => { handleChange(e, true) }}></TextareaAutosize>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="secondary" onClick={deleteNote} variant={'contained'}>
            Delete
          </Button>
          <Button autoFocus color="secondary" variant={'contained'} onClick={handleClose}>
            Save
          </Button>
        </DialogActions>
    </Dialog>

    )
}

export default NoteDialog