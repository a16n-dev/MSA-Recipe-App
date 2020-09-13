import React, {useReducer, createContext, useEffect} from 'react'
import {auth} from '../util/firebase'
import {authReducer} from './reducers'
import {Types, InitialStateType, AuthProviderProps} from './auth'
import Axios from 'axios'


const initialState = {
    user: null,
    token: '',
    loading: true,
    stay: false,
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

                const data = localStorage.getItem('user')
                if(!data){
                    console.log('no user in storage, making API call...');
                    //request here
                    Axios({
                        method: 'get',
                        url: '/user',
                        headers: {authToken: idTokenResult.token}
                    }).then((result) => {
                        console.log('user:');
                        console.log(result);
                        localStorage.setItem('user',JSON.stringify(result.data))
                        dispatch({
                            type: Types.Login,
                            payload: {
                                token: idTokenResult.token,
                                user: result.data
                            }
                        })
                    }).catch((err) => {
                        
                    });
                 } else {
                        console.log('retreiving data from local storage');
                        const user = JSON.parse(data)
                        dispatch({
                            type: Types.Login,
                            payload: {
                                token: idTokenResult.token,
                                user: user
                            }
                        })
                    }


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