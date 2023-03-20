import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import axios from "axios";
import { CREATE_USER_URL } from '../constant/Constants';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const useLocalStorage = (storageKey, fallbackState) => {
    const [value, setValue] = React.useState(
      JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
    );
  
    React.useEffect(() => {
      localStorage.setItem(storageKey, JSON.stringify(value));
    }, [value, storageKey]);
  
    return [value, setValue];
};


export default function UserForm() {
  const [firstName, setFirstName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [saveUser, setSaveUser] = useLocalStorage('users', false);

  const handleInputChange = (e) => {
    const {id, value} = e.target;

    if(id === "firstName"){
        setFirstName(value);
    }
    if(id === "lastName"){
        setLastName(value);
    }
    if(id === "email") {
        setEmail(value);
    }
  }

  const handleSubmit = () => {
    const data = {
        first_name: firstName,
        last_name: lastName,
        email: email
    };

    axios.post(CREATE_USER_URL, data)
    .then(response =>{
        console.log(response);
        
        if(response.status === 200 ||  response.status === 201 || response.status === 204){
            setSuccess(true);
            setError(false);
            setSaveUser({users: response.data});

            // console.log({users: response.data});
        } else {
            setError(true);
            setSuccess(false);
        }
    });
  }

  return (
    <Box sx={{ mx: 'auto' }}>
      <Card variant="outlined">
        <React.Fragment>
            <CardContent>
            {
                error && 
                <Alert severity="error" sx={{ mb: 2 }}>
                <AlertTitle>Error</AlertTitle>
                    Something went wrong!
                </Alert>
            }
            {
                success &&
                <Alert severity="success" sx={{ mb: 2 }}>
                <AlertTitle>Success</AlertTitle>
                    User Successfully Created — <strong>User List</strong>
                </Alert>
            }
            <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom >
                Create User
            </Typography>

            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                        <TextField error = {firstName === "" || firstName === null ? true : false} helperText={firstName === "" || firstName === null ? "First Name is required." : ""} fullWidth id="firstName" label="Firstname" value={firstName} variant="outlined" onChange = {(e) => handleInputChange(e)} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField error = {lastName === "" || lastName === null ? true : false} helperText={lastName === "" || lastName === null  ? "Last Name is required." : ""} fullWidth id="lastName" label="Lastname" value={lastName} variant="outlined" onChange = {(e) => handleInputChange(e)} />
                    </Grid>
                </Grid>
                <TextField error = {email === "" || email === null ? true : false} helperText={email === "" || email === null ? "Email is required." : ""}  fullWidth id="email" label="Email" value={email} variant="outlined" sx={{ mb: 2 }} onChange = {(e) => handleInputChange(e)}/>
                <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                    Avatar
                </Typography>
                <TextField type="file" />
            </Box>

            </CardContent>
            <CardActions sx={{ m: 1 }}>
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </CardActions>
            
        </React.Fragment>
      </Card>
    </Box>
  );
}