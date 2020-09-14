import {Types, InitialStateType} from './auth'
import { user } from '../types';
import Axios from 'axios';
import { auth } from '../util/firebase';
import {initialState} from './Authcontext'

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
    }
    : {
        type: Key;
        payload: M[Key];
    }
};



type AuthPayload = {
    [Types.Login]: {
        token: string;
        user: user
    };
    [Types.Clear]: null
    [Types.Stay]: null
    [Types.DontStay]:null
    [Types.Update]: {
        user: user
    }
    [Types.Delete]: null
    
}

const login = (state: any, action: any) => {
        return { ...state, user: action.payload.user, token: action.payload.token, loading: false }
}

const logout = (state: any, action: any) => {
    localStorage.removeItem('user');
    return { ...state, user: null, loading: false }
} 

const deleteUser = (state: any, action: any) => {
    const user = auth.currentUser
    if(user){
        user.delete().then(function() {
            localStorage.removeItem('user');
          }).catch(function(error) {
            // An error happened.
          });
    }
    return initialState
}

export type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

export const authReducer = (state: InitialStateType, action: AuthActions) => {
    switch (action.type) {
        case Types.Login:
            return login(state, action)
        case Types.Clear:
            return logout(state, action)
        case Types.Stay:
            return {...state, stay: true};
        case Types.DontStay: 
        return {...state, stay: false}
        case Types.Update:
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            return {...state, user: action.payload.user}
        case Types.Delete:
            return deleteUser(state,action)
        
        default:
            return state
    }
}