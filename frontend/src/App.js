import {useEffect, useState} from 'react'
import axios from "axios"
function App() {
  const [itemText, setItemText] = useState('')
  const addItem = async (e) => {
    e.preventDefault()
 try {
  const res = await axios.post("https://to-do-app-v0rt.onrender.com/tasks", {item:itemText})
  console.log(res);
 } catch (error) {
  console.log(error);
 }
  }
useEffect(()=>{
  const getAllItems  = async () => {
    try {
const res = await axios.get("https://to-do-app-v0rt.onrender.com/tasks")
console.log(res)
    } catch (error) {
      console.log(error);
    }
  }
  getAllItems()
}, [])

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4">
      {/* Header */}
      <h1 className="text-2xl font-bold text-center my-4">TO DO APP</h1>

      {/* Add Task section */}
      <form onSubmit={(e) => addItem(e)} className="flex items-center gap-4 w-full">
        <input
          type="text"
          placeholder="Add a task"
          className="rounded-md border px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          onChange={e=>{setItemText(e.target.value)}}
          value={itemText}
        />
        <button
          type="submit"
          className="px-3 py-2 rounded-md bg-blue-500 text-white font-bold"
        >
          +
        </button>
      </form>

      {/* Todo List section */}
      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4">To do items</h2>
        <ul>
          <li className="flex items-center justify-between border-b py-2">
            <p className="text-gray-700">Task 1</p>
            <div className="flex gap-2">
              <button className="text-blue-500 hover:underline">Update</button>
              <button className="text-red-500 hover:underline">Delete</button>
            </div>
          </li>
          <li className="flex items-center justify-between border-b py-2">
            <p className="text-gray-700">Task 2</p>
            <div className="flex gap-2">
              <button className="text-blue-500 hover:underline">Update</button>
              <button className="text-red-500 hover:underline">Delete</button>
            </div>
          </li>
          <li className="flex items-center justify-between border-b py-2">
            <p className="text-gray-700">Task 3</p>
            <div className="flex gap-2">
              <button className="text-blue-500 hover:underline">Update</button>
              <button className="text-red-500 hover:underline">Delete</button>
            </div>
          </li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="mt-8 flex items-center justify-center">
        <p className="text-gray-500 mr-4">You have 4 pending tasks</p>
        <button
          type="button"
          className="px-3 py-2 rounded-md bg-red-500 text-white font-bold"
        >
          Clear all
        </button>
      </footer>
    </div>
  );
}

export default App;
