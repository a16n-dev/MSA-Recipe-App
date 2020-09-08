import React, {useContext} from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import { AuthContext } from '../../context/Authcontext';

const useStyles = createUseStyles(theme => ({
    root: {

    }
}));

interface %NAME%Props {

}

const %NAME% = (props: %NAME%Props) => {
    const theme = useTheme()
    const classes = useStyles({ ...props, theme })

    const {state, dispatch} = useContext(AuthContext)

    return (
        <div className={classes.root}>
        </div>
    )
}

export default %NAME%