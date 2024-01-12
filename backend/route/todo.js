import express from 'express'
import { createTask } from '../controller/todoItems.js'
 const taskRouter = express.Router()

taskRouter.route("/").post(createTask)
export default taskRouter