import React, { useState, useEffect, useContext } from 'react'
import { makeStyles, Typography, Divider, Grid, Button, Hidden, Input } from '@material-ui/core';
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
        padding: theme.spacing(4),
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
            position: 'static',
            top: 'auto',
            bottom: 'auto',
        },
    },
    detailContainer: {
        minHeight: 0,
        [theme.breakpoints.down('xs')]: {
            alignItems: 'stretch',
            flexDirection: 'column'
        },
    },
    divider: {
        [theme.breakpoints.down('xs')]: {
            alignItems: 'stretch',
            flexDirection: 'column'
        },
        marginBottom: '20px'
    },
    header: {
        display: 'grid',
        columnGap: theme.spacing(2),
        gridTemplateRows: 'auto auto',
        gridTemplateColumns: 'min-content auto auto',
        height: '160px',
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
            gridTemplateColumns: 'auto',
            rowGap: `${theme.spacing(2)}px`,
            height: 'min-content',
        },
        marginBottom: '20px'
    },
    gridItem: {
        padding: theme.spacing(1),
        height: '100%',
        overflowY: 'auto',
        [theme.breakpoints.down('xs')]: {
            marginBottom: theme.spacing(4),
            height: 'min-content',
            textAlign: 'left',
        },
        [theme.breakpoints.down('md')]: {
            height: 'min-content',
        }
    },
    author: {
        color: '#aaa'
    },
    buttonBar: {
        gridColumn: '3 / 4',
        gridRow: '1 / 2',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        [theme.breakpoints.down('xs')]: {
            gridRow: '4 / 5',
            gridColumn: '1 / 2',
            justifyContent: 'center',
        },
    },
    titleBox: {
        gridRow: '1 / 2',
        gridColumn: '2 / 3',
        [theme.breakpoints.down('xs')]: {
            gridRow: '2 / 3',
            gridColumn: '1 / 2',
        },
    },
    infoBox: {
        display: 'flex',
        flexDirection: 'column',
        gridRow: '2 / 3',
        gridColumn: '2 / 3',
        [theme.breakpoints.down('xs')]: {
            gridRow: '3 / 4',
            gridColumn: '1 / 2',
        },
    },
    infoItem: {
        display: 'flex',
        width: '120px',
        alignItems: 'center',
        marginTop: '4px'
    },
    sectionHeader: {
        marginBottom: theme.spacing(3)
    },
    inputField: {
        marginLeft: theme.spacing(1),
        flexGrow: 1
    },
    servingInput: {
        width: '20px',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),

        '& > input': {
            textAlign: 'center'
        }
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
    const [prepTime, setPrepTime] = useState<string>('')
    const [servings, setServings] = useState<string>('1')
    
    const [error, setError] = useState({
        name: false,
        ingredients: false,
        method: false,
        prepTime: false,
        servings: false
    })


    const { currentRecipe, setCurrentRecipe, setEdit, isNew } = props

    useEffect(() => {
        //set state
        setName(currentRecipe.name)
        setIngredients(currentRecipe.ingredients)
        setMethod(currentRecipe.method)
        setNotes(currentRecipe.notes)
        setPrepTime(currentRecipe.prepTime)
        setServings(currentRecipe.servings)
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
            method: false,
            prepTime:false,
            servings: false
        })
        //Check valid
        if (name === '') {
            setError({ ...error, name: true })
            enqueueSnackbar('Recipe name cannot be empty', { variant: 'error' })
            return null
        } else if (prepTime === '') {
            setError({ ...error, prepTime: true })
            enqueueSnackbar('Please enter a preparation time', { variant: 'error' })
            return null
        } else if (isNaN(+servings) || servings === '') {
            setError({ ...error, servings: true })
            enqueueSnackbar('Servings must be a number', { variant: 'error' })
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
                notes,
                prepTime,
                servings,
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
            {isNew ?
                ''
            :
                <RecipeImageForm recipeId={currentRecipe._id}/>
            }
                <div className={classes.titleBox}>
                    <EditTitleForm title={name} setTitle={setName} error={error.name} />
                    <Typography className={classes.author} variant={'h4'}>{currentRecipe.authorName}</Typography>
                </div>
                <div className={classes.infoBox}>
                <div className={classes.infoItem}>
                    <AccessTimeSharpIcon fontSize={'inherit'} />
                    <Input error={error.prepTime} className={classes.inputField} value={prepTime} onChange={(e)=>{setPrepTime(e.target.value)}}/>
                </div>
                <div className={classes.infoItem}>
                    <PeopleAltSharpIcon fontSize={'inherit'} />
                    <Input error={error.servings} className={classes.servingInput} type={'string'} value={servings} onChange={(e)=>{setServings(e.target.value)}}/>
                    servings
                 </div>
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
                <Hidden xsDown>
                        <Divider orientation="vertical" flexItem />
                    </Hidden>
                    <Grid item xs className={classes.gridItem}>
                        <Typography variant={'h5'} className={classes.sectionHeader}>Method</Typography>
                        <EditMethodForm method={method} setMethod={setMethod} />
                    </Grid>
                    <Hidden mdDown>
                        <Divider orientation="vertical" flexItem />
                    </Hidden>
                </Grid>

                <Grid item xs={12} lg={2} className={classes.gridItem}>
                    <NoteBar />
                </Grid>

            </Grid>
        </div>

    )
}

export default RecipeEditView