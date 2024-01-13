import express from 'express'
import { createTask, deleteTask, getTask, getTasks, updateTask } from '../controller/todoItems.js'
 const taskRouter = express.Router()

taskRouter.route("/").post(createTask).get(getTasks)
taskRouter.route("/:id").get(getTask).patch(updateTask).delete(deleteTask)
export default taskRouter