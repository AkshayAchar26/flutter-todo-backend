import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {v4 as uuid} from 'uuid'

const saveUserToDb = asyncHandler(async (req,res) => {
    try {
        if (req.payload) {
            var user = await User.findOne({email: req.payload.email})
    
            if (!user) {
                user = await User.create({
                    userId: uuid(),
                    email: req.payload.email
                })
            }
    
            return res.status(200).json(new ApiResponse(user,200))
        } else {
            throw new ApiErrors(400, "Missing payload data"); 
        }
    } catch (error) {
        if (error instanceof ApiErrors) {
            return res.status(error.statusCode).json({ message: error.message });
        } else {
            console.error("Error saving user:", error); // Log the error for debugging
            return res.status(500).json({ message: "Internal server error" });
        }
    }
})

export {saveUserToDb}