import React, { useContext } from 'react'
import { AuthContext } from '../../context/Authcontext';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import Loading from '../Loading/Loading';

/*
Pulbic route which will redirect the user to thier recipes if they are already authenticated.
TODO: Add a proper loading animation component
*/
const PublicRoute = ({component: Component, ...rest}: RouteProps) => {
    
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
                <Redirect to="/recipes" />
                : <Component {...props}/>
        )} />
    )
}

export default PublicRoute