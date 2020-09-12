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
            '&:hover': {
                backgroundColor: palette.secondary.light,
                color: palette.primary.light
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
    },
    MuiDrawer: {
        paper: {
            backgroundColor: palette.secondary.main
        }
    },
    MuiList: {
        root: {
            color: palette.background.default,
        }
    },
    MuiListItem: {
        button: {
            fontSize: theme.typography.h6.fontSize,
            fontWeight: 100,
            justifyContent: 'center',
            textAlign: 'center' as 'center',
            marginBottom: theme.spacing(1),
            marginTop: theme.spacing(1),
        }
    },
    MuiIconButton: {
        colorSecondary: {
            borderRadius: 0,
            backgroundColor: palette.secondary.main,
            color: palette.background.default,
            '&:hover': {
                backgroundColor: palette.secondary.light
            },
            '&:focus': {
                backgroundColor: palette.secondary.light
            },
            boxShadow: theme.shadows['2']
        }
    },
    MuiSelect: {
        root: {
            // '&:focus':{
            //     backgroundColor: `${palette.secondary.main} !important`,
            // }
        },
        filled: {
            boxShadow: theme.shadows['2'],
            minWidth: 150,
            height: '36px !important',
            padding: theme.spacing(1),
            boxSizing: 'border-box' as 'border-box',
            background: palette.secondary.main,
            color: palette.background.default,
            '&:hover':{
                backgroundColor: palette.secondary.light
            },
            '&:focus':{
                backgroundColor: palette.secondary.main
            },
        },
        iconFilled: {
            color: palette.background.default
        },
    }
}