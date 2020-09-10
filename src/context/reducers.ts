import {Types, InitialStateType} from './auth'
import { user } from '../types';

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
        user: user
        token: string;
    };
    [Types.Clear]: null
    
}

export type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

export const authReducer = (state: InitialStateType, action: AuthActions) => {
    switch (action.type) {
        case Types.Login:
            return { ...state, user: action.payload.user, token: action.payload.token, loading: false }
        case Types.Clear:
            return { ...state, user: null, loading: false }
        default:
            return state
    }
}