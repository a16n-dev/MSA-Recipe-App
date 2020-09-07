import { ReactNode } from "react";

export interface AuthProviderProps {
    children: ReactNode
}

export type InitialStateType = {
    user: any
}

export enum Types {
    Login = 'LOG_IN_USER',
    Clear = 'CLEAR_USER',
}