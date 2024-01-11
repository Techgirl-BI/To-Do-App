import mongoose from "mongoose";
const TodoListSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    }
})
const Todo = mongoose.model('Todo', TodoListSchema);
export default Todo