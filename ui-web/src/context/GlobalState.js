import React, { createContext, useReducer} from 'react';
import AppReducer from './AppReducer';

//Initial State
const initialState = {
    users: [],
    isLogged: ''
};

//Create Context
export const GlobalContext = createContext(initialState);

//Provider Component
export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions
    const removeUser = (id) => {
        dispatch({
            type: 'DELETE',
            payload: id
        })
    }

    const addUser = (user) => {
        dispatch({
            type: 'ADD_USER',
            payload: user
        })
    }

    const editUser = (user) => {
        dispatch({
            type: 'EDIT_USER',
            payload: user
        })
    }

    const loginUser = () => {
        dispatch({
            type: 'LOGIN',
            payload: true
        })
    }

    return (
        <GlobalContext.Provider value={{
            users: state.users,
            isLogged: state.isLogged,
            removeUser,
            addUser,
            editUser,
            loginUser
        }}>
            {children}
        </GlobalContext.Provider>
    )
}