import { asyncHandler } from "../utils/asyncHandler.js";
import admin from '../firebase/firebaseAdmin.js'
import { ApiErrors } from "../utils/ApiErrors.js";

export const verifyAuth = asyncHandler(async (req,_,next) => {
    try {
        if ((req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Token") ||
        (req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Bearer")) {
                const token = req.headers.authorization.split(' ')[1]
                const decodeValue = await admin.auth().verifyIdToken(token)
                if (decodeValue) {
                    req.payload = decodeValue
                    next() 
                } else {
                    throw new ApiErrors(400, "Unauthorized")
                }
            }
    } catch (error) {
        throw new ApiErrors("400", error?.message || "Invalid token");
    }
})