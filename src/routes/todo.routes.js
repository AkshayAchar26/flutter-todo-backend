import {Router} from 'express'
import {addTodo,updateTodo,getTodos,deleteTodo} from '../controllers/todo.controller.js'
import {verifyAuth} from '../middlewares/firebase_auth.middleware.js'

const router = Router();

router.route("/addTodo").post(verifyAuth,addTodo)
router.route("/getTodo").get(verifyAuth,getTodos)
router.route("/deleteTodo/:todoId").delete(verifyAuth,deleteTodo)
router.route("/updateTodo/:todoId").put(verifyAuth,updateTodo)

export default router;