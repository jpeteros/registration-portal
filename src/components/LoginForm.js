import React, {useContext, useState} from 'react';
import { GlobalContext} from '../context/GlobalState';
import {Link, useHistory} from 'react-router-dom';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert
} from 'reactstrap';

export const LoginForm = () => {
    const {loginUser, users} = useContext(GlobalContext);
    const [prompt, setPrompt] = useState('');
    const history = useHistory();
 
    const onSubmit = (e) => {
        e.preventDefault();
        if(users.length > 0) {
            loginUser();
            history.push('/');
        } else {
            setPrompt(true);
        }
    }

    return (
         
        <Form className="mt-3" id="create-form">
            <FormGroup>
                <Label> Passport/Ikad</Label>
                <Input  required type="text" placeholder="Enter passport/ikad number"></Input>
            </FormGroup>
            <Button type="button" onClick={onSubmit}>Login</Button>
            <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
            { prompt && (
                <Alert color="secondary" className="mt-3">
                    Please register first.
                </Alert>
            )}
        </Form>
    )
}
