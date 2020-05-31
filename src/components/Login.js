import React, {useContext} from 'react';
import {GlobalContext} from '../context/GlobalState';

import { Heading} from './Heading';
import { UserList } from './UserList';

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
