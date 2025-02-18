import express from "express";
import {logout, signin, signup, getuser} from '../controllers/user.controller.js'
import {verifyJwt} from '../middlewares/authChecker.middleware.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/logout', logout)
router.get('/me', verifyJwt, getuser )

export default router