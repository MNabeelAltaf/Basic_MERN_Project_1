
import React from 'react';
import { useState, useEffect } from 'react';

import { Link } from "react-router-dom"


import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



function createData(id, name, email, password) {
    return { name, name, email, password };
}


const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const Users = () => {

    const [regUsers, setRegUsers] = useState([]);

    useEffect(() => {
        getUsers()
    }, [])


    async function getUsers() {

        try {
            const all_users = await fetch("http://localhost:3030/api/getUsers", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            const res_users = await all_users.json();

            setRegUsers(res_users);

            if (res_users.status == "404") {
                console.log("Users not found");
            }

        }
        catch (error) {
            console.log("error in getting users");
        }

    }


    async function deleteUser(user) {

        let user_id = user._id;



        const delete_user = fetch("http://localhost:3030/api/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id
            })
        })

        let delete_resp = await (await delete_user).json()
        console.log(delete_resp);

        if (delete_resp.status == 200) {
            alert("User Removed Sucessfully!")

            // Update the regUsers state after successful deletion
            setRegUsers((prevUsers) =>
                prevUsers.filter((u) => u._id !== user_id)
            );

        }
        else if (delete_resp.status == 404) {
            alert("User not found")
        }
        else if (delete_resp.status == -200) {
            alert("User Not Removed")
        }
        else if (delete_resp.status == 405) {
            alert("Error in removing user")
        }



    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>All users</h1>
            <div style={{ textAlign: "center" }}>
                {/* <Button variant="contained" onClick={getUsers} >Get Users</Button> */}
            </div>
            <hr></hr>
            {/* <ul>
                {regUsers.map((users, ind) => (
                    <li key={users.email} >{ind}:{' '}Name:{users.name} {' '}||{' '}
                        Email:{users.email}{' '}||{' '}
                        Password:{users.password}{' '}</li>
                ))}
            </ul> */}



            <TableContainer style={{ margin: "5px" }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Password</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {regUsers.map((row, ind) => (
                            <TableRow
                                key={row.email}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {ind}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.password}</TableCell>
                                <TableCell align="right">
                                    <Link
                                        to="/user_detail"
                                        state={{ detail: row }}
                                    >
                                        <Button style={{ backgroundColor: "#41b5d9" }} variant="contained" >View</Button> {' '}
                                    </Link>
                                    <Button style={{ backgroundColor: "#db1d4f" }} variant="contained" onClick={() => deleteUser(row)} >Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>



        </div>
    );
};

export default Users;