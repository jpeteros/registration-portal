import React, {useContext} from 'react';
import {GlobalProvider, GlobalContext} from '../context/GlobalState';
import {Link, useHistory} from 'react-router-dom';;

import { Heading} from './Heading';
import { UserList } from './UserList';
import {LoginForm} from './LoginForm';

export const Login = () => {
    const {isLogged} = useContext(GlobalContext);
    console.log(isLogged);

    return (
        <>
            <Heading/>
            <UserList/>
        </>
    )
}
