import palette from './palette'

import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme()

export default {

    MuiButton: {
        root: {
            '& + button': {
                marginLeft: theme.spacing(2)
            }
        },
        containedSecondary: {
            boxShadow: 'none',
            '&:hover': {
                backgroundColor: palette.secondary.light
            }
        },
        outlined: {
            border: `1px solid ${palette.grey['500']}`,
            color: palette.background.default,
            '&:hover': {
                backgroundColor: palette.secondary.light
            }
        }
    },
    MuiMenu: {
        paper: {
            backgroundColor: palette.secondary.main
        },
        list: {
            color: palette.background.default,
            '& > li:hover': {
                background: palette.secondary.light
            }
        }
    }
}