import React, { useState, ChangeEvent } from 'react'
import { makeStyles, IconButton } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        display: 'flex',
        height: '40px',
        boxSizing: 'border-box',
        userSelect: 'none',
        background: 'white',
        marginBottom: theme.spacing(1),
        boxShadow: theme.shadows['2']
    },
    dragHandle: {
        marginRight: theme.spacing(1),
        padding: '10px 4px',
        '&:hover': {
            backgroundColor: theme.palette.grey['100']
        },
        '&:active': {
            backgroundColor: theme.palette.grey['100']
        }
    },
    input: {
        flexGrow: 1,
        border: 'none',
        outline: 'none'
    },
    handleIcon: {
        color: theme.palette.grey['400'],
        height: '20px'
    },
    deleteButton: {
        width: '40px',
        height: '40px',
        padding: '10px',
        position: 'absolute',
        right: 0
    }

}));

interface IngredientItemProps {
    value: string
    index: number
    deleteItem: (index: number) => void
    onChange: (e: ChangeEvent<HTMLInputElement>, i: number) => void
    onEnter: () => void
    onPrevious: () => void
}

const IngredientItem = (props: IngredientItemProps) => {

    const classes = useStyles()
    const [hover, setHover] = useState<boolean>(false)

    const { value, index, deleteItem, onChange, onEnter, onPrevious } = props

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.keyCode === 13 || e.keyCode === 40){
            onEnter()
        } else if (e.keyCode === 38){
            onPrevious()
        }
    }

    return (
        <Draggable draggableId={value + index} key={index.toString()} index={index}>
            {(provided, snapshot) => (
                <div className={classes.root} ref={provided.innerRef} {...provided.draggableProps} onMouseOver={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}}>
                    <div
                        {...provided.dragHandleProps}
                        className={classes.dragHandle}
                    >
                        <DragIndicatorIcon className={classes.handleIcon}/>
                    </div>
                    <input className={classes.input} onKeyUp={handleEnter} value={value} id={`ingredient${index}`} placeholder={'new ingredient'} tabIndex={100 + index} onChange={(e: ChangeEvent<HTMLInputElement>) => {onChange(e, index)}}></input>
                    {hover && value !== '' ? <IconButton className={classes.deleteButton} onClick={()=>{deleteItem(index)}}>
                        <CloseIcon color={'secondary'}/>
                    </IconButton> : ''}
                </div>
            )}
        </Draggable>
    )
}

export default IngredientItem