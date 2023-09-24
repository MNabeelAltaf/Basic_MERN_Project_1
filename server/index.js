const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const db = require('./Model/signup_model');

app.use(cors())
app.use(express.json())

const bcrypt = require("bcrypt");

const PORT = 3030

mongoose.connect('mongodb://0.0.0.0:27017/mern-website-db').then(() => {
    console.log("Mongo Connected");
}).catch((e) => {
    console.log("Error in Mongo Connected");
    console.log(e);
})


app.get('/', (req, res) => {
    res.send("Welcome to MERN")
})


app.post('/api/register', async (req, res) => {

    // column {key} name i.e. email 
    let email = req.body.email;


    try {

        let registered_email = await db.findOne({
            email
        });

        // console.log(registered_email);

        if (registered_email) {
            res.json({ status: -202 });
            console.log("-202");
            return;
        }
        else {

            const hashed_password = await bcrypt.hash(req.body.password, 10);

            await db.create({
                name: '',
                email: email,
                password: hashed_password,
            });

            res.json({ status: 200 });
        }
    }
    catch (error) {
        // Handle other errors, not just the duplicate email case
        console.log(error);

        // Send an appropriate response for other errors
        res.json({ status: -200 });

    }



})

app.post('/api/login', async (req, res) => {


    try {

        const mail = await db.findOne({
            email: req.body.email
        })

        if (mail) {
            const pass = await bcrypt.compare(req.body.password, mail.password)

            if (mail && pass) {
                // console.log("Credential found");
                res.json({ status: 200 });
            }
            else if (!pass) {
                // console.log("Credential NOT found");
                res.json({ status: 420 });
            }
        }else if(!mail)
        {
            res.json({status:420})
        }

    } catch (error) {
        res.json({ status: 500 })
    }

})


app.get('/api/getUsers', async (req, res) => {

    try {

        const reg_users = await db.find({});
        res.json(reg_users);

    } catch (error) {
        res.send({ status: "404" });
    }

})


app.delete('/api/delete', async (req, res) => {

    let Id = req.body.user_id;

    if (Id) {
        try {

            const remove_user = await db.findByIdAndDelete((Id));

            if (remove_user) {
                res.json({ status: 200 });
            }
            else {
                res.json({ status: -200 })
            }
        } catch (error) {
            res.json({ status: 405 })
        }

    } else if (!Id) {
        res.json({ status: 404 })
    }





})


app.listen(PORT, () => {
    console.log("Server running on", PORT);
})

