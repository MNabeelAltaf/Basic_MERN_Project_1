import React from 'react';
import { useLocation } from "react-router-dom";
// material UI imports
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Button from "@mui/material/Button"


// use with Grid to makegrid item // pre-defined
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const User_details = () => {

    const { state } = useLocation();

    return (
        <div>

            <h2 style={{ textAlign: 'center' }}>User Detail</h2>
            <Grid container
                direction="column"
                justifyContent="center"
                alignItems="center">

                <Item style={{ width: "50%", padding: "1.5rem" }}>
                    <h5>Name: <br></br>{state.detail.name}</h5>
                    <hr></hr>
                    <p>Email: <br></br> {state.detail.email}</p>
                    <hr></hr>
                    <p>Password: <br></br>{state.detail.password}</p>
                </Item>
            </Grid>
        </div>
    );
};

export default User_details;