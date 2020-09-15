import React, { useContext, useState, useRef } from 'react'

import { makeStyles, Grid, Button, } from '@material-ui/core';
import Axios from 'axios';
import { AuthContext } from '../../context/Authcontext';
import PublishIcon from '@material-ui/icons/Publish';
import { useSnackbar } from 'notistack';
import { Types } from '../../context/auth';

const useStyles = makeStyles(theme => ({
    image: {
        justifySelf: 'center',
        position: 'relative',
        width: '160px',
        height: '160px',
        boxShadow: theme.shadows['2'],
    },
    input: {
        zIndex: -500,
        width: 0,
        height: 0,
        position: "absolute",
        top: 0,
        left: 0
    },
    label: {
        width: '100%',
        height: 'min-content'
    }
}));

interface UserImageFormProps {
}

const UserImageForm = (props: UserImageFormProps) => {

    const classes = useStyles()

    const { state, dispatch } = useContext(AuthContext)
    const [hash, setHash] = useState<number>(0)
    const { enqueueSnackbar } = useSnackbar();

    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value)

        if(e.target.files){
            const file = e.target.files[0]
            let formData = new FormData()
            formData.append('image',file)

            Axios({
                method: 'post',
                url: `/user/image`,
                headers: {authToken: state.token},
                data: formData
            }).then((result) => {
                console.log(result)
                enqueueSnackbar('Successfully updated image', { variant: 'success' })
                setHash(Date.now())
                dispatch({
                    type: Types.Update,
                    payload: {
                        user: {
                            ...state.user,
                            profileUrl: result.data.url
                        }
                    }
                })
            }).catch((err) => {
                enqueueSnackbar(err.response.data.error, { variant: 'error' })
            });
        }
    }

    const handleDeleteImage = () => {
        Axios({
            method: 'delete',
            url: `/user/image`,
            headers: {authToken: state.token},
        }).then((result) => {
            console.log(result)
            enqueueSnackbar('Successfully updated image', { variant: 'success' })
            setHash(Date.now())
            dispatch({
                type: Types.Update,
                payload: {
                    user: {
                        ...state.user,
                        profileUrl: result.data.url
                    }
                }
            })
        }).catch((err) => {
            enqueueSnackbar(err.response.data.error, { variant: 'error' })
        });
    }

    const handleClick = () => {
        if(inputRef.current !== null) {
            const e = document.createEvent("MouseEvents")
            e.initEvent('click', true, true)
            inputRef.current.dispatchEvent(e)
        }
    }

    return (
        <Grid container wrap={'nowrap'} spacing={2}>
            <Grid item>
                <img src={`${state.user.profileUrl}?${hash}`} className={classes.image} alt={'Recipe'} />
            </Grid>
            <Grid item container direction={'column'} spacing={2}>

                <Grid item>
                        <Button  variant={'contained'} onClick={handleClick}>Upload Image</Button>
                        <input ref={inputRef} type='file' accept="image/*" onChange={handleChange} name={'upload'} className={classes.input}></input>
                </Grid>


                <Grid item>
                    <Button onClick={handleDeleteImage} variant={'contained'} >Reset Image</Button>
                </Grid>
            </Grid>
        </Grid>

    )
}

export default UserImageForm