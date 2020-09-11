import React, { useState} from 'react'

import { makeStyles, IconButton, TextareaAutosize, Typography, Button, MenuItem, Menu } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {

    },

}));

interface ShareButtonProps {

}

const ShareButton = (props: ShareButtonProps) => {

    const classes = useStyles()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
        setAnchorEl(null);
      };
    

    return (
      <>
        <Button onClick={handleClick} variant={'contained'} color={'secondary'} aria-controls="simple-menu" aria-haspopup="true">
            Share
        </Button>
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Get shareable link</MenuItem>
        <MenuItem onClick={handleClose}>Share via email</MenuItem>
        <MenuItem onClick={handleClose}>Share via messenger</MenuItem>
        <MenuItem onClick={handleClose}>Share via facebook</MenuItem>
      </Menu>
      </>
    )
}

export default ShareButton