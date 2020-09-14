import { ReactNode } from "react";

export interface AuthProviderProps {
    children: ReactNode
}

export type InitialStateType = {
    user: any
    token: String
    loading: boolean
    stay: boolean
}

export enum Types {
    Login = 'LOG_IN_USER',
    Clear = 'CLEAR_USER',
    Stay  = 'SET_STAY_TRUE',
    DontStay = 'SET_STAY_FALSE',
    Update = 'UPDATE',
    Delete = 'DELETE'
}