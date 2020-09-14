import {Types, InitialStateType} from './auth'
import { user } from '../types';
import Axios from 'axios';

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
    
}

const login = (state: any, action: any) => {
 
        return { ...state, user: action.payload.user, token: action.payload.token, loading: false }
}

const logout = (state: any, action: any) => {
    localStorage.removeItem('user');
    return { ...state, user: null, loading: false }
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
        default:
            return state
    }
}