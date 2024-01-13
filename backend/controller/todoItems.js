import Todo from "../model/todoItems.js";
import httpStatus from "http-status"

export const createTask = async (req,res) => {
    const {item} = req.body
    try {
        const taskExists = await Todo.findOne({item}) 
        if(taskExists) {
            res.status(httpStatus.FORBIDDEN).json({
                status: "error",
                message: "Task already exists"
            })
            return
        }
        const task = Todo.create({item})
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
export const getTasks = async (req,res) => {
    try {
        const allBooks = await Todo.find({})
        res.status(httpStatus.OK).json({
            status: "success",
            payload: allBooks
        })
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({
            status: "error",
            message: error
        })
    }
}
export const getTask = async (req,res) => {
    const id = req.params.id
    try {
        const task = await Todo.findById({_id:id})
        if(!task) {
            res.status(httpStatus.NOT_FOUND).json({
                status: "error",
                message: `task with id: ${id} cannot be found`
            })
            return 
        }
        res.status(httpStatus.OK).json({
            status: "success",
            payload: task
        })
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({
            status: "error",
            message: error.message
        })
    }
}
export const updateTask = async (req,res) => {
    const id = req.params.id
    const body = req.body
    try {
        const task = await Todo.findById({_id:id})
        if(!task) {
            res.status(httpStatus.NOT_FOUND).json({
                status: "error",
                message: `task with id: ${id} not found`
            })
            return;
        }
        const updatedTask= await Todo.findByIdAndUpdate(
            { _id: id },
            {item:body.item},
            {new:true}
          );
        res.status(httpStatus.OK).json({
            status: "Task updated",
            payload: updatedTask 
        })
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({
            status: "error",
            message: error.message
        })
    }
}
export const deleteTask = async (req,res)=> {
    const id = req.params.id
    try {
        const task = await Todo.findByIdAndDelete({_id:id}) 
        if(!task) {
            res.status(httpStatus.BAD_REQUEST).json({
                status: "error",
                message: `task with id: ${id} not found`
            })
            return
        }
        res.status(httpStatus.OK).json({
            status: "success",
            message: "task Deleted"

        })
    } catch (error) {
        res.status(res.BAD_REQUEST).json({
            status: "error",
            message: error.message
        })
    }
}