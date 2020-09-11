import React, { useState, useEffect, useContext } from 'react'
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
import ConfirmationButton from '../ConfimationButton/ConfirmationButton';
import Axios from 'axios';
import { AuthContext } from '../../context/Authcontext';
import { useHistory } from 'react-router-dom';
import RecipeImageForm from '../RecipeImageForm/RecipeImageForm';


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
        gridTemplateColumns: '160px auto auto',
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
        width: '160px',
        height: '160px',
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
    isNew: boolean
    currentRecipe: recipe
    setCurrentRecipe: (a: recipe) => void
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const RecipeEditView = (props: RecipeEditViewProps) => {
    const classes = useStyles()

    const { enqueueSnackbar } = useSnackbar();

    const { state, dispatch } = useContext(AuthContext);

    const history = useHistory()

    const [name, setName] = useState<string>('')
    const [ingredients, setIngredients] = useState<string[]>([])
    const [method, setMethod] = useState<string[]>([])
    const [notes, setNotes] = useState<note[]>([])
    const [error, setError] = useState({
        name: false,
        ingredients: false,
        method: false
    })


    const { currentRecipe, setCurrentRecipe, setEdit, isNew } = props

    useEffect(() => {
        //set state
        setName(currentRecipe.name)
        setIngredients(currentRecipe.ingredients)
        setMethod(currentRecipe.method)
        setNotes(currentRecipe.notes)
    }, [currentRecipe])

    const handleDiscardEdits = () => {
        setEdit(false)
    }

    const createNewRecipe = () => {

        const res: any = validate()

        Axios({
            method: 'post',
            url: '/recipe',
            headers: {authToken: state.token},
            data: res
        }).then((res) => {
            if(res.status === 201){
                console.log(res);
                history.push(`/recipes/${res.data.id}`)
                setEdit(false)
            }
        }).catch((err) => {
            
        });
    }

    const deleteRecipe = () => {
        Axios({
            method: 'delete',
            url: `/recipe/${currentRecipe._id}`,
            headers: { authToken: state.token }
        }).then((res) => {
            if (res.status === 200) {
                history.push('/recipes')
            }
        }).catch((err) => {
            enqueueSnackbar('Could not delete recipe', { variant: 'error' })
        });
    }

    const validate = () => {
        const saveMethod: string[] = Array.from(method)
        const saveIngredients: string[] = Array.from(ingredients)
        setError({
            name: false,
            ingredients: false,
            method: false
        })
        //Check valid
        if (name === '') {
            setError({ ...error, name: true })
            enqueueSnackbar('Recipe name cannot be empty', { variant: 'error' })
            return null
        } else if (saveIngredients.length <= 1) {
            setError({ ...error, ingredients: true })
            enqueueSnackbar('Recipe must have at least one ingredient', { variant: 'error' })
            return null
        } else if (saveMethod.length <= 1) {
            setError({ ...error, method: true })
            enqueueSnackbar('Recipe must have at least one step', { variant: 'error' })
            return null
        } else {

            saveMethod.pop()
            saveIngredients.pop()

            return {
                name,
                ingredients: saveIngredients,
                method: saveMethod,
                notes
            }
        }
    }

    const handleSubmitEdits = (e: any) => {

        const res: any = validate()

        if (res !== null) {
            setCurrentRecipe({
                ...currentRecipe,
                ...res
            })
            setEdit(false)
        }
       
    }

    //Show recipe view
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <RecipeImageForm recipeId={currentRecipe._id}/>
                <div className={classes.titleBox}>
                    <EditTitleForm title={name} setTitle={setName} error={error.name} />
                    <Typography className={classes.author} variant={'h4'}>{currentRecipe.authorName}</Typography>
                </div>
                <div className={classes.infoBox}>
                    <Typography><AccessTimeSharpIcon fontSize={'inherit'} /> Prep time</Typography>
                    <Typography><PeopleAltSharpIcon fontSize={'inherit'} /> Servings</Typography>
                </div>
                <div className={classes.buttonBar}>
                    {isNew ?
                        <>
                            <Button variant={'contained'} color={'secondary'} onClick={createNewRecipe}>Create Recipe</Button>
                            <ConfirmationButton
                                onClick={() => { history.push('/recipes') }}
                                title={'Discard new recipe?'}
                                message={`Are you sure you want to leave without saving?`}
                                action={'Leave'}
                            >Discard Recipe</ConfirmationButton>
                        </>
                        : <>
                            <Button variant={'contained'} color={'secondary'} onClick={handleSubmitEdits}>Save changes</Button>
                            <Button variant={'contained'} color={'secondary'} onClick={handleDiscardEdits}>Discard Changes</Button>
                            <ConfirmationButton
                                onClick={deleteRecipe}
                                title={`Delete ${currentRecipe.name}`}
                                message={`Are you sure you want to delete ${currentRecipe.name}? This cannot be undone`}
                                action={'Delete'}
                            >Delete Recipe</ConfirmationButton>
                        </>
                    }


                </div>
            </div>
            <Grid container alignContent='stretch' className={classes.detailContainer}>

                <Grid item xs={12} sm={3} md={2} className={classes.gridItem}>
                    <Typography variant={'h5'} className={classes.sectionHeader}>Ingredients</Typography>
                    <EditIngredientForm ingredients={ingredients} setIngredients={setIngredients} />
                </Grid>

                <Grid container item xs={12} sm={9} md={10} lg={8}>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs className={classes.gridItem}>
                        <Typography variant={'h5'} className={classes.sectionHeader}>Method</Typography>
                        <EditMethodForm method={method} setMethod={setMethod} />
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                </Grid>

                <Grid item xs={12} lg={2} className={classes.gridItem}>
                    <Typography variant={'h5'} className={classes.sectionHeader}>Notes</Typography>
                    <NoteBar />
                </Grid>

            </Grid>
        </div>

    )
}

export default RecipeEditView