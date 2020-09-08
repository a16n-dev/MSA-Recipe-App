import React, { useContext } from 'react'
import { AuthContext } from '../../context/Authcontext';
import { Redirect, Route, RouteProps } from 'react-router-dom';

/*
Pulbic route which will redirect the user to thier dashboard if they are already authenticated.
TODO: Add a proper loading animation component
*/
const PublicRoute = ({component: Component, ...rest}: RouteProps) => {
    
    const { state } = useContext(AuthContext);

    // If no component was specified
    if (!Component) return null;

    // Show a loading component until auth is resolved
    if (state.loading) return (<h1>loading...</h1>);

    return (
        <Route {...rest} render={props => (
            state.user !== null ?
                <Redirect to="/dashboard" />
                : <Component {...props}/>
        )} />
    )
}

export default PublicRoute