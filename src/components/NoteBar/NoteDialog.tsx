import React, { useState, ChangeEvent, useEffect } from 'react'

import { makeStyles, Typography, Dialog, DialogContent, TextareaAutosize, Button, DialogActions, DialogTitle } from '@material-ui/core';
import clsx from 'clsx'
import { note } from '../../types';
import DeleteIcon from '@material-ui/icons/Delete';

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
    notes: note[]
    setNotes: React.Dispatch<React.SetStateAction<note[]>>
    index: number
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const NoteDialog = (props: NoteDialogProps) => {

    const classes = useStyles()

    const [currentNote, setCurrentNote] = useState<note>({
        title: '',
        body: '',
        id: ''
    })



    const {notes, index, open, setOpen,setNotes} = props

    useEffect(()=>{
        setCurrentNote(notes[index])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index])

    const handleClose = () => {
        setOpen(false)
        const arr: note[] = Array.from(notes)
        arr.splice(index, 1)
        setNotes([currentNote, ...arr])
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>, body: boolean) => {

        if (body) {
            setCurrentNote({
                ...currentNote, 
                body: e.target.value
            })
        } else {
            setCurrentNote({
                ...currentNote, 
                title: e.target.value
            })        
        }
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogContent dividers>
            <TextareaAutosize className={classes.inputTitle} value={currentNote.title} placeholder={'Take note'} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => { handleChange(e, false) }}></TextareaAutosize>
            <TextareaAutosize className={classes.input} value={currentNote.body} placeholder={'notes here'} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => { handleChange(e, true) }}></TextareaAutosize>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="secondary" variant={'contained'}>
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