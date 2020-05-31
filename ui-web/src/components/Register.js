import React, {useContext, useState, useCallback, useReducer, useEffect} from 'react';
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

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: '100%',
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };  

export const Register = () => {
    const [name,  setName] = useState('');
    const [files, setFiles] = useState([]);
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

    const onDropAccepted = useCallback(
        ([file]) => {
            uploadFile({ variables: { file } });
        }, [uploadFile]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
        accept: 'image/*',
        onDropAccepted,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
              preview: URL.createObjectURL(file)
            })));
        }
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
          <div style={thumbInner}>
            <img
              src={file.preview}
              style={img}
            />
          </div>
        </div>
    ));
    
      useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
      }, [files]);
    
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
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
           <Button type="submit">Submit</Button>
           <Link to="/" className="btn btn-danger ml-2"> Cancel</Link>
       </Form>
    )
}
