import express from "express"
import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"

const app = express()
//parse data into json format
app.use(express.json())
app.use(morgan())

const {ENV,PORT} = process.env
//port
const port = ENV === "development"? PORT : 6000
app.listen(()=> console.log( `App is listening on ${port}`))
