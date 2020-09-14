import React, { useState, ChangeEvent } from 'react'
import { makeStyles, IconButton } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd'
import DragHandleIcon from '@material-ui/icons/DragHandle';
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: '40px',
        borderBottom: '1px solid #aaa',
        boxSizing: 'border-box',
        userSelect: 'none',
        background: 'white'
    },
    dragHandle: {
        width: '40px',
        padding: '8px',
        // background: 'black',
    },
    input: {
        flexGrow: 1,
        border: 'none',
        outline: 'none'
    }

}));

interface IngredientItemProps {
    value: string
    index: number
    deleteItem: (index: number) => void
    onChange: (e: ChangeEvent<HTMLInputElement>, i: number) => void
}

const IngredientItem = (props: IngredientItemProps) => {

    const classes = useStyles()
    const [hover, setHover] = useState<boolean>(false)

    const { value, index, deleteItem, onChange } = props

    return (
        <Draggable draggableId={value + index} key={index.toString()} index={index}>
            {(provided, snapshot) => (
                <div className={classes.root} ref={provided.innerRef} {...provided.draggableProps} onMouseOver={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}}>
                    <div
                        {...provided.dragHandleProps}
                        className={classes.dragHandle}
                    >
                        <DragHandleIcon/>
                    </div>
                    <input className={classes.input} value={value} placeholder={'new ingredient'} onChange={(e: ChangeEvent<HTMLInputElement>) => {onChange(e, index)}}></input>
                    {hover && value !== '' ? <IconButton onClick={()=>{deleteItem(index)}}>
                        <CloseIcon color={'secondary'}/>
                    </IconButton> : ''}
                </div>
            )}
        </Draggable>
    )
}

export default IngredientItem