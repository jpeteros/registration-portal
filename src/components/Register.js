import React, {useContext, useState} from 'react';
import {GlobalProvider, GlobalContext} from '../context/GlobalState';
import {Link, useHistory} from 'react-router-dom';;
import { v4 as uuid} from 'uuid';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';

export const Register = () => {
    const [name,  setName] = useState('');
    const [passport,  setPassport] = useState('');
    const {addUser} = useContext(GlobalContext);
    const history = useHistory();

    const onSubmit = () => {
        const newUser = {
            id: uuid(),
            name,
            passport
        }
        addUser(newUser);
        history.push('/');
    }

    const onChange = (e) => {
        setName(e.target.value);
    }

    const onChangePassport = (e) => {
        setPassport(e.target.value);
    }

    return (
       <Form onSubmit={onSubmit}>
           <FormGroup>
               <Label> Name</Label>
               <Input type="text" value={name} onChange={onChange} placeholder="Enter Name"></Input>
           </FormGroup>
           <FormGroup>
               <Label> Passport/Ikad Number</Label>
               <Input type="text" value={passport} onChange={onChangePassport} placeholder="Enter Passport/Ikad"></Input>
           </FormGroup>

           <Button type="submit">Submit</Button>
           <Link to="/" className="btn btn-danger ml-2"> Cancel</Link>
       </Form>
    )
}
