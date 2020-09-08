import React, {useContext} from 'react';
import { AuthContext } from './context/Authcontext';
import Home from './views/home';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './views/dashboard';
import PublicRoute from './components/PublicRoute/PublicRoute';
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const App = () => {

  const {state, dispatch} = useContext(AuthContext);

  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <PrivateRoute exact path={'/dashboard'} component={Dashboard}/>
        <PublicRoute exact path={'/'} component={Home}/>
      </Switch>
    </div>
  );
}

export default App;
