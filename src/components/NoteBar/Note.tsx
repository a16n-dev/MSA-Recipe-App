import React, { useContext, useState, ChangeEvent } from 'react'
import { AuthContext } from '../../context/Authcontext';
import { makeStyles, IconButton, TextareaAutosize, Typography } from '@material-ui/core';
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

interface NoteProps {
    value: note
    index: number
    edit: () => void
}

const Note = (props: NoteProps) => {

    const classes = useStyles()
    const { state, dispatch } = useContext(AuthContext)
    const [hover, setHover] = useState<boolean>(false)

    const {value: {title, body, id}, index, edit} = props

    return (
        <Draggable draggableId={`${index}`} key={id} index={index}>
            {(provided, snapshot) => (
                <div className={classes.root} {...provided.dragHandleProps} ref={provided.innerRef} {...provided.draggableProps} onClick={edit}>
                    <Typography variant={'h6'}>{title}</Typography>
                    <Typography>{body}</Typography>
                </div>
            )}
        </Draggable>
    )
}

export default Note