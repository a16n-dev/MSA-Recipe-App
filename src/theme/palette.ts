import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme()

const palette = {
    ...theme.palette,
    secondary: {

        light: '#46474a',
        main: '#313336',
        dark: '#27292b'
    }
}

console.log(palette);

export default palette