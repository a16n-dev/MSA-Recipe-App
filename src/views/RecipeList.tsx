import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/Authcontext';
import { recipe } from '../types';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { makeStyles, Card, Grid, CardContent, Typography, Button, Select, MenuItem, IconButton, FormLabel, Tooltip } from '@material-ui/core';
import Loading from '../components/Loading/Loading';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import SearchBar from '../components/SearchBar/SearchBar';
import ArrowDropDownSharpIcon from '@material-ui/icons/ArrowDropDownSharp';
import ArrowDropUpSharpIcon from '@material-ui/icons/ArrowDropUpSharp';
import Spacer from '../components/Spacer';
import { sortByName, sortByModified, sortByCreated } from '../util/recipeSorting';
enum Sort {
    name,
    modified,
    created,
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
        margin: '0 5%',
        display: 'grid',
        gridTemplateRows: 'minmax(0, min-content) minmax(0, min-content) auto minmax(0, min-content)',
        padding: theme.spacing(3),
        rowGap: `${theme.spacing(2)}px`,
        position: 'absolute',
        top: 0,
        bottom: 0,
    },
    controlBar: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            alignItems: 'center',

        }
    },
    controlGroup: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            marginBottom: theme.spacing(2)
        }
    },
    resultsContainer: {
        overflowY: 'scroll',
    },
    results: {
        justifyItems: 'center',
        rowGap: `${theme.spacing(2)}px`,
        columnGap: theme.spacing(2),
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: 'auto',
        }
    },
    pageControls: {

    },
    label: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        lineHeight: '36px',
    }
}));

interface RecipeListProps {

}

const RecipeList = (props: RecipeListProps) => {

    const classes = useStyles()

    const { state } = useContext(AuthContext)

    const [recipes, setRecipes] = useState<recipe[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const [pageAmount, setPageAmount] = useState<number>(10)
    const [query, setQuery] = useState<string>('')
    const [sortedList, setSortedList] = useState<recipe[]>([])
    const [sortMethod, setSortMethod] = useState<Sort>(Sort.name)
    const [sortAsc, setSortAsc] = useState<boolean>(false)


    useEffect(() => {
        // Fetch users recipesv
        console.log(axios.defaults.baseURL);
        axios({
            method: 'get',
            url: '/recipe',
            headers: { authToken: state.token }
        }).then(({ data, ...rest }) => {
            console.log(data);
            setRecipes(data)
        }).catch((err) => {
            console.log('error!');
        }).finally(() => {
            setLoading(false)
        });
    }, [state.token])

    useEffect(()=>{
        let arr: any;
        switch(sortMethod){
            case Sort.name:
                arr = sortByName(recipes)
                break;
            case Sort.modified:
                arr = sortByModified(recipes)
                break;
            case Sort.created:
                arr = sortByCreated(recipes)
                break;
            default:
                arr = recipes
                break;
        }

        // Reverse order if needed
        if(sortAsc) {
            setSortedList(arr.reverse())
        } else {
            setSortedList(arr)
        }
    },[recipes, sortAsc, sortMethod])

    if (loading) {
        return (<Loading />)
    }

    if (recipes.length === 0) {
        return (<h1>No recipes found</h1>)
    }

    return (
        <div className={classes.root}>
            <Typography variant={'h4'}>My Recipes</Typography>
            <div className={classes.controlBar}>
            <Spacer expand/>
            <div className={classes.controlGroup}>
                <FormLabel className={classes.label}>Sorting</FormLabel>
                <Select
                    variant={'filled'}
                    value={sortMethod}
                    onChange={(event: React.ChangeEvent<{ value: unknown; }>) => { setSortMethod(event.target.value as Sort) }}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    MenuProps={{
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left"
                        },
                        transformOrigin: {
                            vertical: "top",
                            horizontal: "left"
                        },
                        getContentAnchorEl: null
                    }}
                >
                    <MenuItem value={Sort.name}>Name</MenuItem>
                    <MenuItem value={Sort.created}>Time Created</MenuItem>
                    <MenuItem value={Sort.modified}>Time Modified</MenuItem>
                </Select>
                <Spacer gap={1}/>
                <Tooltip title={sortAsc ? 'Sort Descending' : 'Sort Ascending'}>
                    
                <IconButton size={'small'} onClick={() => { setSortAsc(!sortAsc) }} style={{ width: '36px' }} color={'secondary'}>{sortAsc ? <ArrowDropUpSharpIcon /> : <ArrowDropDownSharpIcon />}</IconButton>
                </Tooltip>
                </div>
                <Spacer gap={8}/>
                <SearchBar query={query} setQuery={setQuery} />
            </div>
            <div className={classes.resultsContainer}>
                <div className={classes.results}>
                    {sortedList.length > 0 ? (
                    sortedList.filter((v, i) => {
                        return v.name.toLowerCase().includes(query)
                    }).length > 0 ? sortedList.filter((v, i) => {
                        return v.name.toLowerCase().includes(query)
                    }).map(e => (
                        <RecipeCard recipe={e} />
                    )) : 'Try something esle') : 'No recipes'}
                    
                </div>
            </div>
            <div className={classes.pageControls}>
                <Button variant={'contained'} color={'secondary'}>Test</Button>
            </div>

        </div>
    )
}

export default RecipeList