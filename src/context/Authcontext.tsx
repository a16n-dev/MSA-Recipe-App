import React, {useReducer, createContext, useEffect} from 'react'
import {auth} from '../util/firebase'
import {authReducer} from './reducers'
import {Types, InitialStateType, AuthProviderProps} from './auth'


const initialState = {
    user: null,
    token: '',
    loading: true
  }

// Create context
const AuthContext = createContext<{
    state: InitialStateType;
    dispatch: React.Dispatch<any>;
  }>({
    state: initialState,
    dispatch: () => null
  });

// ------===============Context provider===============------
const AuthProvider = ({children} : AuthProviderProps) => {

    const [state, dispatch] = useReducer(authReducer, initialState)

    // Set logged in user on page refresh
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user: any) => {

            if(user){
                // If there is a logged in user
                const idTokenResult = await user.getIdTokenResult() 
                console.log(idTokenResult.token);
                dispatch({
                    type: Types.Login,
                    payload: {
                        user: {
                            email: user.email,
                            photoUrl: user.photoURL,
                            name: user.displayName
                        },
                        token: idTokenResult.token,
                    }
                })
            } else {
                // If there is no logged in user
                dispatch({
                    type: Types.Clear,
                    payload: null,
                })
            }
        })

        // Clean up
        return () => unsubscribe()
    }, [])

    return (
    <AuthContext.Provider value={{state, dispatch}}>
        {children}
    </AuthContext.Provider>
    )
}

// Export context and provider
export {AuthContext, AuthProvider}