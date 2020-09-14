import React from 'react'
import { makeStyles, Typography, Card } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd'
import { note } from '../../types';
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        userSelect: 'none',
        minHeight: 'fit-content',
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        // borderBottom: `1px solid ${theme.palette.grey['400']}`,
        [theme.breakpoints.down('md')]: {
            width: '30%',
            marginBottom: 'auto',
            marginRight: theme.spacing(2),
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginBottom: theme.spacing(2)
        }
    },
    dragHandle: {
        width: '40px',
        padding: '8px',
        // background: 'black',
    },
    body: {
        whiteSpace: 'pre-wrap'
    }

}));

interface NoteProps {
    value: note
    index: number
    edit: () => void
}

const Note = (props: NoteProps) => {

    const classes = useStyles()

    const {value: {title, body, id}, index, edit} = props

    return (
        <Draggable draggableId={`${index}`} key={id} index={index}>
            {(provided, snapshot) => (
                <Card className={classes.root} {...provided.dragHandleProps} ref={provided.innerRef} {...provided.draggableProps} onClick={edit}>
                    <Typography variant={'h6'}>{title}</Typography>
                    <Typography className={classes.body}>{body}</Typography>
                </Card>
            )}
        </Draggable>
    )
}

export default Note