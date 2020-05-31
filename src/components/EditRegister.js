import React, {useContext, useState, useEffect} from 'react';
import {GlobalProvider, GlobalContext} from '../context/GlobalState';
import {Link, useHistory} from 'react-router-dom';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';

export const EditRegister = (props) => {
    const {users, editUser} = useContext(GlobalContext);
    const history = useHistory();
    const currentUserId = props.match.params.id;

    const [selectedUser, setSelectedUser] = useState({
        id: '',
        name: '',
        passport: ''
    });

    useEffect(() => {
        const userId = currentUserId;
        console.log(typeof userId );
        const selectedUser = users.find(user => user.id === userId);
        setSelectedUser(selectedUser);
    }, [currentUserId, users])
      
    const onChange = (e) => {
        setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value })
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        editUser(selectedUser)
        history.push('/');
    }
    
    return (
        <Form onSubmit={onSubmit}>
            <FormGroup>
               <Label> Passport/Ikad Number</Label>
               <Input type="text" value={selectedUser.passport} onChange={onChange} name="passport"  placeholder="Enter Passport/Ikad"></Input>
            </FormGroup>
            <FormGroup>
                <Label>Name</Label>
                <Input type="text" value={selectedUser.name} onChange={onChange} name="name" placeholder="Enter user" required></Input>
            </FormGroup>
        
            <Button type="submit">Edit Name</Button>
            <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
        </Form>
      )
    }
