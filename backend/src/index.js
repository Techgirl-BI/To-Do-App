import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import morgan from 'morgan'
import httpStatus from 'http-status'
import { dbConnect } from '../config/db.js'
import taskRouter  from '../route/todo.js'

const app = express()
app.use(express.json())
app.use(cors())
const {NODE_ENV, PORT} = process.env
if(NODE_ENV === "development") {
  app.use(morgan('dev'))
}
app.get('/', (req,res) => {
  try {
    res.status(httpStatus.OK)
    .json({
      status: "success",
      message: "Welcome to my to-do application, glad to have you here"
    })
  } catch (error) {
    console.log(error.message)
res.status(httpStatus[404]).send(error.message)
  }
})
app.use('/tasks', taskRouter)
app.all('*', (req,res)=> {
  res.status(httpStatus.NOT_FOUND).json({
    status: "error",
    payload: "endpoint not defined"
  })
})

dbConnect().then(() => {
  console.log("Database is connected")
  const port = NODE_ENV === "development"? PORT :7070
  app.listen(port, (error) => {
if(error) {
  console.log("server error", error);
  return
}
console.log(`app is listening on port ${port}`);
  })
}).catch((error) => {
  console.log(`database error, ${error}`);
})