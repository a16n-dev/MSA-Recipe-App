import React from 'react'

import { Button, MenuItem, Menu } from '@material-ui/core';

interface ShareButtonProps {

}

const ShareButton = (props: ShareButtonProps) => {

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