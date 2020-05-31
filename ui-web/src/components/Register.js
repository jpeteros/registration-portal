import React, {useContext, useState, useCallback, useReducer} from 'react';
import {GlobalContext} from '../context/GlobalState';
import {Link, useHistory} from 'react-router-dom';
import { useDropzone } from "react-dropzone";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { filesQuery } from "../service/Files";
import '../index.css';
import { v4 as uuid} from 'uuid';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';

const uploadFileMutation = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;

export const Register = () => {
    const [name,  setName] = useState('');
    const [fileName,  setFile] = useState('');
    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            name: '',
            passport: ''
        }
    );

    const {addUser} = useContext(GlobalContext);
    const history = useHistory();

    const onSubmit = () => {
        const newUser = {
            id: uuid(),
            name: userInput.name,
            passport: userInput.passport
        }
        addUser(newUser);
        history.push('/');
    }

    const handleChange = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setUserInput({[name]: newValue});
    }

    const onChange = (e) => {
        setName(e.target.value);
    }

    const [uploadFile] = useMutation(uploadFileMutation, {
        refetchQueries: [{ query: filesQuery }]
    });

    const onDrop = useCallback(
        ([file]) => {
         // uploadFile({ variables: { file } });
         setFile(file.name);
         console.log(file.name);
        }, [uploadFile]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
        onDrop,
        accept: 'image/*'
    });
    
    return (
       <Form onSubmit={onSubmit}>
           <FormGroup>
               <Label> Name</Label>
               <Input type="text" name="name" value={userInput.name} onChange={handleChange} placeholder="Enter Name"></Input>
           </FormGroup>
           <FormGroup>
               <Label> Passport/Ikad Number</Label>
               <Input type="text" name="passport" value={userInput.passport} onChange={handleChange} placeholder="Enter Passport/Ikad"></Input>
           </FormGroup>

           <div className="image-dropzone mb-2" {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p>Drag 'n' drop some files here, or click to select files</p>
                )}
            </div>
                <h1>{fileName}</h1>

           <Button type="submit">Submit</Button>
           <Link to="/" className="btn btn-danger ml-2"> Cancel</Link>
       </Form>
    )
}
