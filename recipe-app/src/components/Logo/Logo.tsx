import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
    },
    logo: {
        fill: theme.palette.background.default
    }
}))


const Logo = (props: any) => {

    const classes = useStyles()

    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" className={classes.root} viewBox="0 0 321.761 54.742">
            <g id="Group_93" data-name="Group 93" transform="translate(-747.918 -1175.258)">
                <path id="Path_46" data-name="Path 46" className={classes.logo} d="M6.918,0V-54.742H23.085q8.8,0,13.347,3.63t4.549,10.7a12.13,12.13,0,0,1-2.312,7.392,12.627,12.627,0,0,1-6.335,4.5,13.149,13.149,0,0,1,7.689,4.7,13.1,13.1,0,0,1,2.914,8.417q0,7.252-4.681,11.329T25.228,0Zm4.625-26.281V-3.91H25.416q5.94,0,9.418-3.022a10.525,10.525,0,0,0,3.478-8.389,10.159,10.159,0,0,0-3.327-8.014q-3.327-2.946-9.193-2.946Zm0-3.91H24.175q5.79-.113,8.967-2.731t3.177-7.627q0-5.273-3.29-7.778t-9.945-2.5H11.542Zm78.414,7.369h-15.9V0H69.39V-54.742H87.174q8.76,0,13.686,4.244t4.925,11.867a14.817,14.817,0,0,1-3.083,9.275A15.765,15.765,0,0,1,94.43-23.8L108.116-.489V0h-4.925Zm-15.9-3.91H88.227a13.132,13.132,0,0,0,9.362-3.314,11.235,11.235,0,0,0,3.534-8.586q0-5.8-3.685-9T87.1-50.832H74.052Zm89.279,11.354H138.48L132.84,0h-4.85l20.716-54.742h4.4L173.821,0h-4.812Zm-23.423-3.91h21.957L150.887-49.1ZM202.907,0h-4.625V-54.742h4.625ZM324.844-26.243h-25.6V-3.91h29.439V0H294.615V-54.742h33.875v3.91H299.24v20.679h25.6Z" transform="translate(741 1230)" />
                <path id="Path_47" data-name="Path 47" className={classes.logo} d="M263.424-3.91h-33.8V0h39.4V-3.5L236.542-50.832h31.507v-3.91H230.827v3.277Z" transform="translate(741 1230)" />
            </g>
        </svg>

    )
}

export default Logo