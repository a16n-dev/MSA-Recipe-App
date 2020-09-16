import React, { useContext } from 'react';
import Home from './views/Home';
import { Switch, Route } from 'react-router-dom';
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
import PublicRecipe from './views/PublicRecipe'
import RecipeListSaved from './views/RecipeListSaved';
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
                  localStorage.setItem('user',JSON.stringify(res.data))
                        dispatch({
                            type: Types.Login,
                            payload: {
                                token: idTokenResult.token,
                                user: res.data
                            }
                        })
              }
          }).catch((err) => {
              console.log('error!');
          });
    }
})

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.pageContainer} id={'page-container'}>
      
      <Switch>
        <PrivateRoute exact path={'/settings'} component={Settings}/>
        <PrivateRoute exact path={'/explore/saved'} component={RecipeListSaved}/>
        <PrivateRoute exact path={'/recipes'} component={RecipeList}/>
        <PrivateRoute exact path={'/recipes/:id'} component={Recipe}/>
        <Route exact path={'/user/:id'} component={Profile}/>
        <Route exact path={'/explore/recipes/:id'} component={PublicRecipe}/>
        <PublicRoute path={'/'} component={Home}/>
      </Switch>
      </div>
    </div>
  );
}

export default App;
