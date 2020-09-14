import React from 'react'

import { makeStyles, Grid, Card, CardContent, Typography, CardHeader, Divider } from '@material-ui/core';

import bgImg from '../resource/img/background.jpg'
import Logo from '../components/Logo/Logo';
import GoogleLogin from '../components/SocialButton/GoogleLogin';
import FacebookLogin from '../components/SocialButton/FacebookLogin';
import MicrosoftLogin from '../components/SocialButton/MicrosoftLogin';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        paddingTop: '10%',
        paddingLeft: '10%',
        paddingRight: '15%',
        [theme.breakpoints.down('sm')]: {
            paddingRight: '10%',
        }
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: -100,
        background: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.4)',
        transform: 'scale(1.1)',
        [theme.breakpoints.down('sm')]: {
            // backgroundPosition: '40% 20%',
            transform: 'scaleY(-1)'
        }
    },
    titleBox: {
        color: 'white',
        maxWidth: '30vw',
        [theme.breakpoints.down('sm')]: {
            maxWidth: 'initial',
        }
    },
    logo: {
        marginBottom: theme.spacing(4),
        height: '100px',
        [theme.breakpoints.down('sm')]: {
            height: 'initial',
            width: '100%',
            marginTop: theme.spacing(6)
        }
    },
    socialBox: {
        marginTop: theme.spacing(8),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    }
}));

interface homeProps {

}

const Home = (props: homeProps) => {
    const classes = useStyles()



    return (
        <Grid container className={classes.root} alignItems='flex-start' justify='space-around'>
            <div className={classes.backgroundImage}></div>
            <Grid item xs={12} md={9}>
                <div className={classes.titleBox}>
                    <div className={classes.logo}>
                        <Logo />
                    </div>

                    <Typography variant='body1'>Create and share your favourite recipes. more placeholder text and stuff</Typography>
                </div>
            </Grid>
            <Grid item xs={12} md={3}>
                <Card className={classes.socialBox}>
                    <CardHeader title={'Login'} ></CardHeader>
                    <Divider />
                    <CardContent>
                        <Grid container direction='column' spacing={2}>
                            <Grid item>
                                <GoogleLogin/>
                            </Grid>
                            {/* <Divider /> */}
                            <Grid item>
                            <FacebookLogin/>
                            </Grid>
                            {/* <Divider /> */}
                            <Grid item>
                            <MicrosoftLogin/>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Home