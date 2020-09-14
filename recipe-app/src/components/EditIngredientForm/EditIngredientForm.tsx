import React, {  ChangeEvent, useEffect } from 'react'
import { makeStyles } from '@material-ui/core';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import IngredientItem from './IngredientItem';
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    }
}));

interface EditIngredientFormProps {
    ingredients: string[]
    setIngredients: React.Dispatch<React.SetStateAction<string[]>>
}

const EditIngredientForm = (props: EditIngredientFormProps) => {

    const classes = useStyles()

    const {ingredients: listItems, setIngredients: setListItems} = props

    useEffect(()=>{
        console.log(listItems);
        if(listItems[listItems.length-1] !== ''){
            const arr: any[] = Array.from(listItems)
            arr.push('')
            setListItems(arr)
        }
        if(listItems.indexOf('') !== -1 && listItems.indexOf('') !== listItems.length - 1){
            const arr: any[] = Array.from(listItems)
            arr.splice(listItems.indexOf(''), 1)
            setListItems(arr)
        }
    },[listItems, setListItems])

    const handleChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
        console.log(e.target.value);
        const mut: any[] = Array.from(listItems);
        mut[i] = e.target.value
        setListItems(mut)
    }

    const deleteItem = (index: number) => {
        console.log(`deleting ${index}`);
        const arr: any[] = Array.from(listItems)
        arr.splice(index, 1);
        setListItems(arr)
    }

    const reorder = (list: Iterable<unknown> | ArrayLike<unknown>, startIndex: number, endIndex: number) => {
        const result: any[] = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = (result: any) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            listItems,
            result.source.index,
            result.destination.index
        );

        setListItems(items)
    }

    return (


            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable" >
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{height: `${listItems.length * 40}px`}}
                            className={classes.root}
                        >
                            {listItems.map((e, i) => (<IngredientItem onChange={handleChange} deleteItem={deleteItem} value={e} key={i} index={i} />))}
                        </div>
                    )}
                    
                </Droppable>
            </DragDropContext>
            
    )
}

export default EditIngredientForm