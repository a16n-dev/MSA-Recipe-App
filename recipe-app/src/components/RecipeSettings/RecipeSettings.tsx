import React from 'react'
import { makeStyles, Typography, FormControlLabel, Switch, Tooltip} from '@material-ui/core';
import WarningSharpIcon from '@material-ui/icons/WarningSharp';
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        // background: 'blue',
        [theme.breakpoints.down('md')]: {
            alignContent: 'stretch',
            flexWrap: 'wrap'
        },
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            height: 'min-content',
        }
    },
    tileBar: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(3)
    }
}));

interface RecipeSettingsProps {
    isPublic: boolean
    setIsPublic: React.Dispatch<React.SetStateAction<boolean>>
}

const RecipeSettings = (props: RecipeSettingsProps) => {

    const classes = useStyles()

    const {isPublic, setIsPublic} = props

    const handlePublicChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setIsPublic(checked)
    }

    return (
        <div className={classes.root}>
            <div className={classes.tileBar}>
                <Typography variant={'h5'} >Settings</Typography>
            </div>
            <Typography variant={'body2'}>Public</Typography>
            <Tooltip title={'This will allow other people to see your recipe'}>
            <FormControlLabel
        control={
          <Switch
            checked={isPublic}
            onChange={handlePublicChange}
            name="checkedB"
            color="primary"
          />
        }
        label={isPublic? <>Public <WarningSharpIcon fontSize={'inherit'}/></> : 'Private'}
      />
</Tooltip>
        </div>
    )
}

export default RecipeSettings