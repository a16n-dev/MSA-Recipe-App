import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import shadows from './shadows'
import overrides from './overrides'
import palette from './palette'
import breakpoints from './breakpoints'

const themeDef = {
    shape: {
        borderRadius: 0
    },
    shadows,
    palette,
    typography: {
        button: {
            color: 'white'
        },
        h3: {
            fontWeight: 200
        },
        h5: {
            fontWeight: 100
        },
        h6: {
            fontWeight: 100
        }
    },
    overrides,
    breakpoints
}


let theme = createMuiTheme(themeDef)

export default responsiveFontSizes(theme)