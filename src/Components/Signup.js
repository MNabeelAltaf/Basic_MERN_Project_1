import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid'; // Grid version 1

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function loginData(e) {
        e.preventDefault();


        const login_response = await fetch('http://localhost:3030/api/register', {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                email, password
            })
        })

        const resp = await login_response.json();

        console.log(resp);

        if (resp.status === 200) {
            alert("submit sucessfully")
            setEmail('');
            setPassword('');
        }
        else if (resp.status === -202) {
            alert("Already Registered Email");

        }
        else if (resp.status === -200) {
            alert("failed to submit ")

        }
        else if (resp.status !== 200) {
            alert("Error Occured in submitting data")
        }

    }

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Signup</h2>

            <Grid
                container
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Item style={{width:"50%", padding:"1.5rem"}}>

                    <form onSubmit={loginData}>
                        {/* <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email' required /> */}
                        <TextField id="standard-basic" label="Email" variant="standard" type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />

                        <br></br>
                        <br></br>
                        {/* <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' required /> */}
                        <TextField id="standard-basic" label="Password" variant="standard" type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' required />
                        <br></br>
                        <h4>Already have an account?</h4>{' '}
                        <Link to="/login">
                            <Button variant="text">Login</Button>
                        </Link>

                        <br></br>
                        <br></br>
                        {/* <button type='submit' >Submit</button> */}
                        <Button type='submit' variant="contained">Submit</Button>

                    </form>

                </Item>
            </Grid>

        </div>
    );
};

export default Signup;