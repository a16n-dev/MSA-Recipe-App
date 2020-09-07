import {Types, InitialStateType} from './auth'

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
        email: string;
        token: any;
    };
    [Types.Clear]: null
    
}

export type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

export const authReducer = (state: InitialStateType, action: AuthActions) => {
    switch (action.type) {
        case Types.Login:
            return { ...state, user: action.payload }
        case Types.Clear:
            return { ...state, user: null }
        default:
            return state
    }
}