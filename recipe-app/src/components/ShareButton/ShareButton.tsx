import React, { useEffect } from 'react'
import TinyURL from 'tinyurl';
import { Button, MenuItem, Menu } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { recipe } from '../../types';
interface ShareButtonProps {
  currentRecipe: recipe
}

const ShareButton = (props: ShareButtonProps) => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { enqueueSnackbar } = useSnackbar();

  const { currentRecipe } = props

  useEffect(() => {
    const script = document.createElement('script');
  
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.crossOrigin = 'anonymous'
    script.defer = true
  
    document.body.appendChild(script);
  
    (window as any).fbAsyncInit = function() {
      (window as any).FB.init({
        appId            : '2819298801632743',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v8.0'
      });
    }

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (currentRecipe.isPublic) {
      setAnchorEl(event.currentTarget);
    } else {
      enqueueSnackbar('You must make a recipe public to share it', { variant: 'error' })
    }

  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGetShareableLink = () => {
    handleClose()
    TinyURL.shorten(`http://braize.azurewebsites.net/explore/recipes/${currentRecipe._id}`).then(function (res: any) {
      navigator.clipboard.writeText(res).then(function() {
        console.log('Async: Copying to clipboard was successful!');
        enqueueSnackbar('Link copied to clipboard', {variant: 'success'})
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
      console.log(res)
    }, function (err: any) {
      console.log(err)
    })
  }

  const handleShareToFacebook = () => {
    handleClose();

    // const url = `http://${window.location.host}/explore/recipes/${currentRecipe._id}`

    (window as any).FB.ui({
      method: 'share',
      href: `http://braize.azurewebsites.net/explore/recipes/${currentRecipe._id}`
    }, function (response: any) { });
  }


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
        <MenuItem onClick={handleGetShareableLink}>Get shareable link</MenuItem>
        <MenuItem onClick={handleShareToFacebook}>Share via facebook</MenuItem>
      </Menu>
      </>
  )
}

export default ShareButton