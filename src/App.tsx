import React, {useContext, useEffect} from 'react';
import { AuthContext } from './context/Authcontext';
import Home from './views/home';

const App = () => {

  const {state, dispatch} = useContext(AuthContext);

  
  useEffect(() => {
    console.log(state);
  }, [state])

  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;
