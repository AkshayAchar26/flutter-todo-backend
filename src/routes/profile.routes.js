import { Router } from "express";
import {saveUserToDb} from '../controllers/profile.controller.js'
import {verifyAuth} from '../middlewares/firebase_auth.middleware.js'

const router = Router();

router.route('/').get(verifyAuth,saveUserToDb)

export default router;
