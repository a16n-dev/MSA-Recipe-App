import React, { useState, useEffect, } from 'react'
import { makeStyles, Typography, Tooltip, IconButton } from '@material-ui/core';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Note from './Note';
import { note } from '../../types'
import { v4 as uuidv4 } from 'uuid';
import NoteDialog from './NoteDialog';
import AddSharpIcon from '@material-ui/icons/AddSharp';
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        // background: 'blue',
        [theme.breakpoints.down('md')]: {
            alignContent: 'stretch',
            flexWrap: 'wrap'
        },
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            height: 'min-content',
        }
    },
    tileBar: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(3)
    }
}));

interface NoteBarProps {
    notes: note[]
    setNotes: (notes: note[]) => void
}

const NoteBar = (props: NoteBarProps) => {

    const classes = useStyles()

    const { notes, setNotes } = props

    const [dialog, setDialog] = useState<boolean>(false)
    const [selectedNote, setSelectedNote] = useState<number>(0)
    const [listItems, setListItems] = useState<note[]>([])

    useEffect(() => {
        setListItems(notes)
    }, [notes])

    const deleteItem = (index: number) => {
        console.log(`deleting ${index}`);
        const arr: any[] = Array.from(listItems)
        arr.splice(index, 1);
        setListItems(arr)
        setNotes(arr)
    }

    const reorder = (list: Iterable<unknown> | ArrayLike<unknown>, startIndex: number, endIndex: number) => {
        const result: any[] = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const addNote = () => {
        const id = uuidv4()
        setListItems([...listItems, {
            title: '',
            body: '',
            id
        }])
        editNote(listItems.length)
    }

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

    const editNote = (index: number) => {
        setSelectedNote(index)
        setDialog(true)
    }

    const setNote = (currentNote: note) => {
        const arr = Array.from(listItems)
        arr[selectedNote] = currentNote
        setListItems(arr)
        setNotes(arr)
    }

    return (
        <>
            {dialog ? <NoteDialog currentNote={listItems[selectedNote]} open={dialog} setOpen={setDialog} deleteNote={() => {setDialog(false);deleteItem(selectedNote)}} setNote={setNote} /> : ''}
            <DragDropContext onDragEnd={onDragEnd}>
                <div className={classes.root}>
                    <div className={classes.tileBar}>
                        <Typography variant={'h5'} >Notes</Typography>
                        <Tooltip title="Create new note">
                            <IconButton onClick={addNote} size={'small'} color={'secondary'}><AddSharpIcon /></IconButton>
                        </Tooltip>
                    </div>

                    {listItems.length > 0? <Droppable droppableId="droppable" >
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{ minHeight: `${listItems.length * 40}px` }}
                            >
                                {listItems.map((e, i) => (<Note value={e} index={i} edit={() => editNote(i)} />))}
                            </div>
                        )}
                    </Droppable> : 'No notes for this recipe yet'}
                </div>
            </DragDropContext>
        </>
    )
}

export default NoteBar