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
    MuiFilledInput:{
        root: {
            backgroundColor: palette.secondary.main,
            boxShadow: theme.shadows['2'],
            '&.Mui-focused':{
                backgroundColor: palette.secondary.light
            },
            '&:hover':{
                backgroundColor: palette.secondary.light
            },
            '&:focus':{
                backgroundColor: palette.secondary.main
            },
        },
        underline: {
            '&::before': {
                display: 'none'
            },
            '&::after': {
                display: 'none'
            }
        }
    },
    MuiSelect: {
        root: {
            // '&:focus':{
            //     backgroundColor: `${palette.secondary.main} !important`,
            // }
        },
        filled: {
            height: '36px !important',
            padding: theme.spacing(1),
            boxSizing: 'border-box' as 'border-box',
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