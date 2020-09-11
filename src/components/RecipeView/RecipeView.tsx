import React, { useState, useEffect } from 'react'
import { makeStyles, Typography, Divider, Grid, Button, Menu, MenuItem } from '@material-ui/core';
import EditIngredientForm from '../EditIngredientForm/EditIngredientForm';
import EditMethodForm from '../EditMethodForm/EditMethodForm';
import EditTitleForm from '../EditTitleForm/EditTitleForm';
import NoteBar from '../NoteBar/NoteBar';
import { recipe, note } from '../../types';
import IngredientList from '../IngredientList/IngredientList';
import MethodList from '../MethodList/MethodList';
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
        gridTemplateColumns: 'min-content auto auto',
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

interface RecipeViewProps {
    currentRecipe: recipe
    setCurrentRecipe: React.Dispatch<React.SetStateAction<recipe | undefined>>
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const RecipeView = (props: RecipeViewProps) => {
    const classes = useStyles()

    const { currentRecipe, setCurrentRecipe, setEdit } = props


    const handleSubmitEdits = (e: any) => {
        setEdit(true)
        e.preventDefault()
        console.log(e);
        console.log(e.target.elements);

        // Send request -> patch if existing and post if new recipe

        // Set state
        setCurrentRecipe({
            ...currentRecipe,
        })
        // If use was creating new recipe redirect them to the correct recipe page
    }

    //Show recipe view
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                {/* <Typography variant={'h3'}>{name}</Typography> */}
                <img className={classes.image} alt={currentRecipe.name}></img>
                <div className={classes.titleBox}>
                    <Typography variant={'h3'}>{currentRecipe.name}</Typography>
                    <Typography variant={'h5'}>{currentRecipe.authorName}</Typography>
                </div>
                <div className={classes.infoBox}>
                    <Typography><AccessTimeSharpIcon fontSize={'inherit'} /> Prep time</Typography>
                    <Typography><PeopleAltSharpIcon fontSize={'inherit'} /> Servings</Typography>
                </div>
                <div className={classes.buttonBar}>
                    <Button onClick={()=>setEdit(true)} variant={'contained'} color={'secondary'}>Edit</Button>
                    <ShareButton/>
                </div>
            </div>
            <Grid container alignContent='stretch' className={classes.detailContainer}>
                <Grid item xs={12} sm={3} md={2} className={classes.gridItem}>
                    <Typography variant={'h5'} className={classes.sectionHeader}>Ingredients</Typography>
                    <IngredientList ingredients={currentRecipe.ingredients} />
                </Grid>

                <Grid item container xs={12} sm={9} md={10} lg={8} >

                    <Divider orientation="vertical" flexItem />
                    <Grid item xs className={classes.gridItem}>
                        <Typography variant={'h5'} className={classes.sectionHeader}>Method</Typography>
                        <MethodList method={currentRecipe.method} />
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

export default RecipeView