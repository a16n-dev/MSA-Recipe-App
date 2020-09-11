import React, { useContext } from 'react'
import { AuthContext } from '../../context/Authcontext';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import Loading from '../Loading/Loading';

/*
Private route which will redirect the user to the home page if they are not authenticated.
TODO: Add a proper loading animation component
*/
const PrivateRoute = ({component: Component, ...rest}: RouteProps) => {
    
    const { state } = useContext(AuthContext);

    // If no component was specified
    if (!Component) return null;

    // Show a loading component until auth is resolved

    if (state.loading) {
        return (<Loading/>)
    }

    return (
        <Route {...rest} render={props => (
            state.user !== null ?
                <Component {...props}/>
                : <Redirect to="/" />
        )} />
    )
}

export default PrivateRoute