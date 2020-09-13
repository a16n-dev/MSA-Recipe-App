import React, { useContext } from 'react';
import Home from './views/Home';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import PublicRoute from './components/PublicRoute/PublicRoute';
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Recipe from './views/Recipe';
import RecipeList from './views/RecipeList';
import { makeStyles } from '@material-ui/core';
import { auth } from './util/firebase';
import axios from 'axios';
import { AuthContext } from './context/Authcontext';
import { Types } from './context/auth';
import Profile from './views/Profile';
import Settings from './views/Settings';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  pageContainer: {
    position: 'relative',
    flexGrow: 1,
  }
}));

const App = () => {

  const classes = useStyles()

  const { dispatch} = useContext(AuthContext);

  auth.getRedirectResult().then(async (result) => {
    const { user } = result;
    if (user) {
        const idTokenResult = await user.getIdTokenResult();

        axios({
            method: 'post',
            url: '/user',
            headers: {authToken: idTokenResult.token}
          }).then((res) => {
            console.log(res);
              if(res.status === 201){
                  console.log('successful db entry created!');
              }
          }).catch((err) => {
              console.log('error!');
          });
          
        // dispatch({
        //     type: Types.Login,
        //     payload: {
        //         email: user.email,
        //         token: idTokenResult.token,
        //         photoUrl: user.photoURL,
        //         name: user.displayName
        //     }
        // });
    }
})

  return (
    <div className={classes.root}>
      {/* <Navbar /> */}
      <div className={classes.pageContainer} id={'page-container'}>
      
      <Switch>
        <PrivateRoute exact path={'/dashboard'} component={Dashboard}/>
        <PrivateRoute exact path={'/settings'} component={Settings}/>
        <PrivateRoute exact path={'/recipes'} component={RecipeList}/>
        <PrivateRoute exact path={'/recipes/:id'} component={Recipe}/>
        <Route exact path={'/user/:id'} component={Profile}/>
        <PublicRoute path={'/'} component={Home}/>
      </Switch>
      </div>
    </div>
  );
}

export default App;
