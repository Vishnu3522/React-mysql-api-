import express from "express"
import mysql from "mysql"
import cors from "cors"

const app  =  express() 
const db = mysql.createConnection({
    host : "localhost",
    user : "root",

    password : "Vishnu@3522",
    database : "test"
})

app.use(express.json())
app.use(cors())

app.get("/", (req,res) =>{
    res.json("hello this is the backend");
})

app.get("/books" ,(req,res) =>{
    const q = "select * from books";
    db.query(q,(err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books" , (req,res)=>{
    const q = "INSERT INTO books(`title`, `desc`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover
    ]

    db.query(q,[values] , (err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been created succesfully");
    })
})


app.listen(8000, ()=>{
    console.log("connected to backend");
})