import Todo from "../model/todoItems.js";
import httpStatus from "http-status"

export const createTask = async (req,res) => {
    const {item} = req.body
    try {
        const taskExists = await Todo.findOne(item) 
        if(taskExists) {
            res.status(httpStatus.FORBIDDEN).json({
                status: "error",
                message: "Task already exists"
            })
            return
        }
        const task = Todo.create(item)
        res.status(httpStatus.OK).json({
            status: "task added successfully",
            payload: task
        })
    } catch (error) {
        res.status(httpStatus.NOT_FOUND).json({
            status: "error",
            message: error
        })
    }
}