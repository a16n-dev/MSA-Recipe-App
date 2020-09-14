import React from 'react'
import { makeStyles, Typography, Divider, Grid, Hidden, Tooltip, IconButton } from '@material-ui/core';
import { recipe } from '../../types';
import IngredientList from '../IngredientList/IngredientList';
import MethodList from '../MethodList/MethodList';
import AccessTimeSharpIcon from '@material-ui/icons/AccessTimeSharp';
import PeopleAltSharpIcon from '@material-ui/icons/PeopleAltSharp';
import ShareButton from '../ShareButton/ShareButton';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import { useHistory } from 'react-router-dom';

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
    image: {
        justifySelf: 'center',
        width: '160px',
        height: '160px',
        gridRow: '1 / 3',
        [theme.breakpoints.down('xs')]: {
            gridRow: '1 / 2',
        },
        boxShadow: theme.shadows['2']
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
        alignItems: 'stretch',
        [theme.breakpoints.down('xs')]: {
            gridRow: '3 / 4',
            gridColumn: '1 / 2',
        },
    },
    infoItem: {
        display: 'flex',
        width: '120px',
        [theme.breakpoints.down('xs')]: {
            width: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
        },

        marginTop: '4px'
    },
    sectionHeader: {
        marginBottom: theme.spacing(3)
    },
    backButton: {
        position: 'absolute',
        top: theme.spacing(4),
        left: -32,
        [theme.breakpoints.down('xs')]: {
            left: 16
        },
    }

}));

interface RecipePublicViewProps {
    currentRecipe: recipe
}

const RecipePublicView = (props: RecipePublicViewProps) => {
    const classes = useStyles()

    const { currentRecipe } = props
    const history = useHistory()

    //Show recipe view
    return (
        <div className={classes.root}>
            <Tooltip title="Back">
                <IconButton color={'secondary'} className={classes.backButton} onClick={()=>history.push('/recipes')}><ArrowBackSharpIcon/></IconButton>
            </Tooltip>
            <div className={classes.header}>
                <img className={classes.image} alt={currentRecipe.name} src={`${process.env.REACT_APP_API_URL}/recipe/${currentRecipe._id}/image`}></img>
                <div className={classes.titleBox}>
                    <Typography variant={'h3'}>
                        {currentRecipe.name}
                    </Typography>
                    <Typography variant={'h5'}>{currentRecipe.authorName}</Typography>
                </div>
                <div className={classes.infoBox}>
                    <div className={classes.infoItem}>
                        <Typography><AccessTimeSharpIcon fontSize={'inherit'} /> {currentRecipe.prepTime}</Typography>
                    </div>
                    <div className={classes.infoItem}>
    <Typography><PeopleAltSharpIcon fontSize={'inherit'} /> {currentRecipe.servings} Serving{+currentRecipe.servings > 1 ? 's' : ''}</Typography>
                    </div>
                </div>
                <div className={classes.buttonBar}>
                    <ShareButton currentRecipe={currentRecipe}/>
                </div>
            </div>
            <Grid container alignContent='stretch' className={classes.detailContainer}>
                <Grid item xs={12} sm={3} md={2} className={classes.gridItem}>
                    <Typography variant={'h5'} className={classes.sectionHeader}>Ingredients</Typography>
                    <IngredientList ingredients={currentRecipe.ingredients} />
                </Grid>

                <Hidden smUp>
                    <Divider className={classes.divider} />
                </Hidden>

                <Grid item container xs={12} sm={9} md={10}>
                    <Hidden xsDown>
                        <Divider orientation="vertical" flexItem />
                    </Hidden>

                    <Grid item xs className={classes.gridItem}>
                        <Typography variant={'h5'} className={classes.sectionHeader}>Method</Typography>
                        <MethodList method={currentRecipe.method} />
                    </Grid>
                </Grid>
            </Grid>
        </div>

    )
}

export default RecipePublicView