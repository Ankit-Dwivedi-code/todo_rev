import {Todo} from '../models/todo.model.js'

const createTodo = async(req, res) =>{
    const {title, content, isCompleted} = req.body

    if (!title || !content ) {
        throw new Error("All fields are required!")
    }

    const user  = req.user

    const todo = await Todo.create({
        title,
        content,
        isCompleted,
        createdBy : user._id
    })

    return res.status(201).json(todo)
}

const readTodo = async(req, res) =>{
    const user = req.user

    const createdBy = user._id

    const todos = await Todo.find({createdBy})

    return res.status(200).json(todos)
}

const updateTodo = async(req, res) =>{
    //Steps
    // 1 - todo update  req.params --> _id find and then 
    const {todoId} = req.params

    // console.log("Todo id is", todoId);
    

    const {title, content} = req.body

    if (!title || !content) {
        throw new Error("All fields are required!")
    }

    const todo = await Todo.findByIdAndUpdate(todoId, {
        title,
        content
    }, {new : true})

    return res.status(200).json(todo)
}

const deleteTodo = async (req, res) =>{
    const {todoId} = req.params

    await Todo.findByIdAndDelete(todoId)

    return res.status(200).json("Todo deleted Successfully")

}

const toggleTodo = async(req, res) =>{
    const {todoId} = req.params

    const todo = await Todo.findById(todoId)

    if (todo.isCompleted) {
        todo.isCompleted = false
    }else{
        todo.isCompleted = true
    }

    await todo.save()

    return res.status(200).json(todo)
}

export {createTodo, readTodo, updateTodo, deleteTodo, toggleTodo}