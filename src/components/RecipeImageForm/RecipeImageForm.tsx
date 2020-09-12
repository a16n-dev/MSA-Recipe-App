import React, { useContext, useState } from 'react'

import { makeStyles, } from '@material-ui/core';
import Axios from 'axios';
import { AuthContext } from '../../context/Authcontext';
import PublishIcon from '@material-ui/icons/Publish';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
    root: {
        justifySelf: 'center',
        position: 'relative',
        width: '160px',
        height: '160px',
        gridRow: '1 / 3',
        [theme.breakpoints.down('xs')]: {
            gridRow: '1 / 2',
        },
        boxShadow: theme.shadows['2']
    },
    image: {
        width: '100%',
        height: '100%'
    },
    input: {
        zIndex: -500,
        width: 0,
        height: 0,
        position: "absolute",
        top: 0,
        left: 0
    },
    overlay:{
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        opacity: 0,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.23)',
        cursor: 'pointer',
        '&:hover': {
            opacity: 0.5
        }
    }
}));

interface RecipeImageFormProps {
    recipeId: string
}

const RecipeImageForm = (props: RecipeImageFormProps) => {

    const {recipeId} = props

    const classes = useStyles()

    const {state} = useContext(AuthContext)
    const [hash, setHash] = useState<number>(0)
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value)

        if(e.target.files){
            const file = e.target.files[0]
            let formData = new FormData()
            formData.append('image',file)

            Axios({
                method: 'post',
                url: `/recipe/${recipeId}/image`,
                headers: {authToken: state.token},
                data: formData
            }).then((result) => {
                console.log(result)
                enqueueSnackbar('Successfully updated image', { variant: 'success' })
                setHash(Date.now())
            }).catch((err) => {
                enqueueSnackbar(err.response.data.error, { variant: 'error' })
            });
        }
    }

    return (
        <div className={classes.root}>
            <img src={`http://localhost:8000/recipe/${recipeId}/image?${hash}`} className={classes.image}/>
            <label className={classes.overlay}>
                <PublishIcon className={classes.overlay}/>
                <input type='file' accept="image/*" onChange={handleSubmit} name={'upload'} className={classes.input}></input>
            </label>
            
        </div>

    )
}

export default RecipeImageForm