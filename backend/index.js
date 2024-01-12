import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import morgan from 'morgan'
import httpStatus from 'http-status'
import { dbConnect } from './config/db.js'

const app = express()
const {NODE_ENV, PORT} = process.env
if(NODE_ENV === "development") {
  app.use(morgan('dev'))
}
app.get('/', (req,res) => {
  try {
    res.status(httpStatus.OK)
    .json({
      status: "success",
      message: "Welcome to my to-do app"
    })
  } catch (error) {
    console.log(error.message)
res.status(httpStatus[404]).send(error.message)
  }
})

dbConnect().then(() => {
  console.log("Database is connected")
  const port = NODE_ENV === "development"? PORT : 7070
  app.listen(port, (error) => {
if(error) {
  console.log("server error", error);
  return
}
console.log("app is listening");
  })
}).catch((error) => {
  console.log(`database error, ${error}`);
})