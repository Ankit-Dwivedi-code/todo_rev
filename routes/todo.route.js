import express from "express";
import { createTodo, deleteTodo, readTodo, toggleTodo, updateTodo } from "../controllers/todo.controller.js";
import { verifyJwt } from "../middlewares/authChecker.middleware.js";

const router = express.Router()

router.post('/create-todo', verifyJwt, createTodo)
router.get('/read-todo', verifyJwt, readTodo)
router.put('/update-todo/:todoId', verifyJwt, updateTodo)
router.delete('/update-todo/:todoId', verifyJwt, deleteTodo)
router.put('/mark-todo/:todoId', verifyJwt, toggleTodo)

export default router