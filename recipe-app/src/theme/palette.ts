import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme()

const palette = {
    ...theme.palette,
    primary: {
        light: '#E8B87C',
        main: '#CE8250',
        dark: '#8E6553',
    },
    secondary: {
        light: '#46474a',
        main: '#313336',
        dark: '#27292b'
    },
    background: {
        default: '#eee'
    }
}

console.log(palette);

export default palette