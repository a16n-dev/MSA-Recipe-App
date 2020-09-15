import React, { useState, ChangeEvent } from 'react'
import { makeStyles, IconButton, TextareaAutosize, Typography } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        position: 'relative',
        boxSizing: 'border-box',
        userSelect: 'none',
        background: 'white',
        minHeight: '50px',
        marginBottom: theme.spacing(2),
        boxShadow: theme.shadows['2']
    },
    dragHandle: {
        width: '30px',
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: theme.palette.grey['100']
        },
        '&:active': {
            backgroundColor: theme.palette.grey['100']
        }
    },
    handleIcon: {
        color: theme.palette.grey['400'],
        height: '20px'
    },
    input: {
        flexGrow: 1,
        outline: 'none',
        resize: 'none',
        height: 0,
        fontFamily: theme.typography.fontFamily,
        border: '1px solid #eee',
        padding: theme.spacing(2),
        width: '100%',
    },
    textContainer: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
    deleteButton: {
        width: '40px',
        height: '40px',
        padding: '10px',
        position: 'absolute',
        right: 0
    }

}));

interface MethodItemProps {
    value: string
    index: number
    deleteItem: (index: number) => void
    onChange: (e: ChangeEvent<HTMLTextAreaElement>, i: number) => void
}

const MethodItem = (props: MethodItemProps) => {
    const [hover, setHover] = useState<boolean>(false)
    const classes = useStyles()

    const { value, index, deleteItem, onChange } = props

    return (
        <Draggable draggableId={value + index} key={index.toString()} index={index}>
            {(provided, snapshot) => (
                <div className={classes.root} ref={provided.innerRef} {...provided.draggableProps} onMouseOver={() => { setHover(true) }} onMouseLeave={() => { setHover(false) }}>
                    <div
                        {...provided.dragHandleProps}
                        className={classes.dragHandle}

                    >
                        <DragIndicatorIcon className={classes.handleIcon} />
                    </div>

                    <div className={classes.textContainer}>
                        <Typography variant={'caption'}>Step {index + 1}</Typography><br />
                        <TextareaAutosize className={classes.input} value={value} placeholder={'Add step'} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => { onChange(e, index) }}></TextareaAutosize>
                    </div>
                    {hover && value !== '' ? <IconButton className={classes.deleteButton} onClick={() => { deleteItem(index) }}>
                        <CloseIcon />
                    </IconButton> : ''}
                </div>
            )}
        </Draggable>
    )
}

export default MethodItem