import {Todo} from '../models/todo.model.js'
import { User } from "../models/user.model.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import {v4 as uuid} from "uuid"

const addTodo = asyncHandler(async (req,res) => {
    try {
        const userEmail = req.payload.email;
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(403).json(new ApiErrors(403, 'You are not allowed to create todo'));
        }

        const { todoName } = req.body;
        if (!todoName) {
            return res.status(400).json(new ApiErrors(400, 'TodoName is required'));
        }

        const newTodo = await Todo.create({
            id: uuid(),
            todoName, 
            userId: user.userId,
        });

        return res.status(200).json(new ApiResponse(newTodo, 200, 'Todo added successfully'));
    } catch (error) {
        console.error('Error adding todo:', error);
        return res.status(500).json(new ApiErrors(500, 'Internal server error')); 
    }
})

const updateTodo = asyncHandler(async (req,res) => {
    try {
        const { todoId } = req.params;
        const { todoName, isCompleted } = req.body; 
        const userEmail = req.payload.email;

        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(403).json(new ApiErrors(403, 'You are not allowed to update this todo'));
        }

        const todo = await Todo.findOne({ id: todoId, userId: user.userId });
        if (!todo) {
            return res.status(404).json(new ApiErrors(404, 'Todo not found'));
        }

        if (todoName) {
            todo.todoName = todoName;
        }

        if (isCompleted !== undefined && todo.isCompleted != isCompleted && isCompleted != null) {
            todo.isCompleted = isCompleted;
        }

        await todo.save();
        return res.status(200).json(new ApiResponse(todo, 200, 'Todo updated successfully'));
    } catch (error) {
        console.error('Error updating todo:', error);
        return res.status(500).json(new ApiErrors(500, 'Internal server error'));
    }
})

const getTodos = asyncHandler(async (req,res) => {
    try {
        const userEmail = req.payload.email;
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(403).json(new ApiErrors(403, 'You are not allowed to access todos'));
        }

        const todos = await Todo.find({ userId: user.userId });
        return res.status(200).json(new ApiResponse(todos, 200, 'Todos retrieved successfully'));
    } catch (error) {
        console.error('Error getting todos:', error);
        return res.status(500).json(new ApiErrors(500, 'Internal server error'));
    }
})

const deleteTodo = asyncHandler(async (req,res) => {
    try {
        const { todoId } = req.params; 
        const userEmail = req.payload.email;

        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(403).json(new ApiErrors(403, 'You are not allowed to delete this todo'));
        }

        const todo = await Todo.findOne({ id: todoId, userId: user.userId });
        if (!todo) {
            return res.status(404).json(new ApiErrors(404, 'Todo not found'));
        }

        await todo.deleteOne();
        return res.status(200).json(new ApiResponse(null, 200, 'Todo deleted successfully')); 
    } catch (error) {
        console.error('Error deleting todo:', error);
        return res.status(500).json(new ApiErrors(500, 'Internal server error'));
    }
})

export {addTodo,updateTodo,getTodos,deleteTodo}