import React, { useState, useEffect } from 'react'
import { makeStyles, Typography, Divider, Grid, Button } from '@material-ui/core';
import EditIngredientForm from '../EditIngredientForm/EditIngredientForm';
import EditMethodForm from '../EditMethodForm/EditMethodForm';
import EditTitleForm from '../EditTitleForm/EditTitleForm';
import NoteBar from '../NoteBar/NoteBar';
import { recipe, note } from '../../types';
import { useSnackbar } from 'notistack';
import AccessTimeSharpIcon from '@material-ui/icons/AccessTimeSharp';
import PeopleAltSharpIcon from '@material-ui/icons/PeopleAltSharp';
import ShareButton from '../ShareButton/ShareButton';


const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        display: 'grid',
        gridTemplateRows: 'min-content auto',
        width: '90%',
        margin: '0 5%',
        padding: theme.spacing(2),
    },
    detailContainer: {
        minHeight: 0,
    },
    header: {
        display: 'grid',
        columnGap: theme.spacing(2),
        gridTemplateRows: 'auto auto',
        gridTemplateColumns: '150px auto auto',
        height: '160px',
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center'
        },
        marginBottom: '20px'
    },
    gridItem: {
        padding: theme.spacing(1),
        height: '100%',
        overflowY: 'auto'  
    },
    author: {
        color: '#aaa'
    },
    image: {
        width: '150px',
        height: '150px',
        gridRow: '1 / 3'
    },
    buttonBar: {
        gridColumn: '3 / 4',
        gridRow: '1 / 2',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    titleBox: {
        gridRow: '1 / 2',
        gridColumn: '2 / 3'
    },
    infoBox: {
        gridRow: '2 / 3',
        gridColumn: '2 / 3'
    },
    sectionHeader: {
        marginBottom: theme.spacing(3)
    }

}));

interface RecipeEditViewProps {
    currentRecipe: recipe
    setCurrentRecipe: React.Dispatch<React.SetStateAction<recipe | undefined>>
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const RecipeEditView = (props: RecipeEditViewProps) => {
    const classes = useStyles()

    const { enqueueSnackbar } = useSnackbar();


    const [name, setName] = useState<string>('')
    const [ingredients, setIngredients] = useState<string[]>([])
    const [method, setMethod] = useState<string[]>([])
    const [notes, setNotes] = useState<note[]>([])
    const [error, setError] = useState({
        name: false,
        ingredients: false,
        method: false
    })


    const { currentRecipe, setCurrentRecipe, setEdit } = props

    useEffect(()=>{
        //set state
        setName(currentRecipe.name)
        setIngredients(currentRecipe.ingredients)
        setMethod(currentRecipe.method)
        setNotes(currentRecipe.notes)
    },[currentRecipe])

    const handleDiscardEdits = () => {
        setEdit(false)
    }

    const handleSubmitEdits = (e: any) => {
        const saveMethod: string[] = Array.from(method)
        const saveIngredients: string[] = Array.from(ingredients)
        setError({
            name: false,
            ingredients: false,
            method: false
        })
        //Check valid
        if(name === ''){
            setError({...error, name: true})
            enqueueSnackbar('Recipe name cannot be empty', {variant: 'error'})
        } else if (saveIngredients.length <= 1) {
            setError({...error, ingredients: true})
            enqueueSnackbar('Recipe must have at least one ingredient', {variant: 'error'})
        } else if (saveMethod.length <= 1) {
            setError({...error, method: true})
            enqueueSnackbar('Recipe must have at least one step', {variant: 'error'})
        } else {
            setEdit(false)
            enqueueSnackbar('Changes saved', {variant: 'success'})
            saveMethod.pop()
            saveIngredients.pop()

            setCurrentRecipe({
                ...currentRecipe,
                name,
                ingredients: saveIngredients,
                method: saveMethod,
                notes
            })
        }


        
        
        // Send request -> patch if existing and post if new recipe


        // Set state

        // If use was creating new recipe redirect them to the correct recipe page
    }

    //Show recipe view
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <img className={classes.image}></img>
                <div className={classes.titleBox}>
                    <EditTitleForm title={name} setTitle={setName} error={error.name}/>
                    <Typography className={classes.author} variant={'h4'}>{currentRecipe.authorName}</Typography>
                </div>
                <div className={classes.infoBox}>
                    <Typography><AccessTimeSharpIcon fontSize={'inherit'} /> Prep time</Typography>
                    <Typography><PeopleAltSharpIcon fontSize={'inherit'} /> Servings</Typography>
                </div>
                <div className={classes.buttonBar}>
                <Button variant={'contained'} color={'secondary'} onClick={handleSubmitEdits}>Save changes</Button>
                <Button variant={'contained'} color={'secondary'} onClick={handleDiscardEdits}>Discard Changes</Button>
                </div>
            </div>
            <Grid container alignContent='stretch' className={classes.detailContainer}>
                
                <Grid item xs={12} sm={3} md={2} className={classes.gridItem}>
                <Typography variant={'h5'} className={classes.sectionHeader}>Ingredients</Typography>
                    <EditIngredientForm ingredients={ingredients} setIngredients={setIngredients}/>
                </Grid>

                <Grid container item xs={12} sm={9} md={10} lg={8}>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs className={classes.gridItem}>
                    <Typography variant={'h5'} className={classes.sectionHeader}>Method</Typography>
                    <EditMethodForm method={method} setMethod={setMethod}/>
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                </Grid>

                <Grid item xs={12} lg={2} className={classes.gridItem}>
                <Typography variant={'h5'} className={classes.sectionHeader}>Notes</Typography>
                    <NoteBar/>
                </Grid>

            </Grid>
        </div>

    )
}

export default RecipeEditView