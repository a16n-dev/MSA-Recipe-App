import React, {useContext, useState} from 'react';
import { AuthContext } from './context/Authcontext';
import Home from './views/Home';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import PublicRoute from './components/PublicRoute/PublicRoute';
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Recipe from './views/Recipe';
import RecipeList from './views/RecipeList';
import { makeStyles, Drawer } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  pageContainer: {
    position: 'relative',
    flexGrow: 1,
    margin: theme.spacing(2)
  }
}));

const App = () => {

  const classes = useStyles()

  const {state, dispatch} = useContext(AuthContext);



  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.pageContainer} id={'page-container'}>
      
      <Switch>
        <PrivateRoute exact path={'/dashboard'} component={Dashboard}/>
        <PrivateRoute exact path={'/recipes'} component={RecipeList}/>
        <PrivateRoute exact path={'/recipes/:id'} component={Recipe}/>
        <PrivateRoute exact path={'/user/:id'} component={Recipe}/>
        <PublicRoute path={'/'} component={Home}/>
      </Switch>
      </div>
    </div>
  );
}

export default App;
