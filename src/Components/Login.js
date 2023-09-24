import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

// material UI imports
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Button from "@mui/material/Button"
import TextField from '@mui/material/TextField';




// use with Grid to makegrid item // pre-defined
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



const Login = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    // for redirecting user after successful login
    const navigate = useNavigate();


    async function loginData(e) {

        e.preventDefault();

        console.log(email);
        console.log(password);

        if (email.length == 0 && password.length == 0) {
            alert("Please Enter Email and Password")
            return;
        } else {

            const login_data = await fetch('http://localhost:3030/api/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email, password
                })
            })

            const resp = await login_data.json();

            if (resp.status === 200) {
                alert("valid user")
                setEmail('')
                setPassword('');

                // redirect to users component after sucessful login
                navigate("/users");
            }
            else if (resp.status === 420) {
                alert("in-valid user")
                return
            }
            else if (resp.status === 500) {
                alert("Error in getting data")
                return;
            }

        }

    }





    return (
        <div>
            <h2 style={{ textAlign: "center" }} >Login</h2>

            <Grid container
                direction="column"
                justifyContent="center"
                alignItems="center">

                <Item style={{ width: "50%", padding: "1.5rem" }}>
                    <form onSubmit={loginData} >
                        {/* <input placeholder='Enter Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required /> */}

                        <TextField label="Email" variant="standard" type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <br></br>
                        <br></br>
                        {/* <input placeholder='Enter Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required /> */}

                        <TextField label="Password" variant="standard" type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <br></br>

                        <h4>Not have an account?</h4>{' '}
                        <Link to="/signup">
                            <Button variant="text">Signup</Button>
                        </Link>
                        <br></br>
                        <br></br>
                        <Button type="submit" variant="contained">Login</Button>
                    </form>
                </Item>
            </Grid>


        </div >
    );
};

export default Login;