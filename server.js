const express = require ("express")
const cors = require ("cors");
const fs = require ("fs");
const { json } = require("express");


const port =8000;

const server = express ()
server.use(cors());
server.use(express.json());

server.get ("/",(req, res) => {
    res.status(200).json({message:"hello Express server"});
});

server.post("/signup",(req,res)=>{
    const{name,role} = req.body;
    fs.readFile("users.json", "utf-8", (err, data)=>{
        if(err){
            console.log("Can't read file!!!");
            return;
        }
        console.log(data)
        const parsedData = JSON.parse(data);
        const newUser ={name, role, id:parsedData.users.length}
        parsedData.users.push(newUser);
        fs.writeFile("users.json", JSON.stringify(parsedData),(err)=>{
            if (err){
                res.status(400).json({message:"Error"});
            }
            res.status(201).json({message:"Created new user"})
        })
    })
})

server.get("/users",(req, res)=>{
    fs.readFile("users.json","utf-8",(err, data)=>{
        if(err) {
            console.log("Cannot read file.!!!")
            return;
        }
        console.log(data);
        const parsedData = JSON.parse(data);
        res.status(201).json({users:parsedData.users})
    });
});

// server.get("/users",(req,res)=> {
//     res.status(201).json({users})
// });
server.get("/user/:id", (req, res) => {
    const {id} = req.params;
    const user = users.find((el)=> el.id === id);
    res.status(200).json({user});
});


server.listen (port, () => {
    console.log(`server aslaa ${port}`)
});